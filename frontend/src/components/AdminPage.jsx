import React from 'react';
import { Link } from 'react-router-dom';
import { useMovieContext } from '../context/MovieContext';

const AdminPage = () => {
    const { movies, deleteMoive } = useMovieContext();

    const truncateText = (htmlString, maxLength) => {
        // Create a temporary DOM element to strip HTML tags
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlString;
        const plainText = tempDiv.textContent || tempDiv.innerText || '';
        // Truncate the plain text and add ellipsis if needed
        return plainText.length > maxLength ? `${plainText.slice(0, maxLength)}...` : plainText;
    };

    return (
        <>
            <div className="w-[90%] m-auto grid grid-cols-1 md:grid-cols-1 gap-4">
                <div className="w-full mt-8">
                    <table className="w-full table-auto text-sm text-white bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                        <thead>
                            <tr className="bg-gray-700 text-white">
                                <th className="p-4 text-left">Title</th>
                                <th className="p-4 text-left">Description</th>
                                <th className="p-4 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {movies?.movies?.map((movie , index) => (
                                <tr
                                    key={movie.id}
                                    className="bg-gray-900 border-b border-gray-700 hover:bg-gray-800 transition duration-300"
                                >
                                    <td className="p-4">
                                        <Link
                                            to={`/movie/${movie.id}`}
                                            className="text-lg font-semibold text-white hover:text-yellow-400"
                                        >
                                          <span className="mr-2">{index + 1} :</span>
                                          <span>{movie.customTitle || 'Untitled'}</span>
                                        </Link>
                                    </td>
                                    <td className="p-4 text-white">
                                        {/* Display truncated description */}
                                        {movie.customOverview ? (
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: truncateText(movie.customOverview, 100),
                                                }}
                                            />
                                        ) : (
                                            'No description available'
                                        )}
                                    </td>
                                    <td className="p-4 text-center">
                                        <button
                                            onClick={() => deleteMoive(movie._id)}
                                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition duration-300"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default AdminPage;
