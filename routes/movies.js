const movieRouter = require('express').Router();

const { movieValid, idValid } = require('../middlewares/validation');

const {
  getMovies,
  createFavoriteMovie,
  removeMovie,
} = require('../controllers/movies');

movieRouter.get('/', getMovies); // Роутер получения фильмов
movieRouter.post('/', movieValid, createFavoriteMovie); // Роутер создания фильма
movieRouter.delete('/:_id', idValid, removeMovie);// Роутер удаления фильма

module.exports = movieRouter;
