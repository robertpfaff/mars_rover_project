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

// create content
const App = (state) => {
    let { store, newState } = state

console.log("App: State Variable)")
console.log("State")
console.log(state)

const capitalize = ([first, ...rest], lowerRest = false) =>
  first.toUpperCase() + (lowerRest ? rest.join('').toLowerCase() : rest.join(''));

// Makes and merges rover and photo info objects for cards.
const InfoObjects = (state) => {

    const PhotoInfo = state.latest_photos.map(photo => photo.img_src)
    const RoverInfo = state.latest_photos.map(photo => Object.entries(photo.rover))
    const RoverPhotoInfo = (RoverInfo, PhotoInfo) => RoverInfo.map((photo, i) => ({...photo, Data: PhotoInfo[i]}));
    console.log(RoverPhotoInfo(RoverInfo, PhotoInfo));

    return RoverPhotoInfo
}
const callInfoObjects = console.log(InfoObjects(state))

// Render content based on user input chosenRover.

// if chosenRover is defined, run function to create slideshow.
// if chosenRover not defined, run function to send form, alert user

if (state.chosenRover != undefined) {
    const chosenRover = capitalize(state.chosenRover);
    console.log(chosenRover)
    return (`
    <header>
    </header>

    <div class="container">
        <div>
            <h1 class="main-title">Welcome to the ${chosenRover} Gallery</h1>
        </div>
        <div>
        ${callInfoObjects}
        </div>

    <footer>
    <footer>
`)

}


// Make Boostrap slideshow/carousel for display in html








// Generally, a return value is used where the function is an intermediate step in a calculation of some kind.
// END OF APP FUNCTION.
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
