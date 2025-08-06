import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get('https://vidsrc.xyz/movies/latest/page-1.json');
        setMovies(res.data || []);
      } catch (err) {
        setError('Failed to load movies.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const closeModal = () => setSelectedMovie(null);

  if (loading) return <div className="p-4 text-white">Loading movies...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-white text-xl font-bold mb-4">Latest Movies</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-gray-900 rounded shadow overflow-hidden">
            <img
              src={movie.poster_path}
              alt={movie.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-2 flex flex-col gap-2">
              <h2 className="text-white text-sm font-semibold">{movie.title}</h2>
              <button
                onClick={() => setSelectedMovie(movie)}
                className="text-sm text-blue-400 hover:underline"
              >
                ▶ Play
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Player */}
      {selectedMovie && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative w-full max-w-4xl h-[80vh]">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 bg-white text-black px-3 py-1 rounded z-50"
            >
              ✕ Close
            </button>
            <iframe
              className="w-full h-full"
              src={`https://vidsrc.xyz/embed/movie?tmdb=${selectedMovie.id}&autoplay=1`}
              allowFullScreen
              loading="lazy"
              title={selectedMovie.title}
            />
          </div>
        </div>
      )}
    </div>
  );
}