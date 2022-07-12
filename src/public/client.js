let store = {
    rovers: ['curiosity', 'opportunity', 'spirit'],
    chosenRover: 'curiosity'
}

// add our markup to the page
const root = document.getElementById('root')

const updateStore = (store, newState) => {
    store = Object.assign(store, newState)
    render(root, store)
}

const render = async (root, state) => {
    root.innerHTML = App(state)
}

// Helper function/code to capitalize words as neccessary.
const capitalize = ([first, ...rest], lowerRest = false) =>
  first.toUpperCase() + (lowerRest ? rest.join('').toLowerCase() : rest.join(''));

// Render content based on user input chosenRover.
// if chosenRover is defined, run function to create slideshow.
// if chosenRover not defined, run function to send form, alert user

// CREATE CONTENT STARTING HERE:
// Closure starts
const App = (state) => {
    let { store, newState } = state

// Makes and merges rover and photo info objects for cards.

const showRoverPhotos = (state) => {

    const imageURLs = state.latest_photos.map(photo => photo.img_src)
    imageURLs.forEach(imageURL => console.log(imageURL))
    const imageObjects = state.latest_photos.map(photo => photo.img_src = new Image(800,800))
    const imageDates = state.latest_photos.map(photo => photo.earth_date)
    const cameraNames = state.latest_photos.map(photo => photo.camera.full_name)
    const roversNames = state.latest_photos.map(photo => photo.rover.name)
    const roversStatus = state.latest_photos.map(photo => photo.rover.status)
    const roversLaunchDates = state.latest_photos.map(photo => photo.rover.launch_date)
    const roversLandDates = state.latest_photos.map(photo => photo.rover.landing_date)
    const roverPhotoInfo = (imageURLs, imageObjects, imageDates, cameraNames, roversNames, roversStatus, roversLaunchDates, roversLandDates) => imageURLs.map((imageURL, i) => ({imageURL, imageObject: imageObjects[i], imageDate: imageDates[i], cameraName: cameraNames[i], roverName: roversNames[i],
        roverStatus: roversStatus[i], roverLaunchDate: roversLaunchDates[i], roverLandDate: roversLandDates[i]
    }));
    console.log("Rover Photo Info Objects")
    photoInfo = roverPhotoInfo(imageURLs, imageObjects, imageDates, cameraNames, roversNames, roversStatus, roversLaunchDates, roversLandDates)
    console.log("Image Maps")
    const imageMaps = Array.from(photoInfo)
    console.log(imageMaps)
    // Flattens array values. Easier to work with.
    // Don't forget: Single array of objects
    return (imageMaps.map( item =>
    `<div class="container">
    <img src=${item.imageURL} width=800px height=800px alt="Mars Rover Photo Taken ${item.imageDate}"/>
    <p><span>Rover Name:</span> ${item.roverName}</p>
    <p><span>Rover Status:</span> ${item.roverStatus}</p>
    <p><span>Launch Date:</span> ${item.roverLaunchDate}</p>
    <p><span>Landing Date:</span> ${item.roverLandDate}</p>
    <p><span>Image Date:</span> ${item.imageDate}</p>
    <p></p>
    <hr/>
    <p></p>
    </div>`).slice(0, 50).join(""))

}
// const values = Array.prototype.map.call(elems, ({ value }) => value);

console.log("App: State Variable")
console.log("State")
console.log(state)

if (state.chosenRover != undefined) {
    const chosenRover = capitalize(state.chosenRover)
    return (`
            <header>
            <h2 class="main-title">Welcome to the ${chosenRover} Rover's Gallery</h2>
            </header>
                <div class="main">
                <hr />
                <p>Show Rover Photos</p>
                <div>${showRoverPhotos(state)}
                </div>
                <br></br>
                <hr />
            </div>
            <footer>
            <footer>
        `)
} else {
    return (`Return to user form`)

}

// Closure ends
// END OF APP FUNCTION
}

// Single async higher-order/callback function
// Retrieves image data and update store/new state
// getRoverPhotos is Higher Order function.
// RoverPhotos as callback function.

const getRoverPhotos = async (state, fn) => {

    const response = await fetch("http://localhost:3000/gallery", {
        method: "GET",
        headers: {
            Accept: "application/json"
        }
});

const jsonImageData = await response.json();

const RoverImageData = jsonImageData.gallery.latest_photos.map(photo => {
    return photo.img_src;

});

    console.log("Rover Image Data:")
    console.log(RoverImageData)

    const newState = jsonImageData.gallery
    updateStore(store, newState)
    return RoverImageData
}

getRoverPhotos(store, updateStore)

// Fetch API Data Form function
/*
const getDatafromForm = () => {
    const userInput = {
        chosenRover : "chosenRover",
        cameraAngle : "cameraAngle"
    };
    return userInput
}

// Sample Build URl function. Return template literal.

const buildRequestURL = (requestData) => {
  return `http://localhost:3000/gallery/${requestData.rover}&LimitTo=[rovers]`

*/
