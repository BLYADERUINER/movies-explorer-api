require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');

const cors = require('./middlewares/cors');
const { PORT, MONGOOSE_URL, limiter } = require('./utils/config');
const handleErrors = require('./middlewares/handlerErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');

const app = express();
mongoose.connect(MONGOOSE_URL);

app.use(cors);
app.use(express.json());
app.use(helmet());
app.use(cookieParser());
app.use(requestLogger);
app.use(limiter);

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`Server started on ${PORT} port`);
});
