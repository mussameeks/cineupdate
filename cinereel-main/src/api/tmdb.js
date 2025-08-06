import axios from 'axios';

const API_KEY = 'c90341a8cd43a21afc08ca22e733e299';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchTrendingMovies = async () => {
  const res = await axios.get(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
  return res.data.results;
};

export const fetchMovieTrailer = async (movieId) => {
  const res = await axios.get(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`);
  const trailers = res.data.results.filter(v => v.type === 'Trailer' && v.site === 'YouTube');
  return trailers.length ? trailers[0].key : null;
};