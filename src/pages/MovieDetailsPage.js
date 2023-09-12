import { Swiper, SwiperSlide } from "swiper/react";
import { fetcher, tmdbAPI } from "apiConfig/config";

import { Helmet } from "react-helmet";
import MovieCard from "components/movie/MovieCard";
import MovieDetailsLoading from "components/loading/MovieDetailsLoading";
import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const { data, isLoading } = useSWR(
    tmdbAPI.getMovieDetails(movieId),
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const { backdrop_path, poster_path, title, genres, overview } =
    data === undefined
      ? {
          backdrop_path: "",
          poster_path: "",
          title: "",
          genres: "",
          overview: "",
        }
      : data;

  function createMetaTagFacebook(type, title, description, image) {
    const metaTagFaceBook = [];
    if (type) metaTagFaceBook.push({ property: "og:type", content: type });
    if (title) metaTagFaceBook.push({ property: "og:title", content: title });
    if (description)
      metaTagFaceBook.push({
        property: "og:description",
        content: description,
      });
    if (image) metaTagFaceBook.push({ property: "og:image", content: image });
    return metaTagFaceBook;
  }

  return (
    <div className="py-10 px-5">
      {isLoading && !data && <MovieDetailsLoading></MovieDetailsLoading>}

      {!isLoading && data && (
        <Helmet
          onChangeClientState={(newState, addedTags, removedTags) => {}}
          defaultTitle="My Site"
          titleTemplate="MRA | %s"
        >
          <title>{title}</title>
          <meta name="description" content="Home component" />
          {createMetaTagFacebook(
            "article",
            title,
            overview,
            tmdbAPI.imageOriginal(poster_path)
          ).map((item, index) => {
            return (
              <meta
                property={item.property}
                content={`${item.content}`}
                key={index}
              />
            );
          })}
        </Helmet>
      )}

      {!isLoading && data && (
        <>
          <div className="w-full h-[600px] relative">
            <div className="absolute inset-0 bg-black bg-opacity-70"></div>
            <div
              className="w-full h-full bg-cover"
              style={{
                backgroundImage: `url(${
                  backdrop_path
                    ? tmdbAPI.imageOriginal(backdrop_path)
                    : tmdbAPI.imageDefault()
                })`,
              }}
            ></div>
          </div>
          <div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative z-10 pb-10">
            <img
              src={
                poster_path
                  ? tmdbAPI.imageOriginal(poster_path)
                  : tmdbAPI.imageDefault()
              }
              alt=""
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <h1 className="text-center text-4xl font-bold text-white mb-10">
            {title}
          </h1>

          {genres.length > 0 && (
            <div className="flex items-center justify-center gap-x-5 mb-10">
              {genres.map((item) => (
                <span
                  className="py-2 px-4 border-primary text-primary border rounded"
                  key={item.id}
                >
                  {item.name}
                </span>
              ))}
            </div>
          )}

          <p className="text-center leading-relaxed max-w-[600px] mx-auto mb-10">
            {overview}
          </p>

          <MovieMeta type="credits"></MovieMeta>
          <MovieMeta type="videos"></MovieMeta>
          <MovieMeta type="similar"></MovieMeta>
        </>
      )}
    </div>
  );
};

function MovieMeta({ type = "videos" }) {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, type), fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  if (!data) return null;

  if (type === "credits") {
    const { cast } = data;
    if (!cast || cast.length <= 0) return null;

    return (
      <div className="py-10">
        <h2 className="text-center text-3xl mb-10 font-bold">Casts</h2>
        <div className="grid grid-cols-4 gap-5">
          {cast.slice(0, 4).map((item) => (
            <div className="cast-item" key={item.id}>
              <img
                src={
                  item.profile_path
                    ? tmdbAPI.imageOriginal(item.profile_path)
                    : tmdbAPI.imageDefault()
                }
                alt=""
                className="w-full h-[350px] object-cover rounded-lg mb-3"
              />
              <h3 className="text-xl font-medium text-center">{item.name}</h3>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    const { results } = data;
    if (!results || results.length <= 0) return null;

    if (type === "videos")
      return (
        <div className="py-10">
          <div className="flex flex-col gap-10">
            {results.slice(0).map((item) => (
              <div key={item.id}>
                <h3 className="mb-5 text-xl font-medium p-3 bg-secondary inline-block">
                  {item.name}
                </h3>
                <div className="w-full aspect-video">
                  <iframe
                    width="864"
                    height="486"
                    src={`https://www.youtube.com/embed/${item.key}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full object-fill"
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    if (type === "similar")
      return (
        <div className="py-10">
          <h2 className="text-3xl font-medium mb-10">Similar Movies</h2>
          <div className="movie-list">
            <Swiper
              grabCursor={"true"}
              spaceBetween={40}
              slidesPerView={"auto"}
            >
              {results.length > 0 &&
                results.map((movie) => (
                  <SwiperSlide key={movie.id}>
                    <MovieCard item={movie}></MovieCard>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      );
  }
  return null;
}

export default MovieDetailsPage;
