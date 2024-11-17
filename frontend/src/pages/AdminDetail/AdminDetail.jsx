import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import FotterDetail from '../../components/FotterDetail';
import Footer from '../../components/Footer';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useMovieContext } from '../../context/MovieContext';

const apiKey = 'da72c9249b263aa573a13b7e83fa3248';

const AdminDetail = () => {
  const { movies } = useMovieContext();
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedOverview, setEditedOverview] = useState('');
  const [movieTrailer, setMovieTrailer] = useState(null);
  const [movieImages, setMovieImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [matchedMovie, setMatchedMovie] = useState();

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
          movieId: id,
        }),
      });
      const responseData = await response.json();
      if (response.ok) {
        setIsEditing(false);
        setMovie((prev) => ({
          ...prev,
          title: editedTitle,
          overview: editedOverview,
        }));
      } else {
        alert('Failed to save changes.');
      }
    } catch (error) {
      console.error('Error updating data:', error);
      alert('Error updating data. Please try again.');
    }
  };


  useEffect(() => {
    const fetchMovieDetail = async () => {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`);
      const data = await response.json();
      setMovie(data);
      setEditedTitle(data.title); // Set initial title
      setEditedOverview(data.overview); // Set initial overview
      setLoading(false);
    };

    const fetchMovieTrailer = async () => {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        setMovieTrailer(data.results[0]);
      }
    };

    const fetchMovieImages = async () => {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/images?api_key=${apiKey}`);
      const data = await response.json();
      setMovieImages(data.backdrops || []);
    };

    fetchMovieDetail();
    fetchMovieTrailer();
    fetchMovieImages();
  }, [id]);

  useEffect(() => {
    const fetchRelatedMovies = async () => {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apiKey}&language=en-US&page=1`);
      const data = await response.json();
      setRelatedMovies(data.results.slice(0, 10));
    };

    fetchRelatedMovies();
  }, [id]);


  useEffect(() => {
    const matchedMovie = movies?.movies?.find((movie) => String(movie.movieId) === String(id));
    setMatchedMovie(matchedMovie);
  }, [id, movies, handleSaveEdit]);

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }


  const truncateText = (text, wordLimit) => {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : 'N/A';
  return (
    <div>
      <div className="p-3 text-white w-full max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold cursor-pointer"><a href="/">Bollyflix</a></h1>
      </div>

      <div className="bg-black text-white w-full max-w-6xl mx-auto p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-6">{matchedMovie?.customTitle || movie.title} ({releaseYear})</h2>
        <div
          className="text-lg mt-6 mb-10 ql-editor"
          dangerouslySetInnerHTML={{
            __html: truncateText(matchedMovie?.customOverview || movie.overview, 1000),
          }}></div>


        <div className="title mt-4 md:mt-6 lg:mt-8 flex justify-center items-center">
          {isEditing ? (
            <input
              data-aos="zoom-in-up"
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="inputTitle w-full max-w-md px-4 py-2 bg-[#17244e] rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500 text-lg md:text-xl lg:text-2xl"
              placeholder="Edit movie title"
            />
          ) : null}
        </div>

        <div className="subtitle mt-6 md:mt-8 lg:mt-10 flex justify-center items-center">
          {isEditing ? (
            <div data-aos="zoom-in-up" className="w-full max-w-2xl">
              <ReactQuill
                onChange={setEditedOverview}
                className="inputSubtitle bg-[#17244e] rounded-lg text-white shadow-sm border border-gray-300"
                theme="snow"
              />
            </div>
          ) : null}
        </div>

        <div className="edit-buttons">
          {isEditing ? (
            <button className="btn bg-white text-black px-7 py-3 my-5 rounded-2xl text-lg" onClick={handleSaveEdit}>
              Save
            </button>
          ) : (
            <button className="btn bg-white text-black px-7 py-3 my-5 rounded-2xl text-lg" onClick={() => setIsEditing(true)}>
              Edit
            </button>
          )}
        </div>
      </div>
      <FotterDetail />
      <Footer />
    </div>
  );
};
export default AdminDetail;