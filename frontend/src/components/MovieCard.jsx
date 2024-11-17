import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useMovieContext } from '../context/MovieContext';

const apiKey = 'da72c9249b263aa573a13b7e83fa3248';

const genreMapping = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    53: 'Thriller',
    878: 'Science Fiction',
    10770: 'TV Movie',
    10752: 'War',
    37: 'Western',
};

const MovieCard = ({ data, selectedCategory }) => {
    
    const { movies } = useMovieContext();
    const [token, setToken] = useState();
    const [loading, setLoading] = useState(true);
    const [myMovies, setMyMovies] = useState([]);

    const formatRuntime = (minutes) => {
        if (!minutes) return '2hr 10min';
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}hr ${mins}min`;
    };

    const matchedMovies = async () => {
        setLoading(true);
        const allMatchedMovies = [];
        try {
            const movieIds = movies?.movies?.map((movie) => movie.movieId);

            // if (!movieIds || movieIds.length === 0) {
            //     throw new Error("No movies found in the database");
            // }

            for (const movieId of movieIds) {
                const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;
                const response = await fetch(url);
                const data = await response.json();
                console.log(data)

                if (data && data.id) {
                    const movieWithDetails = {
                        ...data,  
                    };

                    if (selectedCategory && data.original_language === selectedCategory) {
                        allMatchedMovies.push(movieWithDetails);
                    } else if (!selectedCategory) {
                        allMatchedMovies.push(movieWithDetails); 
                    }
                }
            }

            setMyMovies(allMatchedMovies);

        } catch (error) {
            console.error("Error fetching matched movies:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setToken(true);
        }
    }, []);

    useEffect(() => {
     matchedMovies()
    }, [])
    

    useEffect(() => { 
        matchedMovies();
    }, [movies, selectedCategory]); // Trigger when selectedCategory or movies changes

    return (
        <div
            data-aos="flip-left"
            className="w-[90%] m-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
            {myMovies && myMovies?.map((movie) => {
                const existingMovie = movies?.movies?.find((m) => Number(m.movieId) === movie.id);
                const movieTitle = existingMovie ? `${existingMovie.customTitle}` : movie.title;

                return (
                    <Link
                        key={movie.id}
                        to={`/movie/${movie.id}`}
                        className="mb-10 text-white rounded-md relative"
                    >
                        <div className="flex justify-between items-center text-sm bg-black bg-opacity-50 px-2 py-1 rounded-t-md absolute top-0 left-0 w-full">
                            <span className="text-black font-semibold flex items-center pl-1 pr-1 rounded bg-yellow-400">
                                {movie.vote_average ? `${Math.round(movie.vote_average)}/10` : '3/10'}
                                <FaStar className="ml-1 text-[10px]" />
                            </span>
                            <span className="text-gray-300 bg-gray-900 bg-opacity-70 px-1 text-[12px] rounded">
                                {formatRuntime(movie.runtime)}
                            </span>
                        </div>
                        {movie.poster_path ? (
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                className="w-full h-64 object-cover rounded-md"
                            />
                        ) : (
                            <div className="w-full h-64 flex justify-center items-center bg-gray-600 text-white rounded-md">
                                {movie.title}
                            </div>
                        )}
                        <h3 className="text-lg font-semibold mt-2">{movieTitle}</h3>
                        <div className="mt-2 text-sm text-gray-400">
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default MovieCard;
