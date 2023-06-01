const Movie = require('../models/movie');

const { RESPONSE_OK, RESPONSE_CREATED } = require('../errors/statuscode');

const { responseMessage } = require('../utils/config');

const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');

// Получение всех избранных фильмов
const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => responseMessage(res, RESPONSE_OK, { data: movies }))
    .catch(next);
};

// Создание избранного фильма
const createFavoriteMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => responseMessage(res, RESPONSE_CREATED, { data: movie }))
    .catch(next);
};

// Удаление фильма
const removeMovie = (req, res, next) => {
  const owner = req.user._id;
  const { _id } = req.params;

  Movie.findById(_id)
    .orFail(() => { // если Id нет возвращаем ошибку
      throw new NotFoundError('Произошла ошибка: фильм не найден');
    })
    .then((movie) => {
      if (owner !== String(movie.owner)) { // проверяем права
        throw new ForbiddenError('Произошла ошибка: у вас нет прав на удаление');
      } else {
        return movie.deleteOne()
          .then(() => responseMessage(res, RESPONSE_OK, { message: 'Фильм удален' }));
      }
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createFavoriteMovie,
  removeMovie,
};
