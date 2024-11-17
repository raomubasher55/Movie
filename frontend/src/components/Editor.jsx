import React, { useState, forwardRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import PropTypes from 'prop-types';
import { useMovieContext } from '../context/MovieContext';
import axios from 'axios';

const QuillWrapper = forwardRef((props, ref) => (
  <ReactQuill {...props} ref={ref} />
));

const Editor = ({ movie, setIsEditing, setMovie, categories }) => {
  const { movies, fetchMovies } = useMovieContext();
  const [title, setTitle] = useState('');
  const [customOverview, setCustomOverview] = useState('');
  const [description, setDescription] = useState('');
  const [metaTags, setMetaTags] = useState('');
  const [category, setCategory] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [categoriesBtn , setCategoriesBtn] = useState([])
  console.log(categoriesBtn);
  

  useEffect(() => {
    const existingMovie = movies?.movies?.find((m) => Number(m.movieId) === movie.id);
    if (existingMovie) {
      setTitle(existingMovie.customTitle || movie.title);
      setCustomOverview(existingMovie.customOverview || movie.overview);
      setDescription(existingMovie.description || '');
      setMetaTags(existingMovie.metaTags || '');
      setCategory(existingMovie.category || '');
    } else {
      setTitle(movie.title);
      setCustomOverview(movie.overview);
    }
  }, [movie, movies]);

  const handleSaveEdit = async () => {
    setSaving(true);
    setSaveError('');

    try {
      const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/v1/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customTitle: title,
          customOverview,
          description,
          movieId: movie.id,
          metaTag: metaTags,
          category,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save changes.');
      }

      fetchMovies();
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating data:', error);
      setSaveError('Error updating data. Please try again.');
    } finally {
      setSaving(false);
    }
  };


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_URL}/api/v1/categories`);
        console.log('Full response data:', response.data);
  
        // Assuming the response data is an array of category objects
        const filteredCategories = response.data.map(({ name }) => ({ name }));
        
        // Save the filtered categories without the unnecessary fields
        setCategoriesBtn(filteredCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
  
    fetchCategories();
  }, []);

  return (
    <div
      data-aos="fade-in"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-y-auto"
    >
      <div className="bg-white text-black p-6 rounded-lg shadow-lg max-w-3xl w-full relative mt-[240px] md:mt-[190px]">
        <button
          onClick={() => setIsEditing(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center sm:text-left">
          Edit Movie Details
        </h2>

        {/* Meta Title */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Meta Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the meta title..."
            className="w-full p-2 bg-gray-100 rounded-lg shadow-sm"
          />
        </div>

        {/* Meta-description */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Meta-description</label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter the meta description..."
            className="w-full p-2 bg-gray-100 rounded-lg shadow-sm"
          />
        </div>

        {/* Meta-tags */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Meta-tags</label>
          <input
            value={metaTags}
            onChange={(e) => setMetaTags(e.target.value)}
            placeholder="Enter the meta tags..."
            className="w-full p-2 bg-gray-100 rounded-lg shadow-sm"
          />
        </div>

        {/* Category */}
        {categories ?
          <>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 bg-gray-100 rounded-lg text-black shadow-sm"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option className='text-black' key={cat._id} value={cat.name} >
                     {cat.name}
                  </option>
                ))}
              </select>
            </div>

          </> :
          <>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 bg-gray-100 rounded-lg shadow-sm"
              >
                <option value="">Select Category</option>
                <option value="Latest Releases">Latest Releases</option>
                <option value="Bollywood Films">Bollywood Films</option>
                <option value="South Movies">South Movies</option>
                <option value="Most Popular">Most Popular</option>
                <option value="Telugu Movie">Telugu Movie</option>
                <option value="Tamil Movies">Tamil Movies</option>
                <option value="Kannada Movies">Kannada Movies</option>
                <option value="Punjabi Films">Punjabi Films</option>
                <option value="Malayalam Movies">Malayalam Movies</option>
                <option value="Comedy Films">Comedy Films</option>
                <option value="Hollywood Movies">Hollywood Movies</option>
                <option value="Romantic">Romantic</option>
                <option value="K-Drama Hindi">K-Drama Hindi</option>
              </select>
            </div>
          </>
        }

        {/* Custom Overview */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Custom Overview</label>
          <ReactQuill
            value={customOverview}
            onChange={setCustomOverview}
            theme="snow"
            placeholder="Enter the custom overview..."
            className="h-[250px] sm:h-[200px] overflow-y-auto"
          />
        </div>

        {/* Save Button and Error Message */}
        {saveError && <p className="text-red-500 mb-4">{saveError}</p>}
        <button
          onClick={handleSaveEdit}
          className={`w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ${saving ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};

Editor.propTypes = {
  movie: PropTypes.object.isRequired,
  setIsEditing: PropTypes.func.isRequired,
  // setMovie: PropTypes.func.isRequired,
};

export default Editor;
