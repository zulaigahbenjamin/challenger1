const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'bn3adg0gkuzco9sarfvi-mysql.services.clever-cloud.com',
  user: 'ujk5knbkq02y5lm9',
  password: 'ab38yOM4Mb9fvpDFLzpu',
  database: 'bn3adg0gkuzco9sarfvi'
});


connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});


module.exports = connection;