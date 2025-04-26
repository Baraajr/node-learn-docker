const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { createClient } = require('redis');
const os = require('os');
// const { Client } = require('pg');

const app = express();

// connect redis
const REDIS_HOST = 'redis';
const REDIS_PORT = 6379;
const redisClient = createClient({
  url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
});
redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('Redis Client Connected'));
redisClient.connect();

// connect mongodb
const DB_USER = 'root';
const DB_PASWWORD = 'test1234';
const DB_PORT = 27017;
const DB_HOST = 'mongo';
const url = `mongodb://${DB_USER}:${DB_PASWWORD}@${DB_HOST}:${DB_PORT}`;
mongoose
  .connect(url)
  .then(() => console.log('DB connected'))
  .catch((err) => console.log(err));

// connect postgresdb
// const DB_USER = 'root';
// const DB_PASWWORD = 'test1234';
// const DB_PORT = 5432;
// const DB_HOST = 'postgres';
// const url = `postgres://${DB_USER}:${DB_PASWWORD}@${DB_HOST}:${DB_PORT}`;
// const client = new Client({
//   connectionString: url,
// });
// client
//   .connect()
//   .then(() => {
//     console.log('PostgresDB connected');
//   })
//   .catch((err) => {
//     console.log('PostgresDB connection error', err);
//   });

app.use(morgan('dev'));

app.get('/', (req, res) => {
  redisClient.set('products', '{"name":"product1","price":100}');
  console.log(`response from ${os.hostname()}`); // id of container
  res.send(`<h1>Main Page</h1>
    <h2>Redis is used to cache the data</h2>
    <h2>docker hub image used </h2>
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
