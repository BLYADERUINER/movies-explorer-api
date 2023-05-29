const RESPONSE_OK = 200; // успех
const RESPONSE_CREATED = 201; // успешно создан
const ERROR_BAD_REQUEST = 400; // неверный запрос
const ERROR_UNAUTHORIZED = 401; // требует аутентификацию
const ERROR_FORBIDDEN = 403; // нет прав
const ERROR_NOT_FOUND = 404; // не найдено
const ERROR_CONFLICT = 409; // конфликт с ресурсом
const ERROR_DEFAULT = 500; // дефолт ошибка сервера

module.exports = {
  ERROR_UNAUTHORIZED,
  RESPONSE_OK,
  RESPONSE_CREATED,
  ERROR_BAD_REQUEST,
  ERROR_FORBIDDEN,
  ERROR_NOT_FOUND,
  ERROR_CONFLICT,
  ERROR_DEFAULT,
};
