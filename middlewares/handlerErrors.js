const { ERROR_DEFAULT, ERROR_CONFLICT } = require('../errors/statuscode');
const { responseMessage } = require('../utils/config');

// Обработчик ошибок
const handleError = (err, req, res, next) => {
  const { statusCode = ERROR_DEFAULT, message } = err; // Получаем статус и месседж ошибки

  if (err.code === 11000) {
    responseMessage(res, ERROR_CONFLICT, { message: 'Пользователь с таким email уже существует' });
    return;
  }

  console.log(err);

  responseMessage(res, statusCode, { // возвращем статус и месседж
    message: statusCode === ERROR_DEFAULT
      ? 'Внутреняя ошибка сервера'
      : message,
  });

  next();
};

module.exports = handleError;
