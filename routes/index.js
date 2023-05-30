const router = require('express').Router();

const userRouter = require('./users');
const movieRouter = require('./movies');

const authentication = require('../middlewares/authentication');
const { authorization, createUser, logout } = require('../controllers/users');
const RequestNotFound = require('../errors/request-not-found');

router.post('/signup', createUser); // Роут регистрации
router.post('/signin', authorization); // Роут авторизации
router.post('/logout', logout); // Роут логаута

router.use('/users', authentication, userRouter); // Роут юзеров
router.use('/movies', authentication, movieRouter); // Роут фильмов
router.use('*', authentication, RequestNotFound); // Роут несуществующего запроса

module.exports = router;
