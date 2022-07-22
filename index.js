const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const app = express();

app.use('/', express.static(path.join(__dirname, '../public')));

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/formdata', (req, res) => {
  res.send(req.body.rover);
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server running on port${port}`);
});