const userRouter = require('express').Router();

const {
  getUser,
  updateUserInfo,
} = require('../controllers/users');

userRouter.get('/me', getUser); // Роут получения юзера
userRouter.patch('/me', updateUserInfo); // Роут обновления данных юзера

module.exports = userRouter;
