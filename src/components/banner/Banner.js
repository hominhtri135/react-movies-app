import React from "react";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../../config/config";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import BannerLoading from "../loading/BannerLoading";
import Button from "../button/Button";

const Banner = () => {
  const { data: moviesData, isLoading } = useSWR(
    tmdbAPI.getMovieList("upcoming"),
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  const movies = moviesData?.results || [];

  const { data: genresData } = useSWR(tmdbAPI.getMovieGenres(), fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const genres = genresData?.genres || [];

  return (
    <section className="banner h-[500px] page-container mb-20 overflow-hidden">
      {isLoading && <BannerLoading></BannerLoading>}
      {!isLoading && (
        <Swiper grabCursor="true" slidesPerView={"auto"}>
          {movies.length > 0 &&
            movies.map((movie) => (
              <SwiperSlide key={movie.id}>
                <BannerItem item={movie} genres={genres}></BannerItem>
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </section>
  );
};

function BannerItem({ item, genres }) {
  const { title, backdrop_path, genre_ids, id } = item;
  const navigate = useNavigate();
  const genresMovie = genres.filter((genre) => {
    return genre_ids.includes(genre.id);
  });

  return (
    <div className="w-full h-full rounded-lg relative">
      <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg"></div>
      <img
        src={
          backdrop_path
            ? tmdbAPI.getImageMovie(backdrop_path)
            : tmdbAPI.getDefaultImageMovie
        }
        alt=""
        className="w-full h-full object-cover rounded-lg"
      />
      <div className="absolute left-5 bottom-5 w-full text-white">
        <h2 className="font-bold text-3xl mb-5">{title}</h2>
        <div className="flex items-center gap-x-3 mb-8">
          {genresMovie.length > 0 &&
            genresMovie.map((genre) => (
              <span
                className="py-2 px-4 border border-white rounded-md"
                key={genre.id}
              >
                {genre.name}
              </span>
            ))}
        </div>
        <Button onClick={() => navigate(`/movie/${id}`)}>Watch now</Button>
      </div>
    </div>
  );
}
export default Banner;
