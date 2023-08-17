import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "./MovieCard";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "apiConfig/config";
import MovieItemLoading from "components/loading/MovieItemLoading";

const MovieList = ({ type = "now_playing" }) => {
  const { data, isLoading } = useSWR(tmdbAPI.getMovieList(type), fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const movies = data?.results || [];

  return (
    <div className="movie-list">
      <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
        {isLoading &&
          new Array(5).fill(0).map((item, index) => (
            <SwiperSlide key={index}>
              <MovieItemLoading></MovieItemLoading>
            </SwiperSlide>
          ))}
        {!isLoading &&
          movies.length > 0 &&
          movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <MovieCard item={movie}></MovieCard>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default MovieList;
