// create buttons from an array

// place chosen rover in session storaage
const storeUserInput = (event) => {
    event.preventDefault();
    // chosenRover is the clicked button
    chosenRover = userInput.rover 
    cameraAngle = userInput.camera
    // store in sessionStorage for index page
    sessionStorage.getItem(chosenRover);
}
