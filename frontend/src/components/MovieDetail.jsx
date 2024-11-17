import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaStar } from 'react-icons/fa';
import FotterDetail from './FotterDetail';
import Footer from './Footer';
import { useMovieContext } from '../context/MovieContext';
import './CustomDetail.css';
import Navbar from './Navbar'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const apiKey = 'da72c9249b263aa573a13b7e83fa3248';

const MovieDetail = () => {
  const { movies } = useMovieContext();
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const [relatedMovies, setRelatedMovies] = useState([]);
  const [movieTrailer, setMovieTrailer] = useState(null);
  const [movieImages, setMovieImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [matchedMovie, setMatchedMovie] = useState();
  const [isOnMode, setIsOnMode] = useState([]);
  const [timer, setTimer] = useState(10); 
  const [isDownloading, setIsDownloading] = useState(false);
  const navigate = useNavigate();
  const [mode , setMode] = useState('')


  useEffect(() => {
    const fetchModeStatus = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/mode/status");
        setIsOnMode(response.data);
        setMode(response.data.onMode)
      } catch (error) {
        console.error("Error fetching mode status:", error);
      }
    };

    fetchModeStatus();
  }, []);

  useEffect(() => {

    const fetchMovieDetail = async () => {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`);
      const data = await response.json();
      setMovie(data);
      setLoading(false);
    };

    const fetchMovieTrailer = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        const trailer = data.results.find(video => video.type === "Trailer" && video.site === "YouTube");

        if (trailer) {
          setMovieTrailer(trailer);
        } else {
          setMovieTrailer(null);
        }
      } catch (error) {
        console.error("Error fetching movie trailer:", error);
      }
    };



    const fetchMovieImages = async () => {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/images?api_key=${apiKey}`);
      const data = await response.json();
      setMovieImages(data.backdrops.slice(0, 5) || []); // Limit to first 5 images
    };

    fetchMovieDetail();
    fetchMovieTrailer();
    fetchMovieImages();
  }, [id]);

  useEffect(() => {
    const fetchRelatedMovies = async () => {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apiKey}&language=en-US&page=1`);
      const data = await response.json();
      setRelatedMovies(data.results.slice(0, 5)); // Limit to 10 related movies
    };

    fetchRelatedMovies();
  }, [id]);

  useEffect(() => {
    const matchedMovie = movies?.movies?.find((movie) => String(movie.movieId) === String(id));
    setMatchedMovie(matchedMovie);
  }, [id, movies]);

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : 'N/A';

  // Helper function to split overview into parts
  const splitOverview = (overview, parts) => {
    const words = overview.split(" ");
    const chunkSize = Math.ceil(words.length / parts);
    return Array.from({ length: parts }, (_, i) =>
      words.slice(i * chunkSize, (i + 1) * chunkSize).join(" ")
    );
  };

  const overviewChunks = splitOverview(matchedMovie?.customOverview || movie.overview || "", movieImages.length);




  const handleDownload = () => {
    setIsDownloading(true);
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(interval);
          // alert("Download complete!");
          setIsDownloading(false);

          const redirectLink = isOnMode.link; // Assuming the link is stored as the first item
          console.log(redirectLink);
          
          if (redirectLink) {
            const formattedLink = redirectLink.startsWith("http") ? redirectLink : `http://${redirectLink}`;
            
            window.open(formattedLink, "_blank");
          }

          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  return (
    <div className='w-full'>
      <Helmet>
        {/* yhe 2 title and description hain meta tags and meta description */}

        <meta name="metaTag" content={matchedMovie?.metaTag || "Movie description not available."} />
        <meta name="description" content={matchedMovie?.description || "Movie description not available."} />

        {/* End if title and description for tags and descriptin for meta tags */}
        <title>{matchedMovie?.customTitle || movie.title} | Bollyflix</title>
        <meta name="description" content={matchedMovie?.customDescription || movie.overview || "Movie description not available."} />
        <meta property="og:title" content={matchedMovie?.customTitle || movie.title} />
        <meta property="og:description" content={matchedMovie?.customDescription || movie.overview} />
        <meta property="og:image" content={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
      </Helmet>



      <section className='fixed left-0 top-0 w-full' style={{ boxShadow: '0px 0px 8px 1px #2659' }}>
        <Navbar />
      </section>

      <div className='w-[95%] sm:w-[60%] mt-[120px] m-auto'>


        {/* Movie Details Section */}
        <div className="bg-black text-white mx-auto rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold mb-6">{matchedMovie?.customTitle || movie.title} ({releaseYear})</h2>
          <h1>{movie.overview}</h1>

          {/* Display Trailer */}
          {movieTrailer && (
            <div className="mt-6">
              <h3 className="text-2xl font-bold text-white mb-6">Watch Trailer</h3>
              <iframe
                width="100%"
                height="500"
                src={`https://www.youtube.com/embed/${movieTrailer.key}`}
                title={movieTrailer.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>

        <div className="rounded-md overflow-x-auto mt-10">
          <table className="w-full m-auto text-sm">
            <tbody>
              {/* Movie Info Table */}
              {[
                ['#Series Name', movie.title],
                ['#Genre', movie.genres ? movie.genres.map(g => g.name).join(', ') : 'N/A'],
                ['#Directors', 'Unknown'],
                ['#New Season', movie.release_date],
                ['#Rating', movie.vote_average ? `${movie.vote_average}/10` : 'N/A'],
                ['Language', movie.original_language ? movie.original_language.toUpperCase() : 'N/A'],
                ['#Popularity', movie.popularity ? movie.popularity.toFixed(2) : 'N/A'],
                ['#Budget', movie.budget ? movie.budget.toFixed(2) : 'N/A'],
                ['#Homepage', movie.homepage ? <a href={movie.homepage} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline break-words">{movie.homepage}</a> : 'N/A'],
                ['#Duration', movie.runtime ? `${Math.floor(movie.runtime / 60)}hr ${movie.runtime % 60}min` : 'N/A'],
                ['#Release Date', movie.release_date],
              ].map(([label, value], index) => (
                <tr key={index} className="border-b border-gray-600 h-[50px]">
                  <td className="py-2 font-bold text-xl text-gray-300">{label}:</td>
                  <td className="py-2 font-bold text-white break-words">{value || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>



        {movieImages.map((image, index) => (
          <div key={index} className="mb-6">
            {/* Movie Image */}
            <img
              src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
              alt={`Movie image ${index + 1}`}
              className="w-full h-96 object-cover rounded-md"
            />
            {/* Continuous Overview Text with HTML rendering */}
            <div className="text-lg mt-10 text-white">
              <div dangerouslySetInnerHTML={{ __html: overviewChunks[index] }} />
            </div>
          </div>
        ))}

        {/* Download Button and Redirect */}
        {mode && ( // Check if onMode is true
          <div className="flex justify-center mt-4">
            <button
              onClick={handleDownload}
              className="px-6 py-3 bg-gradient-to-r from-pink-500 via-red-500 to-purple-600 hover:from-pink-600 hover:via-red-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg transform transition duration-300 ease-in-out text-lg focus:outline-none hover:scale-105"
            >
              {isDownloading ? `Downloading... ${timer}s` : "Download Movie"}
            </button>
          </div>
        )}




      </div>



      {/* Related Movies Section */}
      <div className="w-full max-w-6xl mx-auto mt-8">
        <h3 className="text-2xl font-bold text-white mb-4">Related Movies</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {relatedMovies.map((relatedMovie) => (
            <Link key={relatedMovie.id} to={`/movie/${relatedMovie.id}`} className="mb-10 text-white rounded-md relative">
              <div className="flex justify-between items-center text-sm bg-black bg-opacity-50 px-2 py-1 rounded-t-md absolute top-0 left-0 w-full">
                <span className="text-black font-semibold flex items-center pl-1 pr-1 rounded bg-yellow-400">
                  {relatedMovie.vote_average ? `${Math.round(relatedMovie.vote_average)}/10` : '3/10'} <FaStar className="ml-1 text-[10px]" />
                </span>
              </div>
              {relatedMovie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${relatedMovie.poster_path}`}
                  alt={relatedMovie.title}
                  className="w-full h-64 object-cover rounded-md"
                />
              ) : (
                <div className="w-full h-64 flex justify-center items-center bg-gray-600 text-white rounded-md">
                  {relatedMovie.title}
                </div>
              )}
              <h3 className="text-lg font-semibold mt-2">{relatedMovie.title}</h3>
            </Link>
          ))}
        </div>
      </div>

      <FotterDetail />
      <Footer />
    </div>
  );
};

export default MovieDetail;
