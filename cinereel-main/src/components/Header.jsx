import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const [search, setSearch] = useState('');

  const isActive = (path) =>
    location.pathname === path ? 'text-blue-500 font-bold' : 'text-white';

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-black shadow-md">
      <Link to="/" className="text-xl font-bold text-white">
        Cine<span className="text-blue-500">Reel</span>
      </Link>
      <nav className="hidden md:flex gap-6 ml-4">
        <Link to="/trailers" className={isActive('/trailers')}>Trailers</Link>
        <Link to="/movies" className={isActive('/movies')}>Movies</Link>
      </nav>
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search..."
          className="px-2 py-1 text-sm rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </header>
  );
}