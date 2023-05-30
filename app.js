const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const { PORT, MONGOOSE_URL } = require('./utils/config');
const handleErrors = require('./middlewares/handlerErrors');
const router = require('./routes/index');

const app = express();
mongoose.connect(MONGOOSE_URL);

app.use(express.json());
app.use(cookieParser());

app.use(router);

app.use(errors());
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`Server started on ${PORT} port`);
});
