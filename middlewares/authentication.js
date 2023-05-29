const { NODE_ENV, JWT_SECRET } = process.env;
const JWT = require('jsonwebtoken');

const UnauthorizedError = require('../errors/unauthorized-error');
const { DEVKEY } = require('../utils/config');

// Аутентификация
function authentication(req, res, next) {
  const token = req.cookies.jwt; // находим в куках токен
  if (!token) return (new UnauthorizedError('Произошла ошибка: вы не авторизованы!'));

  let validToken;

  try {
    validToken = JWT.verify(token, NODE_ENV === 'production' ? JWT_SECRET : DEVKEY); // проверяем на валидность
  } catch (err) {
    return next(new UnauthorizedError('Произошла ошибка: вы не авторизованы!'));
  }

  req.user = validToken;
  return next();
}

module.exports = authentication;
