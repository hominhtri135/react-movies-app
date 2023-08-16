import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const MovieItemLoading = () => {
  return (
    <SkeletonTheme baseColor="#878b94" highlightColor="#b7b9bf">
      <div className="movie-card flex flex-col rounded-lg p-3 bg-slate-800 text-white h-full select-none">
        <Skeleton className="w-full h-[350px] object-cover rounded-lg mb-5"></Skeleton>
        <div className="flex flex-col flex-1">
          <h3 className="text-xl font-bold mb-3">
            <Skeleton height={30}></Skeleton>
          </h3>
          <div className="flex items-center justify-between text-sm opacity-50 mb-5 ">
            <Skeleton width={34} height={20}></Skeleton>
            <Skeleton width={18} height={20}></Skeleton>
          </div>
          <Skeleton width={276} height={48}></Skeleton>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default MovieItemLoading;
