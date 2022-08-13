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

    var apiKey="30ba22cf3476c2ad903f09a213b675ab"
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    fetch(apiURL)
        .then(function (response) {
            response.json().then(function(data) {
                displayWeather(data, city);
            });
        });
        
};



// clears previous search
var displayWeather = function (weather, searchCity) {
    weatherContainer.textContent = "";
    citySearchInput.textContent = searchCity;
    // creates current date moment js
    var currentDate = document.createElement("span")
    currentDate.textContent =" (" + moment(weather.dt.value).format("MMM D, YYYY") + ") ";
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
    var apiURL= `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`
    
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
    }else if(index.value >2 && index.value <=8) {
        uvIndexValue.classList = "moderate"
    }else if(index.value >8){
        uvIndexValue.classList= "Severe"
    };
    uvIndexData.appendChild(uvIndexValue);

    weatherContainer.appendChild(uvIndexData);
}
var get5Day = function(city){
    var apiKey= "30ba22cf3476c2ad903f09a213b675ab"
    var apiURL=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`
    
    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            display5Day(data);
            
        });
    });
};

var display5Day = function(weather){
    forecastContainer.textContent= ""
    forecastTitle.textContent = "5-day Forecast:";

    var forecast = weather.list;
    for(var i=5; i < forecast.length; i=i+8){
        var dailyForecast = forecast[i];

        var forecastData=document.createElement("div");
        forecastData.classList = " card bg-primary text-light m-2";

        // create date header
        var forecastDate=document.createElement("h5")
        forecastDate.textContent= moment.unix(dailyForecast.dt).format("MMM D, YYYY");
        forecastDate.classList = "card-header text-center"
        forecastData.appendChild(forecastDate);

        // create image
        var weatherIcon = document.createElement("img")
        weatherIcon.classList = "card-body text-center";
        weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`);

        // append
        forecastData.appendChild(weatherIcon);

        // temprature span
        var forecastTempData=document.createElement("span");
        forecastTempData.classList ="card-body text-center";
        forecastTempData.textContent = dailyForecast.main.temp + " °F";

        // append forecast to card
        forecastData.appendChild(forecastTempData);

        var forecastHumData=document.createElement("span");
        forecastHumData.classList = "card-body text-center";
        forecastHumData.textContent = dailyForecast.main.humidity + " %";
      
        forecastContainer.appendChild(forecastData);


    }
}

var priorSearch = function(priorSearch){
    priorSearchData = document.createElement("button");
    priorSearchData.textContent = priorSearch;
    priorSearchData.classList = "d-flex w-100 btn-light border p-2";
    priorSearchData.setAttribute("data-city",pastsearch)
    priorSearchData.setAttribute("type", "submit");

    pastSearchButton.prepend(priorSearchData);

}
 var priorSearchHandler = function(event){
    var city = event.target.getAttribute("data-city")
    if(city){
        getCityWeather(city);
        get5Day(city);
    }
 }

 
 
 cityForm.addEventListener("submit", submitForm);
 pastSearchButton.addEventListener("click", priorSearchHandler);


