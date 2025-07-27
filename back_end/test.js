// test-server.js
const express = require('express');
const path = require('path');
const app = express();

app.use((req, res, next) => {
  console.log("Request:", req.method, req.url);
  next();
});

app.use(express.static(path.join(__dirname, 'front_end')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'front_end', 'index.html'));
});

app.listen(3000, () => {
  console.log('Test server running on http://localhost:3000');
});
