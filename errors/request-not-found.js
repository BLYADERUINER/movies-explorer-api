const NotFoundError = require('./not-found-error');

const RequestNotFound = (req, res, next) => next(new NotFoundError('Произошла ошибка: Запрос не найден'));

module.exports = RequestNotFound;
