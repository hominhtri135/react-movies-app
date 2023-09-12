import { Swiper, SwiperSlide } from "swiper/react";
import { fetcher, tmdbAPI } from "apiConfig/config";

import MovieCard from "components/movie/MovieCard";
import MovieItemLoading from "components/loading/MovieItemLoading";
import PropTypes from "prop-types";
import React from "react";
import useSWR from "swr";
import { withErrorBoundary } from "react-error-boundary";

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

MovieList.propTypes = {
  type: PropTypes.string.isRequired,
};

function FallbackComponent() {
  return (
    <p className="bg-red-50 text-red-400">
      Something went wrong with this component
    </p>
  );
}

export default withErrorBoundary(MovieList, { FallbackComponent });
