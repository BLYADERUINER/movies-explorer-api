const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env; // productionKey
const { DEVKEY, responseMessage } = require('../utils/config');
const { RESPONSE_OK, RESPONSE_CREATED } = require('../errors/statuscode');

const User = require('../models/user');

// Получение авторизованного юзера
const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => responseMessage(res, RESPONSE_OK, { data: user }))
    .catch(next);
};

// Обновление инфы о юзере
const updateUserInfo = (req, res, next) => {
  const owner = req.user._id;
  const { email, name } = req.body;

  User.findByIdAndUpdate(owner, { email, name }, { new: true, runValidators: true })
    .then((userInfo) => responseMessage(res, RESPONSE_OK, { data: userInfo }))
    .catch(next);
};

// Регистрация
const createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;

  bcrypt.hash(password, 10) // хэшируем пароль
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => {
      responseMessage(res, RESPONSE_CREATED, {
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    })
    .catch(next);
};

// Авторизация
const authorization = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = JWT.sign( // генерируем токен валидный 7д
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : DEVKEY,
        { expiresIn: '7d' },
      );

      res // возвращем ответом куками токен
        .cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true })
        .send({ message: 'Авторизация прошла успешно' });
    })
    .catch(next);
};

// Выход из учетки
const signout = (req, res) => {
  try {
    res.clearCookie('jwt'); // чистка кук, токена ЖВТ
    return responseMessage(res, RESPONSE_OK, { message: 'Вы вышли из системы' });
  } catch (err) {
    return new Error('Неудачная попытка выйти из акканута');
  }
};

module.exports = {
  getUser,
  updateUserInfo,
  createUser,
  authorization,
  signout,
};
