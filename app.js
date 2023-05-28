const express = require('express');
const mongoose = require('mongoose');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb');

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server started on ${PORT} port`);
});
