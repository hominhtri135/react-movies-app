import "swiper/scss";
import "react-loading-skeleton/dist/skeleton.css";

import { Fragment, Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

import Banner from "components/banner/Banner";
import Main from "components/layout/Main";

// dynamic imports
const HomePage = lazy(() => import("pages/HomePage"));
// const MoviePage = lazy(() => import("pages/MoviePage"));
const MoviePageV2LoadMore = lazy(() => import("pages/MoviePageV2LoadMore"));
const MovieDetailsPage = lazy(() => import("pages/MovieDetailsPage"));

function App() {
  return (
    <Fragment>
      <Suspense fallback={<></>}>
        <Routes>
          <Route element={<Main></Main>}>
            <Route
              path="/"
              element={
                <>
                  <Banner></Banner>
                  <HomePage></HomePage>
                </>
              }
            ></Route>
            {/* <Route path="/movies" element={<MoviePage></MoviePage>}></Route> */}
            <Route
              path="/movies"
              element={<MoviePageV2LoadMore></MoviePageV2LoadMore>}
            ></Route>
            <Route
              path="/movie/:movieId"
              element={<MovieDetailsPage></MovieDetailsPage>}
            ></Route>
          </Route>
        </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;
