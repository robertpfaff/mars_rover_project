const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fetch = require('node-fetch');
const app = express();

app.use('/', express.static(path.join(__dirname, '../public')));

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/formdata', async (req, res) => {

  const rover = req.body.rover

  try {
    let gallery = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/latest_photos?api_key=DH46IQlx0gMyXPmLAgkxXDSPo2OrbIjPs8OJLj6L`)
    .then(res => res.json())
    res.send({ gallery })
    console.log(gallery)
  } catch (err) {
    console.log('error:', err);
  }
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server running on port${port}`);
});