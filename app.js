window.addEventListener('load', () => {
    let lon, lat;
    let temperatureDescription = document.querySelector('.temperature-description')
    let temperatureDegree = document.querySelector('.temperature-degree')
    let locationCity = document.querySelector('.location-city')
    let locationIcon = document.querySelector('.location-icon')
    let temperatureDescBrief = document.querySelector('.temperature-desc-brief')

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            lon = position.coords.longitude;
            lat = position.coords.latitude;
            
            console.log(position)

            const proxy = 'http://cors-anywhere.herokuapp.com/' // proxy enables localhost: API calls
            const api = `${proxy}http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=212def19414499d20674d9580e825e59`

            fetch(api)
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data)

                // const {} = data.weather; // create a 'weather' Const :>: contains Weather Condition (weather.main) and Description (weather.description) + icon: weather.icon
                // const {} = data.main; // main.temp, main.temp_min main.temp_max, pressure, humidity, feels_like

                const { main, description, icon } = data.weather[0];
                const { temp } = data.main;
                const { timezone } = data.timezone;
                const city = data.name;

                // Set DOM Elements from the API
                temperatureDegree.textContent = temp
                temperatureDescBrief.textContent = main
                temperatureDescription.textContent = description
                locationCity.textContent = city
                locationIcon.textContent = icon
                

            
            })
        })

    

    } else {
        // say enable geolocation for the app to work (?)
    }
})