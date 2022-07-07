let store = {
    apod: '',
    rovers: ['curiosity', 'opportunity', 'spirit'],
    currentRover: 'curiosity'
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
    let { chosenRover, rovers, apod } = state

    // At this point, state is equal to store.
    console.log("Inside App(state)")
    console.log(state)
    // use map to collect array of rover photo urls
    const mapRoverURLs = (state) => {
        const roverURLs = state.roverPhotos.gallery.latest_photos.map(photo => photo.img_src);
        console.log("roverURLs")
        console.log(roverURLs)
        return roverURLs
    }

    mapRoverURLs(state)


        // for each URL gather related data into separate object
        // const gatherImageData = (state) => {
        // const roverName = state.data.gallery.latest_photos[0].rover.name

        // if chosen rover defined, then assign variables to required data.
        // info same for all images so just use zero
        // use pure function to bundle them for each photo?

        // 1. Make array of photo urls.
        // 2. Wrap each url in img
        // 2. For each url in array, make object with related info
        // 3. Nest objects in

        const roverName = state.roverPhotos.gallery.latest_photos[0].rover.name
        console.log("Rover Name:")
        console.log(roverName)

        const roverStatus = state.roverPhotos.gallery.latest_photos[0].rover.status
        console.log("Rover Status:")
        console.log(roverStatus)

        const launchDate = state.roverPhotos.gallery.latest_photos[0].rover.launch_date
        console.log("Landing Date:")
        console.log(launchDate)

        const landingDate = state.roverPhotos.gallery.latest_photos[0].rover.landing_date
        console.log("Launch Date:")
        console.log(landingDate)

}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})



// ------------------------------------------------------  HANDLERS
// check to make sure item is image.
// if yee, wrap in img tags
// store in gallery folder temporarily
// empty folder at end of session

// Wrap rover photos in img tags for display
// This function maps roverPhotos into array of image urls for display.
// Places urls into const variable called roverGallery

 /* const roverURLs = async ( fn ) => {
    const roverPhotos = await getRoverPhotos(chosenRover)
    roverGallery = await roverPhotos.gallery.latest_photos.map(photo => photo.img_src)
    console.log("Results roverURLs/roverGallery function:")
    console.log(roverGallery)
    return roverGallery
}
*/

// ------------------------------------------------------  COMPONENTS

// Creates content for each scenario. 
// Then call (const var) function inside App to display
// const showRoverPhotos =  (roverPhotos) => {

    // If chosenRover does not exist, inform user and send back to form.
    // If chosenRover selected, but no photos availble, inform user, send back to form.
    // If conditions are right (chosenRover exists in state, and photos exist), display.
    // In gallery. Use conditional framework to produce correct photo sets.
    // Remember to collect and display  name, launch_date, landing_date, status

// ------------------------------------------------------  API CALLS

// This API call gets image data from the backend.
// Transforms the fetch data roverPhotos into
//  an array of imgage urls for the gallery.

const getRoverPhotos = async (state) => {

    const response = await fetch(`http://localhost:3000/gallery`)
    const roverPhotos = await response.json()
    .then(roverPhotos => updateStore(store, { roverPhotos }))
    .catch(err => { console.log(err) });
}

const showRoverPhotos = getRoverPhotos(store.chosenRover)
console.log(showRoverPhotos)
