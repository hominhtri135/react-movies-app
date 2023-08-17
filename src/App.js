import { Fragment } from "react";
import "swiper/scss";
import "react-loading-skeleton/dist/skeleton.css";
import Banner from "./components/banner/Banner";
import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import Main from "./components/layout/Main";
import MoviePage from "./pages/MoviePage";
import MovieDetailsPage from "./pages/MovieDetailsPage";

function App() {
  return (
    <Fragment>
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
    </Fragment>
  );
}

export default App;
