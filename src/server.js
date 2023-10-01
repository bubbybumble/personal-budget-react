const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');

app.use(cors());

app.get('/budget', (req, res) => {
  res.json( require(__dirname + '/chart-data.json') );
});

app.listen(port, () => {
  console.log(`API listening at localhost:${port}`);
});