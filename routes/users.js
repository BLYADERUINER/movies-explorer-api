const userRouter = require('express').Router();

const { userUpdateValid } = require('../middlewares/validation');
const {
  getUser,
  updateUserInfo,
} = require('../controllers/users');

userRouter.get('/me', getUser); // Роут получения юзера
userRouter.patch('/me', userUpdateValid, updateUserInfo); // Роут обновления данных юзера

module.exports = userRouter;
