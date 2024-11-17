const express  = require('express');
const router = express();
router.use(express.json());
const movieController = require('../controllers/movieController');



router.get('/all' , movieController.getAllMovies);
router.post('/create' , movieController.updateMovieDetails);
router.delete('/movie/:id' , movieController.deleteMovie); 

module.exports = router;