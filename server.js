const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

function handleError(res, reason, message, code) {
  console.log('ERROR: ' + reason);
  res.status(code || 500).send({'error': message});
}

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

pool.query('CREATE TABLE IF NOT EXISTS Feedback(' +
  'id SERIAL PRIMARY KEY, ' +
  'rating SMALLINT CHECK (rating >= 1 AND rating <= 5), ' +
  'comment VARCHAR(1000));', (err, res) => {
  if (err) {
    console.log("ERROR: Failed to create a table. " + err.message)
  } else {
    console.log('Table Feedback created or already in database.');
  }
});


const port = process.env.PORT || 3000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log('Running'));

app.post('/api/feedback', (req, res) => {
  const feedback = req.body;
  console.log('request body: ', feedback);

  const rating = feedback.rating;
  const comment = feedback.comment;

  const query = 'INSERT INTO Feedback(rating, comment) VALUES($1, $2) RETURNING *';
  const values = [rating, comment];

  pool.query(query, values, (err, result) => {
    if (err) {
      handleError(res, err.message, 'Failed to send a feedback.');
    } else {
      console.log('Added new feedback: ', result.rows[0]);
      res.status(200).send(feedback);
    }
  });

});
