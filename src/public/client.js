// Global variable.

const button = ('#submit');

if (document.getElementById('submit').clicked == true) {

    window.addEventListener('load', () => {

    // Get query parameters

    const params = (new URL(document.location)).searchParams;
    const name = params.get('name');
    const rover = params.get('rover');
    const camera = params.get('camera');

    document.getElementById("result-name").innerHTML = name;
    document.getElementById("result-rover").innerHTML = rover;
    document.getElementById("result-camera").innerHTML = camera;

    console.log("Params Values Client Side")
    console.log("Name:", name)
    console.log("Rover:", rover)
    console.log("Camera:", camera)

    const store = new Object();
    store.name = name;
    store.rover = rover;
    store.camera = camera;

    console.log("Store")
    console.log(store)

const updateStore = (store, newState) => {
    store = Object.assign(store, newState)
    render(root, store)

// End of update store
}

const render = async (root, state) => {
    root.innerHTML = App(state)
}

console.log("What is render?")
console.log(render)

// Helper function/code to capitalize words as neccessary.
const capitalize = ([first, ...rest], lowerRest = false) =>
  first.toUpperCase() + (lowerRest ? rest.join('').toLowerCase() : rest.join(''));

// Render content based on user input chosenRover.
// if chosenRover is defined, run function to create slideshow.
// if chosenRover not defined, redirect user to form

// CREATE CONTENT STARTING HERE:
// Closure starts

const App = (state) => {
    let { store } = state


console.log("Store Inside APP Still Defined?")
console.log(store)

console.log("What is render in App?")
console.log(render)
// Makes and merges rover and photo info objects for cards.
// Some images are duplicates, but urls are differet.

const showRoverPhotos = (state) => {

    const imageURLs = state.latest_photos.map(photo => photo.img_src)
    const imageObjects = state.latest_photos.map(photo => photo.img_src = new Image(600,600))
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
    <img src=${item.imageURL} width=600px height=600px alt="Mars Rover Photo Taken ${item.imageDate}"/>
    <br>
    <br>
    <p><span>Rover Name:</span> ${item.roverName}</p>
    <p><span>Rover Status:</span> ${item.roverStatus}</p>
    <p><span>Launch Date:</span> ${item.roverLaunchDate}</p>
    <p><span>Landing Date:</span> ${item.roverLandDate}</p>
    <p><span>Image Date:</span> ${item.imageDate}</p>
    <p></p>
    <br>
    <hr/>
    <br>
    </div>`).slice(0, 50).join(""))

}
// const values = Array.prototype.map.call(elems, ({ value }) => value);

console.log("App: State Variable")
console.log("State")
console.log(state)

console.log("What is render?")
console.log(render)

if (state.rover != undefined) {
    const rover = capitalize(rover)
    return (`
            <header>
            <h2 class="main-title">Welcome to the ${rover} Rover's Gallery</h2>
            </header>
                <div class="main">
                <hr />
                <p><h4>Greetings, Earthling! Latest Images from Mars<h4></p>
                <br>
                <br>
                <div>${showRoverPhotos(state)}
                </div>
                <br></br>
                <hr />
            </div>
            <footer>
            <footer>
        `)
};


// Closure ends
// END OF APP FUNCTION
};

console.log("What is render?")
console.log(render)
// Single async higher-order/callback function
// Retrieves image data and update store/new state
// getRoverPhotos is Higher Order function.
// RoverPhotos as callback function.

const getRoverPhotos = async (rover, store, fn) => {

    console.log("Store Rover in Client API", store.rover)
    console.log("Just Rover in Client API: ", rover)

    // Do I go to gallery or gallery/rover?

    const response = await fetch(`http://localhost:3000/gallery/${rover}`, {
        method: "GET",
        headers: {
            Accept: "application/json"
        }
});

console.log("Response in getRoverPhotos"),
console.log(response)

const jsonImageData = await response.json();

// filter images if camera angle chosen.

const RoverImageData = jsonImageData.gallery.latest_photos.map(photo => {
    return photo.img_src;

});

    console.log("Rover Image Data:")
    console.log(RoverImageData)

    const newState = jsonImageData.gallery
    updateStore(store, newState)
    return RoverImageData
}

// Wait until backend API has completed its mission.
// Then, get photos and filter by camera if all not chosen.
setTimeout(getRoverPhotos(rover, store, updateStore), 5000)

// Sample Build URl function. Return template literal.

// End of event listener
})

// End of original if statement
};



