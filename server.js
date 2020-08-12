// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

// Dependencies
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
// Using console.log in the callback function test my server is running
const server = app.listen(port, () => console.log(`Server running on localhost: ${port}`));

// Create GET route that returns projectData object
app.get('/all', (req, res) => res.send(projectData));

// Create POST route that adds incoming data to projectData object
app.post('/add', (req, res) => {
    // Receiving temperature, date and userr response from the request body
    const {temperature, date, userResponse} = req.body;
    // Add incoming data to projectData object
    projectData.temperature = temperature;
    projectData.date = date;
    projectData.userResponse = userResponse;
    console.log(req.body);
});
