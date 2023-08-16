import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import { tmdbAPI } from "../../config/config";

const MovieCard = ({ item }) => {
  const { title, vote_average, release_date, poster_path, id } = item;
  const navigate = useNavigate();
  return (
    <div className="movie-card flex flex-col rounded-lg p-3 bg-slate-800 text-white h-full select-none">
      <img
        src={
          poster_path
            ? tmdbAPI.getImageMovie(poster_path, "w500")
            : tmdbAPI.getDefaultImageMovie
        }
        alt=""
        className="w-full h-[350px] object-cover rounded-lg mb-5"
      />
      <div className="flex flex-col flex-1">
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <div className="flex items-center justify-between text-sm opacity-50 mb-5 ">
          <span>{new Date(release_date).getFullYear()}</span>
          <span>{vote_average}</span>
        </div>
        <Button onClick={() => navigate(`/movie/${id}`)}>Watch now</Button>
      </div>
    </div>
  );
};

MovieCard.PropsTypes = {};

export default MovieCard;
