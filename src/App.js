import { Fragment, lazy, Suspense } from "react";
import "swiper/scss";
import "react-loading-skeleton/dist/skeleton.css";
import Banner from "components/banner/Banner";
import { Route, Routes } from "react-router-dom";
import Main from "components/layout/Main";

// dynamic imports
const HomePage = lazy(() => import("pages/HomePage"));
const MoviePage = lazy(() => import("pages/MoviePage"));
const MovieDetailsPage = lazy(() => import("pages/MovieDetailsPage"));

function App() {
  return (
    <Fragment>
      <Suspense fallback={<></>}>
        <Routes>
          <Route element={<Main></Main>}>
            <Route
              path="/react-movies-app"
              element={
                <>
                  <Banner></Banner>
                  <HomePage></HomePage>
                </>
              }
            ></Route>
            <Route
              path="/react-movies-app/movies"
              element={<MoviePage></MoviePage>}
            ></Route>
            <Route
              path="/react-movies-app/movie/:movieId"
              element={<MovieDetailsPage></MovieDetailsPage>}
            ></Route>
          </Route>
        </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;
