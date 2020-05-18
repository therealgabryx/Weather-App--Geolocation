window.addEventListener('load', () => {
    let lon, lat;
    let temperatureDescription = document.querySelector('.temperature-description')
    let temperatureDegree = document.querySelector('.temperature-degree')
    let locationCity = document.querySelector('.location-city')
    let locationIcon = document.querySelector('.location-icon')
    let temperatureDescBrief = document.querySelector('.temperature-desc-brief')
    let locationTimezone = document.querySelector('.location-timezone')

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            lon = position.coords.longitude;
            lat = position.coords.latitude;
            
            console.log(position)

            const proxy = 'http://cors-anywhere.herokuapp.com/' // proxy enables API calls from localhost: 
            const api = `${proxy}http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=212def19414499d20674d9580e825e59&units=metric` 
            
            const timezonedb = `${proxy}http://api.timezonedb.com/v2.1/get-time-zone?key=9OKQ2IFZWG6V&format=json&by=position&lat=${lat}&lng=${lon}`

            fetch(api)
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log("API fetch: openWeatherMap", data)

                // const {} = data.weather; // create a 'weather' Const :>: contains Weather Condition (weather.main) and Description (weather.description) + icon: weather.icon
                // const {} = data.main; // main.temp, main.temp_min main.temp_max, pressure, humidity, feels_like

                const { main, description, icon } = data.weather[0];
                const { temp } = data.main;
                const { timezone } = data.timezone;
                const city = data.name;

                // Set DOM Elements from the API

                temperatureDegree.textContent = temp 
                // v //
                // &units=metric   : Celsius
                // &units=imperial : Fahrenheit
                temperatureDescBrief.textContent = main
                temperatureDescription.textContent = description

                locationCity.textContent = city

                locationIcon.textContent = icon
                

            
            });

            fetch(timezonedb)
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log("API fetch: timezoneDB", data)

                const zoneName = data.zoneName
                const zoneAbbr = data.abbreviation

                locationTimezone.textContent = `${zoneName}, ${zoneAbbr}`
            });
        })

    

    } else {
        // say enable geolocation for the app to work (?)
    }
})