import React, { useEffect, useState } from "react";
import { fetcher, tmdbAPI } from "../config/config";
import useSWR from "swr";
import MovieCard from "../components/movie/MovieCard";
import { debounce } from "lodash";
import ReactPaginate from "react-paginate";
import MovieItemLoading from "../components/loading/MovieItemLoading";

const MoviePage = () => {
  const [nextPage, setNextPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [url, setUrl] = useState(tmdbAPI.getMovieList("popular", nextPage));

  const { data, isLoading } = useSWR(url, fetcher);

  useEffect(() => {
    if (filter) {
      setUrl(tmdbAPI.getMovieSearch(filter, nextPage));
    } else {
      setUrl(tmdbAPI.getMovieList("popular", nextPage));
    }
  }, [filter, nextPage]);

  const movies = data?.results || [];
  const total_pages = data
    ? data.results.length > 0
      ? data.total_pages <= 500
        ? data.total_pages
        : 500
      : 0
    : 0;

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setNextPage(1);
  };

  const handlePageClick = (event) => {
    setNextPage(event.selected + 1);
  };

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

      <div className="mt-10">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={total_pages}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          className="pagination"
        />
      </div>
    </div>
  );
};

export default MoviePage;
