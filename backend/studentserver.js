///studentserver.js
// Importing the required modules
const express = require('express')
const app = express()
const path = require('path');
const bodyParser = require('body-parser');
// Connection URI for MongoDB
const MongoClient = require('mongodb').MongoClient;
var config = require('./config');
const uri = 'mongodb+srv://admin:admin@studentdb.4dvz4nf.mongodb.net/?retryWrites=true&w=majority';
// Configuring the server
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'build')));


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
/*app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});*/

// GET requests to render HTML pages
/*
app.get('/',function(req,res){
  res.render('home', { pageTitle: 'Home' });
});
app.get('/listStudent',function(req,res){
  res.render('listStudent', { pageTitle: 'Students' });
});
app.get('/addStudent',function(req,res){
  res.render('addStudent', { pageTitle: 'Add a Student' });
});
app.get('/displayStudent',function(req,res){
  res.render('displayStudent', { pageTitle: 'Single Student Record' });
});
app.get('/deleteStudent',function(req,res){
  res.render('deleteStudent', { pageTitle: '' });
});
app.get('/updateStudent',function(req,res){
  res.render('updateStudent', { pageTitle: 'Edit Student' });
});*/
// POST request to add a new student record to MongoDB
app.post('/students', async function(req, res) {
  var record_id = new Date().getTime();
  // Creating a new object to store the student record
  var obj = {};
  obj.record_id = record_id;
  obj.first_name = req.body.first_name;
  obj.last_name = req.body.last_name;
  obj.gpa = req.body.gpa;
  obj.enrolled = req.body.enrolled;
  const client = new MongoClient(uri,{useUnifiedTopology: true});
  try {
   
    const dbo = client.db(config.db.name);
    await dbo.collection(config.db.collection).insertOne(obj);
    console.log("Student record added successfully");
    client.close();
    res.send('Student record added successfully');
  } catch(err) {
    console.log(err);
    res.status(500).send('Error adding student record');
  }
});

// Define a route that listens for requests to retrieve a specific student record by its record_id
app.get('/students/:record_id', async function(req, res) {
  // Retrieve the record_id from the request parameters
  var record_id = req.params.record_id;

  try {
    // Connect to the MongoDB database
    const client = await MongoClient.connect(uri);
    const db = client.db(config.db.name);
    // Select the 'Students' collection
    const collection = db.collection('Students');

    // Find the student record with the given record_id
    const result = await collection.findOne({record_id: parseInt(record_id)});
    if (!result) { // If no record was found, send a 404 error response
      var rsp_obj = {};
      rsp_obj.record_id = record_id;
      rsp_obj.message = 'error - resource not found';
      return res.status(404).send(rsp_obj);
    } else { // If a record was found, send it as a JSON response
      return res.status(200).send(result);
    }
  } catch(err) { // If an error occurs, log it and send a 500 error response
    console.log('Error:', err);
    return res.status(500).send({"message": "Error finding student record"});
  }
});


// Handle GET requests to the "/students" endpoint
app.get('/students', async function(req, res) {

  // Connect to MongoDB
  try {
    const client = await MongoClient.connect(uri,{ useUnifiedTopology: true });
    const dbo = client.db(config.db.name);

    // Get the search query parameter (if it exists)
    const searchQuery = req.query.lastName;

    // Define the query object based on the search query parameter
    const query = searchQuery ? {last_name: searchQuery} : {};

    // Query the "Students" collection for documents matching the query object
    const result = await dbo.collection(config.db.collection).find(query).toArray();
    const obj = { students: result };

    // If no documents were found, add a message to the response object
    if (result.length === 0) {
      obj.message = "No data found";
    }

    // Send the response object with a 200 OK status code
    res.status(200).send(obj);

    // Close the database connection
    client.close();

  } catch(err) {
    // Log any errors and send a 500 Internal Server Error response
    console.log(err);
    res.status(500).send({"message": "error - internal server error"});
  }
});



// Define an endpoint for updating a student record using a PUT request
app.put('/students/:record_id', async function(req, res) {
  // Extract the record ID from the request parameters
  const record_id = req.params.record_id;
  // Extract the updated record information from the request body
  const { first_name, last_name, gpa, enrolled } = req.body;

  try {
    // Connect to the database
    const client = await MongoClient.connect(uri);
    const db = client.db(config.db.name);
    const collection = db.collection('Students');

    // Update the record with the given ID with the new information
    const result = await collection.updateOne(
      { record_id: parseInt(record_id) },
      { $set: { first_name, last_name, gpa, enrolled } }
    );

    // If the update did not modify any records, the record with the given ID was not found
    if (result.modifiedCount === 0) {
      const rsp_obj = { record_id, message: 'error - resource not found' };
      return res.status(404).send(rsp_obj);
    }

    // If the update was successful, return a success message
    const rsp_obj = { record_id, message: 'successfully updated' };
    return res.status(201).send(rsp_obj);

  } catch (err) {
    // If an error occurred, log the error and return an error message
    console.log('Error updating student record:', err);
    return res.status(500).send({ message: 'Error updating student record' });
  }
});




 //end put method

// DELETE request handler for '/students/:record_id'
app.delete('/students/:record_id', async function(req, res) {
  var record_id = req.params.record_id;

  try {
    // connect to the database
    const client = await MongoClient.connect(uri);
    const db = client.db(config.db.name);
    const collection = db.collection('Students');

    // delete the record with the specified record_id
    const result = await collection.deleteOne({record_id: parseInt(record_id)});

    // check if any record was deleted and send appropriate response
    if (result.deletedCount === 0) {
      var rsp_obj = {};
      rsp_obj.record_id = record_id;
      rsp_obj.message = 'error - resource not found';
      return res.status(404).send(rsp_obj);
    } else {
      return res.status(200).send({"message": "Student record deleted successfully"});
    }
  } catch (err) {
    // handle errors
    console.log('Error deleting student record:', err);
    return res.status(500).send({"message": "Error deleting student record"});
  }
});
 //end delete method
 app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(5678); //start the server
console.log('Server is running...');

