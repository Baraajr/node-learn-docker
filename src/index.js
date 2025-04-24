const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { createClient } = require('redis');

const app = express();

const REDIS_HOST = 'redis';
const REDIS_PORT = 6379;
// connect redis
const redisClient = createClient({
  url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('Redis Client Connected'));

redisClient.connect();
// connect db
const DB_USER = 'root';
const DB_PASWWORD = 'test1234';
const DB_PORT = 27017;
const DB_HOST = 'mongo';
const url = `mongodb://${DB_USER}:${DB_PASWWORD}@${DB_HOST}:${DB_PORT}`;
mongoose
  .connect(url)
  .then(() => console.log('DB connected'))
  .catch((err) => console.log(err));

app.use(morgan('dev'));

app.get('/', (req, res) => {
  redisClient.set('products', '{"name":"product1","price":100}');
  res.send(`<h1>Main Page</h1>
    <h2>Hot reload  </h2>
    `);
});

app.get('/products', async (req, res) => {
  const products = await redisClient.get('products');
  if (products) {
    return res.json(JSON.parse(products));
  } else {
    return res.status(404).json({ message: 'No products found' });
  }
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`server is listening on  ${PORT}`);
});
