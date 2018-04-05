const express = require('express');
const http = require('http');
const path = require('path');
const { Pool } = require('pg');

function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

const app = express();

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
  console.log('Table Feedback created');
});


const port = process.env.PORT || 3000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log('Running'));

app.post("/api/feedback", (req, res) => {
  const request = req.body;
  console.log('request: ' + req);

  pool.query('SELECT NOW() as now', (err, result) => {
    if (err) handleError(res, err.message, "Failed to SELECT NOW().");

    console.log(result.rows[0]);
    res.send(200);
  });

});
