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

    const PhotoInfo = state.latest_photos.map(photo => photo.img_src)
    const RoverInfo = state.latest_photos.map(photo => Object.entries(photo.rover))
    const RoverPhotos = (RoverInfo, PhotoInfo) => RoverInfo.map((Rover, i) => ({...Rover, Image: PhotoInfo[i]}));
    showPhotos = Object.entries(RoverPhotos(RoverInfo, PhotoInfo))
    console.log("showPhotos")
    console.log(showPhotos)
    const photo = new Image(800, 800)
    console.log("photo")
    console.log(photo)
    photo.src = showPhotos["0"]["1"].Image
    console.log("photo.src")
    console.log(photo.src)
    photo.alt = 'Mars Rover Photo'
    return `<img src=${photo.src} alt=${photo.alt} />`
}

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
                <div>${showRoverPhotos(state)}</div>
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
