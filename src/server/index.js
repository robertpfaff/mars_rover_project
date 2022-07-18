require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const path = require('path')
const cookieParser = require('cookie-parser')

const app = express()
const port = 3000

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, '../public')))

// your API calls

app.get('/gallery/:rover', async (req, res) => {

    const chosenRover = req.params['rover']
    console.log("Chosen Rover")
    console.log("Response:", rover) // produces error Response = rover, not rover name, but the key 'rover.'
    console.log("Request Params Rover")
    console.log(req.query)
    console.log("Request ALL Params")
    console.log(req.params)

    try {
        let gallery = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/latest_photos?api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        res.send({ gallery })
        console.log(gallery)
    } catch (err) {
        console.log('error:', err);
    }
});

// example API call
app.get('/apod', async (req, res) => {
    try {
        let image = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        res.send({ image })
    } catch (err) {
        console.log('error:', err);
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
