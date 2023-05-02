///studentserver.js
// Importing the required modules
require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');
const res = require('express/lib/response')
// Connection URI for MongoDB
const { MongoClient, ObjectId } = require('mongodb');
var config = require('./config');
const apiKey = process.env.API_KEY;
const mongoUri = process.env.MONGODB_URI;
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

/**
 * delete a movie from the user's movie list
 * @function deleteMovie
 * @param {string} user_id - the user's id
 * @param {string} movie_id - the movie's id
 * 
 * @returns {object} - the updated user object
 * 
 * @throws {object} - the error object
 * 
 * @example
 * deleteMovie('123', '456')
 * .then(user => console.log(user))
 * .catch(err => console.error(err));
 */
app.delete('/users/:user_id/movies/:movie_id', async (req, res) => {
  try {
    const client = await MongoClient.connect(mongoUri);
    const db = client.db('myapp');

    const users = db.collection('users');

    const result = await users.updateOne(
      { user_id: req.params.user_id },
      { $pull: { movie_lists: { movie_id: parseInt(req.params.movie_id) } } }
    );

    client.close();

    if (result.modifiedCount > 0) {
      res.status(200).send({ message: 'Movie deleted successfully' });
    } else {
      res.status(404).send({ message: 'Movie not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error deleting movie' });
  }
});

/**
 * get a movie from the user's movie list
 * @function getMovie
 * @param {string} user_id - the user's id
 * @param {string} movie_id - the movie's id
 * 
 * @returns {object} - the movie object
 * 
 * @throws {object} - the error object
 * 
 * @example
 * getMovie('123', '456')
 * .then(movie => console.log(movie))
 * .catch(err => console.error(err));
 */
app.get('/users/:user_id/movies/:movie_id', async (req, res) => {
  try {
    const client = await MongoClient.connect(mongoUri);
    const db = client.db('myapp');

    const users = db.collection('users');

    const result = await users.findOne(
      { user_id: req.params.user_id, "movie_lists.movie_id": parseInt(req.params.movie_id) },
      { projection: { "movie_lists.$": 1 } }
    );

    client.close();

    if (result && result.movie_lists.length > 0) {
      res.status(200).send(result.movie_lists[0]);
      console.log("success");
      console.log(req.params.user_id);
    } else {
      res.status(404).send({ message: 'Movie not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error retrieving movie' });
  }
});



/**
 * get the user's movie list
 * @function getMovieList
 * 
 * @param {string} user_id - the user's id
 * 
 * @returns {array} - the user's movie list
 * 
 * @throws {object} - the error object
 * 
 * @example
 * getMovieList('123')
 * .then(movieList => console.log(movieList))
 * .catch(err => console.error(err));
 */
app.get('/users/:user_id/movie_list', async (req, res) => {
  try {
    const client = await MongoClient.connect(mongoUri);
    const db = client.db('myapp');

    const users = db.collection('users');
    const user = await users.findOne({user_id: req.params.user_id });

    client.close();

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    res.status(200).send(user.movie_lists);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error retrieving user movie list' });
  }
});

/**
 * update a movie in the user's movie list
 * @function updateMovie
 * @param {string} user_id - the user's id
 * @param {string} movie_id - the movie's id
 * @param {number} rating - the movie's rating
 * @param {string} comments - the movie's comments
 * @param {boolean} watched - the movie's watched status
 * 
 * @returns {object} - the updated user object
 * 
 * @throws {object} - the error object
 * 
 * @example
 * updateMovie('123', '456', 5, 'good movie', true)
 * .then(user => console.log(user))
 * .catch(err => console.error(err));
 * 
 * @example
 * updateMovie('123', '456', null, null, false)
 * .then(user => console.log(user))
 * .catch(err => console.error(err));
 */
app.put('/users/:user_id/movies/:movie_id', async (req, res) => {
  try {
    const client = await MongoClient.connect(mongoUri);
    const db = client.db('myapp');

    const users = db.collection('users');

    const result = await users.updateOne(
      { 
        user_id: req.params.user_id,
        "movie_lists.movie_id": parseInt(req.params.movie_id)
      },
      { 
        $set: {
          "movie_lists.$.rating": req.body.rating,
          "movie_lists.$.comments": req.body.comments,
          "movie_lists.$.watched": req.body.watched
        }
      }
    );

    client.close();

    if (result.modifiedCount > 0) {
      res.status(200).send({ message: 'Movie updated successfully' });
    } else {
      res.status(404).send({ message: 'Movie not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error updating movie' });
  }
});

/**
 * create a new user
 * @function createUser
 * 
 * @param {string} user_id - the user's id
 * 
 * @returns {object} - the created user object
 * 
 * @throws {object} - the error object
 * 
 * @example
 * createUser('123')
 * .then(user => console.log(user))
 * .catch(err => console.error(err));
 */
app.post('/users', async (req, res) => {
  try {

    const client = await MongoClient.connect(mongoUri);
    const db = client.db('myapp');
    const users = db.collection('users');

    const existingUser = await users.findOne({ user_id: req.body.user_id });

    if (existingUser) {
      client.close();
      return res.status(409).send({ message: 'User already exists' });
    }

    const user = {
      user_id: req.body.user_id,
      movie_lists: []
    };

    await users.insertOne(user);

    client.close();

    res.status(201).send({ message: 'User created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error creating user' });
  }
});

/**
 * add a movie to the user's movie list
 * @function addMovie
 * @param {string} user_id - the user's id
 * @param {string} movie_id - the movie's id
 * @param {number} rating - the movie's rating
 * @param {string} comments - the movie's comments
 * @param {boolean} watched - the movie's watched status
 * 
 * @returns {object} - the updated user object
 * 
 * @throws {object} - the error object
 * 
 * @example
 * addMovie('123', '456', 5, 'good movie', true)
 * .then(user => console.log(user))
 * .catch(err => console.error(err));
 */
app.post('/users/:user_id/movies', async (req, res) => {
  try {
    const client = await MongoClient.connect(mongoUri);
    const db = client.db('myapp');

    const users = db.collection('users');

    const movie = {
      movie_id: req.body.movie_id,
      rating: req.body.rating,
      comments: req.body.comments,
      watched: req.body.watched
    };

    const result = await users.updateOne(
      { user_id: req.params.user_id },
      { $push: { movie_lists: movie } }
    );

    client.close();

    if (result.modifiedCount > 0) {
      res.status(200).send({ message: 'Movie added successfully' });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error adding movie' });
  }
});



/**
 * get the trending movies
 * @function getTrending
 * @param {number} page - the page number
 * 
 * @returns {object} - the trending movies object
 * 
 * @throws {object} - the error object
 * 
 * @example
 * getTrending(1)
 * .then(movies => console.log(movies))
 * .catch(err => console.error(err));
 */
app.get('/trending', async (req, res) => {
  const { page } = req.query;

  try {
    const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie`, {
      params: {
        api_key: apiKey,
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

 /**
  * get the latest movies
  * @function getLatest
  * @param {number} page - the page number
  * 
  * @returns {object} - the latest movies object
  * 
  * @throws {object} - the error object
  * 
  * @example
  * getLatest(1)
  * .then(movies => console.log(movies))
  * .catch(err => console.error(err));
  */
 app.get('/latest', async (req, res) => {
    const { page } = req.query;
    try {
      const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie`, {
        params: {
          api_key: apiKey,
        sort_by: 'release_date.desc',
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

  /**
   * search for movies
   * @function search
   * @param {string} query - the search query
   * 
   * @returns {object} - the search results object
   * 
   * @throws {object} - the error object
   * 
   * @example
   * search('totoro')
   * .then(movies => console.log(movies))
   * .catch(err => console.error(err));
   */
  app.post('/search', async (req, res) => {
    var query = req.body.query;
    try {
      console.log(query);
      const { data } = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
        params: {
          api_key: apiKey,
          with_genres: 16,
          with_original_language: 'ja',
          query: query  
          
        }
      });
      console.log(data)
      res.status(200).send(data);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });
  
  
  port = process.env.PORT || 5678;
  app.listen(port, () => {
  console.log(`Server started on port ${port}`);
  });

  if (process.env.NODE_ENV == "production") {
    app.use(express.static(path.join(__dirname, "/client/build")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client/build", "index.html"));
    });
}
