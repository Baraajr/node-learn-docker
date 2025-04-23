const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
// connect db
const DB_USER = 'root';
const DB_PASWWORD = 'test1234';
const DB_PORT = 27017;
const DB_HOST = '172.18.0.2';
const url = `mongodb://${DB_USER}:${DB_PASWWORD}@${DB_HOST}:${DB_PORT}`;
mongoose
  .connect(url)
  .then(() => console.log('DB connected'))
  .catch((err) => console.log(err));

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send(`<h1>Main Page</h1>
    <h2>Hot reload  </h2>
    `);
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`server is listening on  ${PORT}`);
});
