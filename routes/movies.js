const movieRouter = require('express').Router();

const { movieValid, idValid } = require('../middlewares/validation');
const {
  getMovies,
  createFavoriteMovie,
  removeMovie,
} = require('../controllers/movies');

movieRouter.get('/', getMovies); // Роут получения фильмов
movieRouter.post('/', movieValid, createFavoriteMovie); // Роут создания фильма
movieRouter.delete('/_id', idValid, removeMovie); // Роут удаления фильма

module.exports = movieRouter;
