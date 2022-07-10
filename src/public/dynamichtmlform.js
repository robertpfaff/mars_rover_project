<!DOCTYPE html>
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
                    </select>
                    </div>
                    <button id="submit">Submit</button>
            </form>
      </body>
    </html>