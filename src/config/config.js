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
  // `https://api.themoviedb.org/3/movie/${category}?language=vi-VN&page=${nextPage}`
  getMovieList: (type, page = "1") =>
    `${tmdbEndpoint}/movie/${type}?api_key=${apiKey}&language=${language.vi}&page=${page}`,
  // `https://api.themoviedb.org/3/movie/${movieId}?language=vi-VN`
  getMovieDetails: (movieId) =>
    `${tmdbEndpoint}/movie/${movieId}?api_key=${apiKey}&language=${language.vi}`,
  // https://api.themoviedb.org/3/genre/movie/list?language=vi
  getMovieGenres: () =>
    `${tmdbEndpoint}/genre/movie/list?api_key=${apiKey}&language=${language.vi}`,
  // `https://api.themoviedb.org/3/search/movie?query=${filter}&language=vi-VN&page=${nextPage}`
  getMovieSearch: (filter, page = "1") =>
    `${tmdbEndpoint}/search/movie?query=${filter}&api_key=${apiKey}&language=${language.vi}&page=${page}`,
  // `https://api.themoviedb.org/3/movie/${movieId}/credits?language=vi-VN`
  getMovieCredits: (movieId) =>
    `${tmdbEndpoint}/movie/${movieId}/credits?api_key=${apiKey}&language=${language.vi}`,
  // `https://api.themoviedb.org/3/movie/${movieId}/videos?language=vi-VN`
  getMovieVideo: (movieId) =>
    `${tmdbEndpoint}/movie/${movieId}/videos?api_key=${apiKey}&language=${language.vi}`,
  // `https://api.themoviedb.org/3/movie/${movieId}/similar?language=vi-VN`
  getMovieSimilar: (movieId) =>
    `${tmdbEndpoint}/movie/${movieId}/similar?api_key=${apiKey}&language=${language.vi}`,
  // `https://image.tmdb.org/t/p/original/${backdrop_path}`
  getImageMovie: (id, size = "original") =>
    `https://image.tmdb.org/t/p/${size}/${id}`,
  getDefaultImageMovie: () =>
    `https://logowik.com/content/uploads/images/imdb-internet-movie-database5351.jpg`,
};
