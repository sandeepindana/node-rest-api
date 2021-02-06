// Express

const express = require('express');
var app = express();
// var router = express.Router();

// Mysql
const mysql = require('mysql');

// Body Parser 
const bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json);


// Cors
// const cors = require('cors');


app.get('/', (req, res) => {
    console.log('Runngggggggggggggggggggggggggg');
    res.writeHead(200, { 'Content-Type': 'text/JSON' });
    res.json({ message: 'App is running....' });
});


// require("./app/routes/task.routes.js")(app);

// App Listen at sever 3000
app.listen('3000', () => {
    console.log('Server is running at port 3000');
});

