const express = require('express');
const http = require('http');
const path = require('path');
const { Client } = require('pg');

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();

client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
});

client.query('CREATE TABLE IF NOT EXISTS Feedback(id SERIAL PRIMARY KEY, content VARCHAR(1000));', (err, res) => {
  if (err) throw err;
  console.log('Table Feedback created');
});

client.end((err, res) => {
  console.log('Initial connection to database terminated');
});

const port = process.env.PORT || 3000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log('Running'));

app.post("/api/feedback", (req, res) => {
  const request = req.body;
  console.log(request);

  client.connect((err, res) => {
    if (err) return next(err);

    client.query('SELECT NOW() as now', (err, res) => {
      done();
      if (err) return next(err);

      console.log(res.rows[0]);
      res.send(200);
    });
  });
});
