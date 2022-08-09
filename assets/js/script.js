var cities = [];

var cityForm = document.querySelector("#city-search");
var cityInput = document.querySelector("#city");
var weatherContainer = document.querySelector("#current-weather-container");
var citySearchInput = document.querySelector("#searched-city");
var forecastTitle = document.querySelector("#forecast");
var forecastContainer = document.querySelector("#fiveday-container");
var pastSearchButton = document.querySelector("#past-search-buttons");

var submitForm = function (event) {
    event.preventDefault();
    var city = cityInput.value.trim();
    if (city) {
        getCityWeather(city);
        get5Day(city);
        cities.unshift({city});
        cityInput.value = "";
    } else{
        alert("Please enter a City");
    }
        saveSearch();
    // pastSearch(city);
}
//save to local storage
var saveSearch = function () {
    localStorage.setItem("cities", JSON.stringify(cities));
};


// fetch request get weather from api
var getCityWeather = function(city) {
  
    var apiURL = "http://api.openweathermap.org/geo/1.0/direct?q={city},{state code},{country code}&limit=5&appid=30ba22cf3476c2ad903f09a213b675ab"

    fetch(apiURL)
        .then(function (response) {
            response.json().then(function(data) {
                displayWeather(data, city);
            });
        });
        
};

getCityWeather(city);

// clears previous search
var displayWeather = function (weather, searchCity) {
    weatherContainer.textContent = "";
    citySearchInput.textContent = searchCity;
    // creates current date moment js
    var currentDate = document.createElement("span")
    currentDate.textContent = " (" + moment(weather.dt.value).format("MMM D, YYYY") + ")";
    citySearchInput.appendChild(currentDate);

    // creates weather icon

    var weatherIcon = document.createElement("img")
    weatherIcon.setAttribute("src", `https:openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
    citySearchInput.appendChild(weatherIcon);

    // creates an element that will hold temp data
    var temperatureData = document.createElement("span");
    temperatureData.textContent = "Temperature: " + weather.main.temp + " °F";
    temperatureData.classList = "list-group-item"

    // creates an element that will hold Humidity data
    var humidityData = document.createElement("span");
    humidityData.textContent = "Humidity: " + weather.main.humidity + " %";
    humidityData.classList = "list-group-item"

    //creates an element that will hold wind data 
    var windData = document.createElement("span");
    windData.textContent = "Wind: " + weather.wind.speed + " MPH";
    windData.classList = "list-group-item"

    // append temperature to container
    weatherContainer.appendChild(temperatureData);

    // append Humidity to container
    weatherContainer.appendChild(humidityData);

    // append Wind to container
    weatherContainer.appendChild(windData);

    var lat = weather.coord.lat;
    var lon = weather.coord.lon;
    getUvIndex(lat, lon)

}
// fetching the uv data
var getUvIndex = function (lat, lon) {
    var apiKey = "30ba22cf3476c2ad903f09a213b675ab"
    var apiURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat${lat}&lon=${lon}`
    fetch(apiURL)
        .then(function (response) {
            response.json().then(function (data) {
                console.log(data)
            });
        });

}

var displayUvIndex = function (index) {
    var uvIndexData = document.createElement("div");
    uvIndexData.textContent = "UV Index: "
    uvIndexData.classList = "list-group-item"

    uvIndexValue = document.createElement("span")
    uvIndexValue.textContent = index.value

    if (index.value <=2) {
        uvIndexValue.classList = "favorable"
    } else if (index.value >2 && index.value <= 8) {
        uvIndexValue.classList = "moderate"
    }else if(index.value >8){
        uvIndexValue.classList= "Severe"
    };
    uvIndexData.appendChild(uvIndexValue);

    weatherContainer.appendChild(uvIndexData);
}




