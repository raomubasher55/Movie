// movieController.js
const CustomMovie = require("../models/CustomMovie");
const axios = require("axios");

const THIRD_PARTY_API_URL = "https://api.themoviedb.org/3/movie/changes";
const headers = {
  Authorization: `Bearer ${process.env.MOVIE_TOKEN}`,
};

// Function to fetch movies for all pages
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await CustomMovie.find({});
    res.status(200).json({
      success: true,
      movies,
    });
  } catch (err) {
    res.status(500).json({ error: err.message }); // Error handling
  }
};

// Update custom title and overview for a movie
exports.updateMovieDetails = async (req, res) => {
  const {
    movieId,
    customTitle,
    customOverview,
    metaTag,
    category,
    description,
  } = req.body;

  try {
    const movie = await CustomMovie.findOneAndUpdate(
      { movieId },
      { customTitle, customOverview, metaTag, category, description },
      { new: true, upsert: true }
    );
    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// delete
exports.deleteMovie = async (req, res) => {
  try {
    const movieId = req.params.id;
    const movie = await CustomMovie.findByIdAndDelete(movieId);
    res.json({
      success: true,
      movie
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
