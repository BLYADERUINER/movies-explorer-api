const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const { PORT, MONGOOSE_URL } = require('./utils/config');
const checkedErrors = require('./middlewares/handlerErrors');

const app = express();
mongoose.connect(MONGOOSE_URL);

app.use(express.json());
app.use(cookieParser());

app.use(checkedErrors);

app.listen(PORT, () => {
  console.log(`Server started on ${PORT} port`);
});
