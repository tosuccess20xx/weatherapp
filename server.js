// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();
/* Dependencies */
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
const port = 5000;
// Spin up the server
app.listen(port, listening);
// Callback to debug
function listening() {
    console.log('server is running');
    console.log(`running on http://localhost:${port} <- Click the link to open`);
}

// GET route
app.get('/getData', (req, res) => {
    res.send(projectData);
});

// POST route   
app.post('/addData', (req, res) => {
    projectData = {
        temp: req.body.temp,
        date: req.body.date,
        userResponse: req.body.feelings
    };
    res.send();

});



