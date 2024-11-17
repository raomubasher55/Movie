// src/Home.js
import React, { useState } from 'react';
import Navbar from './Navbar';
import CategoryButtons from './CategoryButtons';
import MovieList from './MovieList';
import Footer from './Footer';
import FotterDetail from './FotterDetail';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [MovieName, setMovieName] = useState('');
  

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar setSelectedCategory={setSelectedCategory} setMovieName={setMovieName} />
      <CategoryButtons setSelectedCategory={setSelectedCategory} />
      <div className="p-4">
        <MovieList selectedCategory={selectedCategory} MovieName={MovieName}/>
      </div>
      <FotterDetail />
      <Footer />
    </div>
  );
};

export default Home;
