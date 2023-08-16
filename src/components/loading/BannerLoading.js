import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const BannerLoading = () => {
  return (
    <SkeletonTheme baseColor="#878b94" highlightColor="#b7b9bf">
      <div className="w-full h-full rounded-lg relative">
        <SkeletonTheme baseColor="#d8d9dc" highlightColor="#e2e2e5">
          <Skeleton className="w-full h-full rounded-lg"></Skeleton>
        </SkeletonTheme>
        <div className="absolute left-5 bottom-5 w-full">
          <h2 className="font-bold text-3xl mb-5">
            <Skeleton height={36} className="max-w-lg"></Skeleton>
          </h2>
          <div className="flex items-center gap-x-3 mb-8">
            {new Array(3).fill(0).map((item, index) => (
              <Skeleton width={150} height={42} key={index}></Skeleton>
            ))}
          </div>
          <Skeleton width={134} height={48}></Skeleton>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default BannerLoading;
