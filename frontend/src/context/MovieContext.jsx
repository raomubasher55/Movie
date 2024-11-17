import React, { useState, useContext, createContext, useEffect } from 'react';

const MovieContext = createContext();

const MovieProvider = ({ children }) => {
    const [movies, setMovies] = useState();
    const [categoriesMovies, setCategoriesMovies] = useState();


    useEffect(() => {
    }, [categoriesMovies])


    const fetchMovies = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/v1/all`);
            if (!response.ok) {
                throw new Error('Failed to fetch movies');
            }
            const data = await response.json();
            // console.log(data)
            setMovies(data);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };



    //   delete movie

    const deleteMoive = async(id) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/v1/movie/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            );
            // if (!response.ok) {
            //     throw new Error('Failed to delete movie');
            // }
            fetchMovies();
        
        }
        catch(error){
            console.error('Error deleting movie:', error);
        }
}


// Fetch movies on component mount
useEffect(() => {
    fetchMovies();
}, []);


return (
    <MovieContext.Provider value={{
        movies,
        // selectedMovie,
        // setSelectedMovie,
        fetchMovies,
        categoriesMovies,
        setCategoriesMovies,
        deleteMoive
        // updateMovieOverview,
    }}>
        {children}
    </MovieContext.Provider>
);
};

const useMovieContext = () => {
    return useContext(MovieContext);
}

export { MovieProvider, useMovieContext };
