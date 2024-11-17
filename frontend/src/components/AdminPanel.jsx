import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import axios from 'axios'
import Editor from './Editor';
import { useMovieContext } from '../context/MovieContext';
import FloatingMenu from './FloatingMenu';

const apiKey = 'da72c9249b263aa573a13b7e83fa3248';

export default function AdminPanel() {
  const { movies } = useMovieContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedOverview, setEditedOverview] = useState('');
  const [editedTitle, setEditedTitle] = useState('');
  const [Movies, setMovies] = useState([]);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoryInput, setCategoryInput] = useState("");
  // console.log(categories);


  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery) {
      setError('Please enter a movie name or ID');
      return;
    }

    setLoading(true);
    setError('');
    setMovies([]);
    let url;
    if (isNaN(searchQuery)) {
      url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}&language=en-US`;
    } else {
      url = `https://api.themoviedb.org/3/movie/${searchQuery}?api_key=${apiKey}&language=en-US`;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Movie not found');

      const data = await response.json();
      if (data.results) {
        setMovies(data.results);
      } else {
        setMovie(data);
      }
    } catch (err) {
      setError('Failed to fetch movie data. Please check the movie ID or name.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/v1/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customTitle: editedTitle,
          customOverview: editedOverview,
          movieId: selectedMovie.id,
          metaTag: "",
          category: ""
        }),
      });
      if (response.ok) {
        setIsEditing(false);
        setMovie((prev) => ({
          ...prev,
          title: editedTitle,
          overview: editedOverview,
        }));
        setSelectedMovie(null);
      } else {
        alert('Failed to save changes.');
      }
    } catch (error) {
      console.error('Error updating data:', error);
      alert('Error updating data. Please try again.');
    }
  };

  const handleEditClick = (movie) => {
    setSelectedMovie(movie); // Set the selected movie
    setEditedTitle(movie.title); // Set the initial edited title
    setEditedOverview(movie.overview); // Set the initial edited overview
    setIsEditing(true); // Enable editing mode
  };

  const truncateText = (text, wordLimit) => {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  const imageBaseURL = 'https://image.tmdb.org/t/p/w500';

  const handleCategoryInputChange = (e) => {
    setCategoryInput(e.target.value);
  };

  const handleSaveCategory = async () => {
    if (categoryInput.trim() !== "") {
      try {
        const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/v1/category`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ category: categoryInput }),
        });
        if (response.ok) {
          setCategoryInput("");
          window.location.reload()

        } else {
          alert('Failed to save category.');
        }
      } catch (error) {
        console.error('Error saving category:', error);
        alert('Error saving category. Please try again.');
      }
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_URL}/api/v1/categories`,{
          headers: {
            'Content-Type': 'application/json', // Ensure headers are set correctly
        },
        });


        // Assuming the response data is an array of category objects
        const filteredCategories = response.data.map(({ _id, name }) => ({ _id, name }));

        // Save the filtered categories without the unnecessary fields
        setCategories(filteredCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);




  const deleteCategory = async (category) => {

    try {
      const response = await axios.delete(`${import.meta.env.VITE_APP_URL}/api/v1/delete/${category}`);

      window.location.reload()
      if (response.status === 200) {
        setCategories((prevCategories) => prevCategories.filter((cat) => cat !== category));
      } else {
        alert('Failed to delete category.');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Error deleting category. Please try again.');
    }
  };





  return (
    <div className='flex flex-col w-full m-auto relative'>
      <div className="text-center mb-6 w-full mt-10">
        <h1 className="text-4xl font-bold cursor-pointer">
          <a href="/" className="text-yellow-400">Bollyflix</a>
        </h1>
        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold text-white">Welcome to the Admin Panel</h2>
          <p className="mt-4 text-lg text-gray-400">Manage the content and settings for the Bollyflix platform</p>
        </div>
      </div>

      <div className='container flex-col justify-center items-center md:items-start md:flex-row flex m-auto'>

        <div className="bg-black text-white min-h-screen w-full  md:w-1/2 flex flex-col items-center justify-start p-6">

          <h2 className='text-2xl font-semibold text-white mb-4 text-center'>Search by ID & Update Movies</h2>

          {/* Query From */}
          <div className="mb-8 w-full max-w-md mx-auto">
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                placeholder="Search by Movie Name or ID"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 rounded-l-md bg-gray-800 text-white border border-gray-600"
              />
              <button
                type="submit"
                className="p-2 bg-yellow-400 text-black rounded-r-md hover:bg-yellow-500 transition duration-300"
              >
                Search
              </button>
            </form>
          </div>

          {loading && <p className="text-yellow-400">Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {movie && (
            <div className="bg-black text-white w-full max-w-lg mx-auto p-0 sm:p-6 rounded-lg shadow-lg mt-8">
              <div className="flex flex-col items-center border border-gray-500 rounded bg-gray-800 bg-opacity-50 p-2">
                {movie.poster_path && (
                  <img
                    src={`${imageBaseURL}${movie.poster_path}`}
                    alt={movie.title}
                    className="w-[200px] h-[200px] rounded-lg mb-5"
                  />
                )}
                <div>
                  <h3 className="text-2xl font-bold mb-4">{movie.title} ({movie.release_date.split('-')[0]})</h3>
                  <p className="text-lg mb-4"
                    dangerouslySetInnerHTML={{
                      __html: truncateText(movie.overview, 10),
                    }}
                  ></p>
                  <div className="text-gray-400">
                    <p><strong>Genre:</strong> {movie.genres && movie.genres.length > 0 ? movie.genres.map(g => g.name).join(', ') : 'N/A'}</p>
                    <p><strong>Rating:</strong> {movie.vote_average}/10</p>
                    <p><strong>Release Date:</strong> {movie.release_date}</p>
                    <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
                  </div>
                  <div className="edit-buttons">
                    {isEditing && selectedMovie && selectedMovie.id === movie.id ? (
                      <button
                        className="btn bg-white text-black px-7 py-3 my-5 rounded-2xl text-lg"
                        onClick={handleSaveEdit}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        className="btn bg-white text-black px-7 py-3 my-5 rounded-2xl text-lg"
                        onClick={() => handleEditClick(movie)}
                      >
                        Edit
                      </button>
                    )}
                    {isEditing && selectedMovie && selectedMovie.id === movie.id && (
                      <Editor
                        movie={selectedMovie}
                        title={editedTitle}
                        overview={editedOverview}
                        onTitleChange={setEditedTitle}
                        onOverviewChange={setEditedOverview}
                        setIsEditing={setIsEditing}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}


          {Movies.length > 0 && (
            <div className="mt-8 w-full max-w-lg mx-auto">
              {Movies.map((movie) => {
                const existingMovie = movies?.movies?.find((m) => Number(m?.movieId) === movie.id);
                const movieTitle = existingMovie ? `${existingMovie.customTitle}` : movie.title;
                const movieOverView = existingMovie ? `${existingMovie.customOverview}` : movie.overview;
                return (
                  <>
                    <div key={movie.id} className="text-white p-6 rounded-lg shadow-lg mb-4">
                      <div className="flex flex-col items-center border border-gray-500 rounded bg-gray-800 bg-opacity-50 p-2">
                        {movie.poster_path && (
                          <img
                            src={`${imageBaseURL}${movie.poster_path}`}
                            alt={movie.title}
                            className="w-[200px] h-[200px] rounded-lg mb-5"
                          />
                        )}
                        <div>
                          <h3 className="text-2xl font-bold">{movieTitle} ({movie.release_date.split('-')[0]})</h3>
                          <p className="text-lg"
                            dangerouslySetInnerHTML={{
                              __html: truncateText(movieOverView, 30),
                            }}
                          />
                          <div className="edit-buttons">
                            {isEditing && selectedMovie && selectedMovie.id === movie.id ? (
                              <button
                                className="btn bg-white text-black px-7 py-3 my-5 rounded-2xl text-lg"
                                onClick={handleSaveEdit}
                              >
                                Save
                              </button>
                            ) : (
                              <button
                                className="btn bg-white text-black px-7 py-3 my-5 rounded-2xl text-lg"
                                onClick={() => handleEditClick(movie)}
                              >
                                Edit
                              </button>
                            )}
                            {isEditing && selectedMovie && selectedMovie.id === movie.id && (
                              <Editor
                                movie={selectedMovie}
                                title={editedTitle}
                                overview={editedOverview}
                                onTitleChange={setEditedTitle}
                                onOverviewChange={setEditedOverview}
                                setIsEditing={setIsEditing}
                                categories={categories}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )
              })}
            </div>
          )}
        </div>


        {/* category buttons */}
        <div className='w-[90%] sm:w-[400px] h-[500px] m-auto sm:m-0'>
          <h2 className='text-2xl font-semibold text-white mt-5 text-center'>Update category buttons</h2>
          <input
            type="text"
            value={categoryInput}
            onChange={handleCategoryInputChange}
            className='w-full bg-transparent border mt-5 rounded p-2 text-gray-300' placeholder='write here' />
          <button
            onClick={handleSaveCategory}
            className='text-yellow-400 border border-yellow-400 mt-4 p-1 pl-7 pr-7 bg-yellow-400 bg-opacity-10 cursor-pointer hover:bg-opacity-100 hover:text-white rounded-md'
          >Save
          </button>

          <div className="mt-6 flex flex-wrap gap-4 w-full">
            {categories?.map((category) => (
              <button
                key={category._id}
                className="relative px-4 py-2 border border-yellow-400 text-yellow-400 rounded-md hover:bg-yellow-400 hover:text-black transition"
              >
                {category.name}
                <span
                  onClick={() => deleteCategory(category._id)}
                  className='absolute right-0 top-[-7px] border bg-gray-300 h-[7px] p-1 pb-2 rounded flex justify-center items-center text-black font-bold'>-</span>
              </button>
            ))}
          </div>
        </div>
      </div>





      {/* sidebar */}
              <FloatingMenu />

    </div>
  );
}
