var searchHistory = [];

function addResult(){
    inputCity = document.getElementById("myInput").value;
    var searchCity = $("<div>");
    searchCity.attr("id", "inputCity");
    searchCity.text(inputCity);
    searchCity.addClass("h4");

    if (!searchHistory.includes(inputCity)) {
        searchHistory.push(inputCity);
        $(".history").append(searchCity);
    }

    $(".subtitle").attr("style", "display: inline");
    addInfo(inputCity);
}

// function addResult(){
//     inputCity = document.getElementById("myInput").value;
//     historyList = getInfo();
//     var searchCity =$("<div>")
//     searchCity.attr("id", "inputCity");
//     searchCity.text(inputCity);
//     searchCity.addClass("h4")

//     if (historyList.includes(inputCity) === false){
//    $(".history").append(searchCity);
//     }
//     $(".subtitle").attr("style", "display: inline");
//     addInfo(inputCity);
// };
// add event listener to search history item
// $(".history").on("click", function(event){
//     event.preventDefault(); 
//     $(".subtitle").attr("style", "display: inline");
//     document.getElementById("myInput").value = event.target.id;
//     getResult();
// });
$(".history").on("click", "div", function(event) {
    event.preventDefault(); 
    $(".subtitle").attr("style", "display: inline");
    var city = $(this).text();
    document.getElementById("myInput").value = city;
    addInfo(city);
});
localStorage.setItem("searchHistory", JSON.stringify(searchHistory));

$(document).ready(function() {
    searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    for (var i = 0; i < searchHistory.length; i++) {
        var searchCity = $("<div>");
        searchCity.attr("id", "inputCity");
        searchCity.text(searchHistory[i]);
        searchCity.addClass("h4");
        $(".history").append(searchCity);
    }
});

// add event listener to search button
document.getElementById("searchBtn").addEventListener("click", addResult );
document.getElementById("searchBtn").addEventListener("click", getResult );

function getResult() {

    $(".five-day").empty();
    $(".city").empty();

    inputCity = document.getElementById("myInput").value;
    var countryCode = "us";
    var cityCode = inputCity;

    var geoLon;
    var geoLat;

    var cityName =$("<h>")
    cityName.addClass("h3")
    var temp =$("<div>")
    var wind =$("<div>")
    var humidity =$("<div>")
    var uvIndex =$("<div>")
    var icon =$("<img>")
    icon.addClass("icon")
    var dateTime =$("<div>")

    $(".city").addClass("list-group")
    $(".city").append(cityName);
    $(".city").append(dateTime);
    $(".city").append(icon);
    $(".city").append(temp);
    $(".city").append(wind);
    $(".city").append(humidity);
    $(".city").append(uvIndex);

    var geoUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityCode + "," + countryCode + "&limit=1&appid=30ba22cf3476c2ad903f09a213b675ab" 

    fetch(geoUrl)
    
    .then(function(response) {
        return response.json();
    })

    .then(function(data) {
        geoLon = data[0].lon;
        geoLat = data[0].lat;

        var weatherUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + geoLat + '&lon=' + geoLon + '&exclude=minutely,hourly,alerts&units=imperial&appid=30ba22cf3476c2ad903f09a213b675ab';

        fetch(weatherUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            weatherIcon = data.current.weather[0].icon;
            imgSrc = "https://openweathermap.org/img/wn/" + weatherIcon + ".png";
            icon.attr("src", imgSrc)
            // make icon smaller
            icon.attr("style", "width: 50px; height: 50px;")

            cityName.text(cityCode);
            var date = new Date(data.current.dt * 1000);
            dateTime.text("(" + (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() + ")");
            
            temp.text("Temperature: " + data.current.temp + " °F");
            wind.text("Wind Speed: " + data.current.wind_speed + " MPH");
            humidity.text("Humidity: " + data.current.humidity + "%");

            var uvi =$("<div>")
            uvIndex.text("UV Index: ");
            uvi.text(data.current.uvi);
            uvIndex.append(uvi);
            uvIndex.addClass("d-flex")

            if (data.current.uvi < 3){
                uvi.attr("style", "background-color: green; color: white; padding: 5px; border-radius: 5px; margin-left: 5px");
            } else if (data.current.uvi < 6){
                uvi.attr("style", "background-color: yellow; color: black; padding: 5px; border-radius: 5px; margin-left: 5px");
            } else if (data.current.uvi < 8){
                uvi.attr("style", "background-color: orange; color: white; padding: 5px; border-radius: 5px; margin-left: 5px");
            } else if (data.current.uvi < 11){
                uvi.attr("style", "background-color: red; color: white; padding: 5px; border-radius: 5px; margin-left: 5px");
            } else {
                uvi.attr("style", "background-color: purple; color: white; padding: 5px; border-radius: 5px; margin-left: 5px");
            }

        
for (var i = 1; i < 6; i++) {
    
    var blueContainer =$("<div>")
    this["futureDate" + i] =$("<h>")
    this["futureIcon" + i] =$("<img>")
    this["futureTemp" + i] =$("<div>")
    this["futureWind" + i] =$("<div>")
    this["futureHumidity" + i] =$("<div>")

    this["forecastDay" + i] = new Date(data.daily[i].dt * 1000);

    (this["futureDate" + i]).text(this["forecastDay" + i].getMonth() + 1 + "/" + this["forecastDay" + i].getDate() + "/" + this["forecastDay" + i].getFullYear());
    (this["futureTemp" + i]).text("Temprature: " + data.daily[i].temp.day + "°F");
    (this["futureWind" + i]).text("Wind: " + data.daily[i].wind_speed + " MPH");
    (this["futureHumidity" + i]).text("Humidity: " + data.daily[i].humidity + "%");
    (this["weatherIcon" + i])= data.daily[i].weather[0].icon;

    DateimgSrc = "http://openweathermap.org/img/wn/" + this["weatherIcon" + i] + ".png";
    (this["futureIcon" + i]).attr("src", DateimgSrc);

    $(".five-day").append(blueContainer);
    blueContainer.append(this["futureDate" + i]);
    blueContainer.append(this["futureIcon" + i]);
    blueContainer.append(this["futureTemp" + i]);
    blueContainer.append(this["futureWind" + i]);
    blueContainer.append(this["futureHumidity" + i]);

    blueContainer.addClass("weather-card");

}

        })
    })
}
function getInfo() {
    var currentList =localStorage.getItem("city");
    if (currentList === null) {
        freshList = JSON.parse(currentList);
        return freshList;
    } else {
        freshList = [];
        return freshList;
    }
}

     function addInfo (n) {
        var addedList = getInfo();

        if (historyList.includes(inputCity) === false) {
            addedList.push(n);
        }
        localStorage.setItem("city", JSON.stringify(addedList));

     };

     function renderInfo() {
        var historyList = getInfo();
        for (var i = 0; i < historyList.length; i++) {
            var inputCity = historyList[i];
            var searchCity = $("<div>");
            searchCity.attr('id', inputCity)
            searchCity.text(inputCity);
            searchCity.addClass("h4");
            
            $(".history").append(searchCity);
     }
    };

    renderInfo();