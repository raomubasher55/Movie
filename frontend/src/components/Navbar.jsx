// src/components/Navbar.js
import React, { useState } from 'react';
import { FaBars, FaUserShield } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'; // Import Link for routing

const Navbar = ({ setSelectedCategory }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  

  const categories = [
    { label: 'New Movies', value: 'now_playing', languageCode: 'en' },
    { label: 'Bollywood', value: 'bollywood', languageCode: 'hi' },
    { label: 'South Movie', value: 'south', languageCode: 'te' },
    { label: 'Hindi Movie', value: 'hindi', languageCode: 'hi' },
    { label: 'Action', value: 'action', languageCode: 'en' },
    { label: 'Crime', value: 'crime', languageCode: 'en' },
    { label: 'Thriller', value: 'thriller', languageCode: 'en' },
    { label: 'Horror', value: 'horror', languageCode: 'en' },
  ];

  const handleOnAdmin = ()=>{
    const token = localStorage.getItem('token');
    if(token){
      console.log(true)
      navigate('/admin');
    }else{
      navigate('/login');
      console.log(false)
    }
  }

  return (
    <nav className="container bg-black text-white gap-8 py-4 px-6 flex items-center justify-between">
      {/* Logo */}
      <a href='/' className="text-2xl font-bold cursor-pointer">Bollyflix</a>

      {/* Menu Button for Mobile */}
      <button
        className="md:hidden block text-2xl"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <FaBars />
      </button>

      {/* Categories for larger screens */}
      <ul className="hidden md:flex space-x-4 ml-8">
        {categories.map((category) => (
          <li
            key={category.value}
            className="cursor-pointer hover:text-yellow-400"
            onClick={() => {
              // setSelectedCategory(category.value);
              setSelectedCategory(category.languageCode);
            }}
          >
            {category.label}
          </li>
        ))}
      </ul>

      {/* Admin Icon for Profile */}
      <div className="flex items-center space-x-4">
        <div onClick={handleOnAdmin} className="text-xl">
          <FaUserShield className="cursor-pointer hover:text-yellow-400" />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <ul className="absolute top-16 left-0 w-full bg-black text-white flex flex-col space-y-2 py-4 md:hidden">
          {categories.map((category) => (
            <li
              key={category.value}
              className="cursor-pointer hover:text-yellow-400 text-center py-2"
              onClick={() => {
                // setSelectedCategory(category.value);
                setSelectedCategory(category.languageCode);
                setIsMenuOpen(false);
              }}
            >
              {category.label}
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
