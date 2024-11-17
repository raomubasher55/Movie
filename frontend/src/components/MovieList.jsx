import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';

const apiKey = 'da72c9249b263aa573a13b7e83fa3248';



const MovieList = ({selectedCategory}) => {
  const [movies, setMovies] = useState([]);

  const [movieName, setMovieName] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetching movies based on search or category
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      let url;

      // Search movies by name if search term is present
      if (movieName) {
        url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movieName)}`;
      } else {
        // Otherwise, fetch all movies (no language filter)
        // url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&region=IN`;
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=80&language=en-US`;
      }


      // Fetch movies from TMDb
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${apiKey}`
        }
      });
      const data = await response.json();
      // console.log(data);
      setMovies(data?.results)
      const moviesWithDetails = await Promise.all(
        data.results.map(async (movie) => {
          const detailsResponse = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}`);
          const details = await detailsResponse.json();
          return {
            ...movie,
            runtime: details.runtime,
            genres: details.genres,
          };
        })
      );
      setMovies(moviesWithDetails || []);
      setLoading(false);
    };

    // Fetching additional categories
    const fetchAdditionalCategoryMovies = async (language, setter) => {
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&region=IN&with_original_language=${language}`;
      const response = await fetch(url);
      const data = await response.json();
      const moviesWithDetails = await Promise.all(
        data.results.slice(0, 20).map(async (movie) => {
          const detailsResponse = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}`);
          const details = await detailsResponse.json();
          return {
            ...movie,
            runtime: details.runtime,
            genres: details.genres,
          };
        })
      );
      setter(moviesWithDetails);
    };

    // Fetching movies based on different categories
    fetchMovies();

  }, [movieName]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setMovieName(e.target.value);
  };

  // Trigger movie search when button clicked
  const handleSearchClick = () => {
    if (movieName.trim() !== '') {
      setMovieName(movieName.trim());
    }
  };

  return (
    <div>
      {/* Movie Search Input */}
      <div className="container m-auto mb-[100px] flex justify-center mt-4">
        <input
          type="text"
          value={movieName}
          onChange={handleSearchChange}
          className="p-4 w-full rounded-l-md bg-gray-800"
          placeholder="Search for a movie..."
        />
        <button
          onClick={handleSearchClick}
          className="p-2 pl-4 pr-4 bg-blue-500 text-white rounded-r-md"
        >
          Search
        </button>
      </div>

      {/* Loading State */}
      {loading && <div className="text-center text-white">Loading...</div>}

      {/* Main Movie List */}
      <div className="container m-auto my-8">
        <h2 className="text-2xl font-bold text-white mb-4">All Movies</h2>
        <MovieCard data={movies} selectedCategory={selectedCategory} />
      </div>

      {/* Additional Categories
      <section className="container m-auto my-8">
        <h2 className="text-2xl font-bold text-white mb-4">Trending Movies</h2>
        <MovieCard data={trendingMovies} />
      </section> */}

      {/* <section className="container m-auto my-8">
        <h2 className="text-2xl font-bold text-white mb-4">Punjabi Movies</h2>
        <MovieCard data={punjabiMovies} />
      </section> */}

      {/* <section className="container m-auto my-8">
        <h2 className="text-2xl font-bold text-white mb-4">Pakistani Movies</h2>
        <MovieCard data={pakistaniMovies} />
      </section> */}
    </div>
  );
};

export default MovieList;
