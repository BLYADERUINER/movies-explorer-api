const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');
const UnauthorizedError = require('../errors/unauthorized-error');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => isEmail(email),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

// кастом метод сравнения пароля
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password') // получаем майл с паролем
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильные логин или пароль!');
      }

      return bcrypt.compare(password, user.password) // сравниваем пароли
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Неправильные логин или пароль!');
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
