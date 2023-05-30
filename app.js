const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');

// const cors = require('./middlewares/cors');
const { PORT, MONGOOSE_URL, limiter } = require('./utils/config');
const handleErrors = require('./middlewares/handlerErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');

const app = express();
mongoose.connect(MONGOOSE_URL);

// app.use(cors);
app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use(cookieParser());

app.use(requestLogger);

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`Server started on ${PORT} port`);
});
