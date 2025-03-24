// ./database/db-connector.js
require('dotenv').config();  // Add this line at the top of your file

// Get an instance of mysql we can use in the app
var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASSWORD,
    database        : process.env.DB_NAME
})

// Export it for use in our applicaiton
module.exports.pool = pool;