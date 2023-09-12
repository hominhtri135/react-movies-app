import React, { useEffect, useState } from "react";
import { fetcher, tmdbAPI } from "apiConfig/config";

import Button from "components/button/Button";
import MovieCard from "components/movie/MovieCard";
import MovieItemLoading from "components/loading/MovieItemLoading";
import { debounce } from "lodash";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";

const itemPerPage = 20;

const MoviePage = () => {
  const [nextPage, setNextPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [url, setUrl] = useState(tmdbAPI.getMovieList("popular", nextPage));

  const { data, size, setSize, isLoading } = useSWRInfinite(
    (index) => url.replace("page=1", `page=${index + 1}`),
    fetcher
  );
  console.log("MoviePage ~ data:", data);
  const movies = data ? data.reduce((a, b) => a.concat(b.results), []) : [];
  console.log("MoviePage ~ movies:", movies);

  const isEmpty = data?.[0]?.results?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.results?.length < itemPerPage);
  console.log("MoviePage ~ isReachingEnd:", isReachingEnd);

  useEffect(() => {
    if (filter) {
      setUrl(tmdbAPI.getMovieSearch(filter, nextPage));
    } else {
      setUrl(tmdbAPI.getMovieList("popular", nextPage));
    }
  }, [filter, nextPage]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setNextPage(1);
  };

  // const handlePageClick = (event) => {
  //   setNextPage(event.selected + 1);
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // };
  // return null;

  return (
    <div className="py-10 page-container">
      <div className="flex mb-10">
        <div className="flex-1">
          <input
            type="text"
            className="w-full p-4 bg-slate-800 text-white outline-none"
            placeholder="Type here to search..."
            defaultValue={filter}
            onChange={debounce(handleFilterChange, 500)}
          />
        </div>
        <button className="p-4 bg-primary text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
      {/* {isLoading && (
        <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent border-t-4 mx-auto animate-spin"></div>
      )} */}
      <div className="grid grid-cols-4 gap-10">
        {isLoading &&
          new Array(8)
            .fill(0)
            .map((item, index) => (
              <MovieItemLoading key={index}></MovieItemLoading>
            ))}
        {!isLoading &&
          movies.length > 0 &&
          movies.map((movie) => (
            <MovieCard item={movie} key={movie.id}></MovieCard>
          ))}
      </div>

      {!isReachingEnd && (
        <div className="mt-10 text-center">
          <Button onClick={() => setSize(size + 1)}>Load More</Button>
        </div>
      )}
    </div>
  );
};

export default MoviePage;
