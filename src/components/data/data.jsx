const APIKEY = import.meta.env.VITE_API_KEY;
export const apis = {
  popularMovies: ` https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}&language=en-US&page=1`,
  latestMovies: `https://api.themoviedb.org/3/movie/now_playing?api_key=${APIKEY}&language=en-US&page=1`,
  topMovies: `https://api.themoviedb.org/3/movie/top_rated?api_key=${APIKEY}&language=en-US&page=1`,
  upcomingMovies: `https://api.themoviedb.org/3/movie/upcoming?api_key=${APIKEY}&language=en-US&page=1`,
  popularSeries: `https://api.themoviedb.org/3/tv/popular?api_key=${APIKEY}&language=en-US&page=1`,
  latestSeries: `https://api.themoviedb.org/3/tv/airing_today?api_key=${APIKEY}&language=en-US&page=1`,
  topSeries: `https://api.themoviedb.org/3/tv/top_rated?api_key=${APIKEY}&language=en-US&page=1`,
  searchApi: `https://api.themoviedb.org/3/search/multi?api_key=${APIKEY}&language=en-US&page=1&include_adult=false&query=`
};
