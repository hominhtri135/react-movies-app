// export const fetcher = (url, method = "GET") => {
//   const options = {
//     method: method,
//     headers: {
//       accept: "application/json",
//       Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
//     },
//     // body: data ? JSON.stringify(data) : {},
//   };

//   return fetch(url, options).then((res) => res.json());
// };

export const fetcher = (...args) => fetch(...args).then((res) => res.json());

const tmdbEndpoint = "https://api.themoviedb.org/3";
const apiKey = process.env.REACT_APP_API_KEY;
const language = {
  en: "en-US",
  vi: "vi-VN",
};

export const tmdbAPI = {
  getMovieList: (type, page = "1") =>
    `${tmdbEndpoint}/movie/${type}?api_key=${apiKey}&language=${language.vi}&page=${page}`,
  getMovieDetails: (movieId) =>
    `${tmdbEndpoint}/movie/${movieId}?api_key=${apiKey}&language=${language.vi}`,
  getMovieMeta: (movieId, type) =>
    `${tmdbEndpoint}/movie/${movieId}/${type}?api_key=${apiKey}&language=${language.vi}`,
  getMovieGenres: () =>
    `${tmdbEndpoint}/genre/movie/list?api_key=${apiKey}&language=${language.vi}`,
  getMovieSearch: (filter, page = "1") =>
    `${tmdbEndpoint}/search/movie?query=${filter}&api_key=${apiKey}&language=${language.vi}&page=${page}`,
  imageOriginal: (id) => `https://image.tmdb.org/t/p/original/${id}`,
  image500: (id) => `https://image.tmdb.org/t/p/w500/${id}`,
  imageDefault: () =>
    `https://logowik.com/content/uploads/images/imdb-internet-movie-database5351.jpg`,
};
