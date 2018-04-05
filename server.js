const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require("body-parser");
const { Pool } = require('pg');

function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).send({"error": message});
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

pool.query('CREATE TABLE IF NOT EXISTS Feedback(id SERIAL PRIMARY KEY, content VARCHAR(1000));', (err, res) => {
  if (err) console.log("ERROR: Failed to create a table. " + err.message);
  console.log(res.rows[0]);
});


const port = process.env.PORT || 3000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log('Running'));

app.post("/api/feedback", (req, res) => {
  const request = req.body;
  console.log('request body: ', request);

  pool.query('SELECT NOW() as now', (err, result) => {
    if (err) handleError(res, err.message, "Failed to SELECT NOW().");

    console.log(result.rows[0]);
    res.status(200).send({"currentTime": result.rows[0]});
  });

});
