let store = {
    apod: '',
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
    chosenRover: "curiosity"
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
    console.log("Rovers")
    console.log(rovers)
    console.log("Apod")
    console.log(apod)

    if (store.chosenRover != undefined || "")
    console.log(store.chosenRover)
    return `

    `
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

    const roverPhotos = await fetch(`http://localhost:3000/gallery`)
        .then(res => res.json())
        .then(data => updateStore(store, { data }))
        .catch(err => { console.log(err) });

    return data
}

console.log(getRoverPhotos(store.chosenRover));

