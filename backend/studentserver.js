///studentserver.js
// Importing the required modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');
const res = require('express/lib/response')
// Connection URI for MongoDB
const { MongoClient, ObjectId } = require('mongodb');
var config = require('./config');
const uri = "mongodb+srv://nicholasgiacobbe96:admin@cluster1.1tviz.mongodb.net/?retryWrites=true&w=majority";
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
app.delete('/users/:user_id/movie_list/:movie_id', async (req, res) => {
  try {
    const client = await MongoClient.connect(uri);
    const db = client.db('myapp');


    if (!user) {
      client.close();
      return res.status(404).send({ message: 'User not found' });
    }

    const movieIndex = user.movie_lists.findIndex(movie => movie.movie_id === req.params.movie_id);

    if (movieIndex === -1) {
      client.close();
      return res.status(404).send({ message: 'Movie not found' });
    }

    user.movie_lists.splice(movieIndex, 1);

    await users.updateOne({ _id: ObjectId(req.params.user_id) }, { $set: { movie_lists: user.movie_lists } });

    client.close();

    res.status(200).send({ message: 'Movie deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error deleting movie from user movie list' });
  }
});

// Get the user's movie list
app.get('/users/:user_id/movie_list', async (req, res) => {
  try {
    const client = await MongoClient.connect(uri);
    const db = client.db('myapp');

    const users = db.collection('users');

    const user = await users.findOne({ _id: ObjectId(req.params.user_id) });

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

// Update a movie in the user's movie list
app.put('/users/:user_id/movies/:movie_id', async (req, res) => {
  try {
    const client = await MongoClient.connect(uri);
    const db = client.db('myapp');

    const users = db.collection('users');

    const result = await users.updateOne(
      { 
        _id: ObjectId(req.params.user_id),
        "movie_lists.movie_id": req.params.movie_id
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


// Add a movie to the user's movie list





app.post('/users', async (req, res) => {
  try {

    const client = await MongoClient.connect(uri);
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


app.post('/users/:user_id/movies', async (req, res) => {
  try {
    const client = await MongoClient.connect(uri);
    const db = client.db('myapp');

    const users = db.collection('users');

    const movie = {
      movie_id: req.body.movie_id,
      rating: req.body.rating,
      comments: req.body.comments,
      watched: req.body.watched
    };

    const result = await users.updateOne(
      { _id: ObjectId(req.params.user_id) },
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

