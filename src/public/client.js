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

console.log("Inside App(state)")
console.log("State")
console.log(state)
console.log("Store")
console.log(store)
console.log("New State:")
console.log(newState)

// Map image urls

const mapImageURLs = (state) => {
    console.log("Map Image URLs")
    roverURLs = state.latest_photos.map(photo => photo.img_src)
    console.log(roverURLs)
}
mapImageURLs(state);

// For each rover url, map related information





// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})






// end of App section
}

// ------------------------------------------------------  HANDLERS

// ------------------------------------------------------  COMPONENTS


// ------------------------------------------------------  API CALLS

// Works only with RoverPhotos as callback function.
// getRoverPhotos is Higher Order function.


// single async higher-order/callback function
// to retrieve image data and update store/new state

const getRoverPhotos = async (state, fn) => {

    const response = await fetch("http://localhost:3000/gallery", {
        method: "GET",
        headers: {
            Accept: "application/json"
        }
});

const jsonImageData = await response.json();

const ImageData = jsonImageData.gallery.latest_photos.map(photo => {
    return photo.img_src;
});

    const newState = jsonImageData.gallery
    updateStore(store, newState)
    return ImageData
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
