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

    // use new Image constructor on image hyperlinks.
    const photoInfo = state.latest_photos.map(photo => photo.img_src  = new Image(800,800))
    // convert new images into html friendly objects?
    console.log("Photo Info")
    console.log(photoInfo)
    // Use object entries to capture rover info in one place
    const roverInfo = state.latest_photos.map(photo => Object.entries(photo.rover))
    console.log("Rover Info")
    console.log(roverInfo)
    // Make array of all earth_dates when images take.
    // Not completely necessary. But catches any irregularities.
    const imageDates = state.latest_photos.map(photo => photo.earth_date)
    console.log("Earth Dates")
    console.log(imageDates)
    // Recombine photo and rover information.
    // Easier to take rover[0] info for all object, but this catches any inconsitencies.
    const roverPhotos = (roverInfo, photoInfo) => roverInfo.map((rover, i) => ({...rover, image: photoInfo[i], imageDate: imageDates[i]}));
    console.log("Rover Photos")
    console.log(roverPhotos)
    // Flattens array values.
    const showPhotos = Array.from(roverPhotos(roverInfo, photoInfo))
    console.log("Show Photos")
    console.log(showPhotos)
    // Rearranges info as needed, produces single array of objects.
    const imageMaps = showPhotos.map(item => {
        return {
            imageSource: item.image,
            imageTakenOn: item.imageDate,
            roverName: item['1']['1'],
            roverStatus: item['4']['1'],
            landingDate: item['2']['1'],
            launchDate: item['3']['1']
            }
    })
    console.log("New Object")
    console.log(imageMaps)

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
