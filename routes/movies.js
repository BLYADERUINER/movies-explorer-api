const movieRouter = require('express').Router();

const {
  getMovies,
  createFavoriteMovie,
  removeMovie,
} = require('../controllers/movies');

movieRouter.get('/', getMovies); // Роут получения фильмов
movieRouter.post('/', createFavoriteMovie); // Роут создания фильма
movieRouter.delete('/_id', removeMovie); // Роут удаления фильма

module.exports = movieRouter;
