let store = {
    user: { name: "Student" },
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
    return `<!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <title>Welcome to Mars</title>
            <style>body {padding: 25px }</style>
            <meta name="description" content="">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="stylesheet" href="assets/stylesheets/form.css">
        </head>
        <body>
      <form action="./" class=".form__border" name="form">
                <div class="form__item">
                    <label for="givenname" class="form__label">Please select a rover:</label>
                    <select id="rover_name" name="rover_name" class="form__input">
                        <option value="curiosity">Curiosity</option>
                        <option value="opportunity">Opportunity</option>
                        <option value="spirit">Spirit</option>
                    </select>
                </div>
                <div class="form__item">
                <legend>Please select an Earth date:</legend>
                    <label for="givenname" class="form__label">
                    <input type="text" name="earth_date" class="form__input" placeholder="YYYY-MM-DD"
                    title="Please enter a date in this format: YYYY-MM-DD."/>
                    <label>
                <div>
                <div class="form__item">
                    <label for="givenname" class="form__label">Please select camera angle</label>
                    <select id="camera" name="camera" class="form__input">
                        <option value="Front Hazard Avoidance Camera">Front Hazard Avoidance Camera</option>
                        <option value="Rear Hazard Avoidance Camera">Rear Hazard Avoidance Camera</option>
                        <option value="Mast Camera">Mast Camera</option>
                        <option value="Chemistry and Camera Complex">Chemistry and Camera Complex</option>
                        <option value="Mars Hand Lens Imager">Mars Hand Lens Imager</option>
                        <option value="Mars Descent Imager">Mars Descent Imager</option>
                        <option value="Mars Descent Imager">Mars Descent Imager</option>
                        <option value="Navigation Camera">Navigation Camera</option>
                        <option value="Panoramic Camera">Panoramic Camera</option>
                        <option value="Miniature Thermal Emission Spectrometer">Miniature Thermal Emission Spectrometer</option>
                    </div>
                    <button id="submit">Submit</button>
            </form>
      </body>
    </html>
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

// Example of a pure function that renders infomation requested from the backend
const ImageOfTheDay = (apod) => {

    // If image does not already exist, or it is not from today -- request it again
    const today = new Date()
    const photodate = new Date(apod.date)
    console.log(photodate.getDate(), today.getDate());

    console.log(photodate.getDate() === today.getDate());
    if (!apod || apod.date === today.getDate() ) {
        getImageOfTheDay(store)
    }

    // check if the photo of the day is actually type video!
    if (apod.media_type === "video") {
        return (`
            <p>See today's featured video <a href="${apod.url}">here</a></p>
            <p>${apod.title}</p>
            <p>${apod.explanation}</p>
        `)
    } else {
        return (`
            <img src="${apod.image.url}" height="350px" width="100%" />
            <p>${apod.image.explanation}</p>
        `)
    }
}

// ------------------------------------------------------  COMPONENNT FUNCTIOND

// Creates content for each scenario. 
// Then call (const var) function inside App to display


const showRoverPhotos =  (state) => {

    // Pure function
    // If chosenRover does not exist, inform user and send back to form.
    // If chosenRover selected, but no photos availble, inform user, send back to form.
    // If conditions are right (chosenRover exists in state, and photos exist), display.
    // In gallery. Use conditional framework to produce correct photo sets.
    // Remember to collect and display  name, launch_date, landing_date, status

    if (store.chosenRover != undefined) { // if chosenRover is not undefined.
        // Grab photos from API based on user input.
        if (store.chosenRover == 'curiosity'.toLowerCase()) {
            return
        }
    }}
// ------------------------------------------------------  API CALLS

// Example API call
const getImageOfTheDay = (state) => {
    let { apod } = state

    fetch(`http://localhost:3000/apod`)
        .then(res => res.json())
        .then(apod => updateStore(store, { apod }))

        console.log("getImage results:")
        console.log(apod)

    return data
}

// This API call gets image data from the backend.
// Transforms the fetch data roverPhotos into
//  an array of imgage urls for the gallery.

const getRoverPhotos = (state) => {
    let { chosenRover } = state

    const RoverPhotos = fetch(`http://localhost:3000/rovers/chosenRover}`)
        .then(res => res.json())
        .then(json => updateStore({ json }))
    
        console.log("roverPhotos results:")
        console.log(RoverPhotos)
    
    return RoverPhotos
}

console.log("Call getRoverPhotos fetch function")
console.log(getRoverPhotos('curiosity'));

