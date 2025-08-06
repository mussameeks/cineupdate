import React, { useEffect, useState } from 'react';
import { fetchTrendingMovies, fetchMovieTrailer } from '../api/tmdb';
import TrailerCard from '../components/TrailerCard';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [trailers, setTrailers] = useState({});

  useEffect(() => {
    const loadMoviesAndTrailers = async () => {
      const data = await fetchTrendingMovies();
      setMovies(data);
      const trailerPromises = data.map(movie =>
        fetchMovieTrailer(movie.id).then(key => ({ id: movie.id, key }))
      );
      const trailerResults = await Promise.all(trailerPromises);
      const trailerMap = {};
      trailerResults.forEach(({ id, key }) => {
        trailerMap[id] = key;
      });
      setTrailers(trailerMap);
    };
    loadMoviesAndTrailers();
  }, []);

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory bg-black">
      {movies.map((movie) => (
        <div key={movie.id} className="snap-start h-screen flex items-center justify-center">
          <TrailerCard movie={movie} trailerKey={trailers[movie.id]} />
        </div>
      ))}
    </div>
  );
};

export default Home;