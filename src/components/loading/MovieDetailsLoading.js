import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const MovieDetailsLoading = () => {
  return (
    <SkeletonTheme baseColor="#878b94" highlightColor="#b7b9bf">
      <div className="w-full h-[600px] relative">
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <SkeletonTheme baseColor="#9fa2a9" highlightColor="#b7b9bf">
          <Skeleton className="w-full h-full"></Skeleton>
        </SkeletonTheme>
      </div>
      <div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative z-10 pb-10">
        <Skeleton className="w-full h-full object-cover rounded-xl"></Skeleton>
      </div>
      <h1 className="text-center text-4xl font-bold text-white mb-10">
        <Skeleton height={40} className="max-w-lg"></Skeleton>
      </h1>
      <div className="flex items-center justify-center gap-x-5 mb-10">
        {new Array(3).fill(0).map((item, index) => (
          <Skeleton
            width={150}
            height={42}
            key={index}
            className="py-2 px-4 rounded"
          ></Skeleton>
        ))}
      </div>

      <p className="text-center leading-relaxed max-w-[600px] mx-auto mb-10">
        <Skeleton count={5}></Skeleton>
      </p>
    </SkeletonTheme>
  );
};

export default MovieDetailsLoading;
