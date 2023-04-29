///studentserver.js
// Importing the required modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');
const res = require('express/lib/response')
// Connection URI for MongoDB
const MongoClient = require('mongodb').MongoClient;
var config = require('./config');
const uri = 'mongodb+srv://admin:admin@studentdb.4dvz4nf.mongodb.net/?retryWrites=true&w=majority';
// Configuring the server
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('./public'));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

//route for getting data from the moviedb api, this is for the trending/home page

app.get('/trending', async (req, res) => {
  const { page } = req.query;

  try {
    const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie`, {
      params: {
        api_key: '8634de54298be041f009b7c918664433',
        sort_by: 'popularity.desc',
        with_genres: 16,
        with_original_language: 'ja',
        page: page
      }
    });
    res.status(200).send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.get('/latest', async (req, res) => {
  const { page } = req.query;

  try {
    const { data } = await axios.get(`https://api.themoviedb.org/3/movie/now_playing`, {
      params: {
        api_key: '8634de54298be041f009b7c918664433',
        language: 'en-US',
        page: page
      }
    });
    res.status(200).send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.get('/search', async (req, res) => {
  const { query, page } = req.query;

  try {
    const { data } = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
      params: {
        api_key: '8634de54298be041f009b7c918664433',
        language: 'en-US',
        query: query,
        page: page
      }
    });
    res.status(200).send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.listen(5678); //start the server
console.log('Server is running...');

