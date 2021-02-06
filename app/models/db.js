// Mysql
const mysql = require('mysql');
const dbConfig = require("../config/db.config.js");

//Creating Connection
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
});

connection.connect(function (err) {
    if (err) {
        throw err;
    } else {
        console.log('Database Connected...');
    }
});

module.exports = connection;