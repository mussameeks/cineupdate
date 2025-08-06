import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Trailers from './pages/Trailers';
import Movies from './pages/Movies';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trailers" element={<Trailers />} />
        <Route path="/movies" element={<Movies />} />
      </Routes>
    </Router>
  );
}

export default App;