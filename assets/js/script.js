// Function to add the search input to the search history
function addResult() {
    // Get the search input value
    const inputCity = document.getElementById("myInput").value.trim();
    
    // Get the search history array
    const historyList = getInfo();
    
    // Create a new search history item
    if (!historyList.includes(inputCity)) {
      const searchCity = $("<div>")
        .attr("id", inputCity)
        .addClass("h4")
        .text(inputCity);
      
      $(".history").append(searchCity);
    }
    
    // Show the subtitle
    $(".subtitle").show();
    
    // Get the weather information for the searched city
    getResult();
  }
  
  // Function to handle a search history item click
  $(".history").on("click", "div", function(event) {
    // Prevent the default click behavior
    event.preventDefault();
    
    // Set the search input value to the clicked item's ID
    const inputCity = event.target.id;
    document.getElementById("myInput").value = inputCity;
    
    // Show the subtitle
    $(".subtitle").show();
    
    // Get the weather information for the clicked item
    getResult();
  });
  
  // Function to get the weather information for the searched city
  function getResult() {
    // Clear the previous search results
    $(".five-day").empty();
    $(".city").empty();
    
    // Get the search input value
    const inputCity = document.getElementById("myInput").value.trim();
    
    // Construct the URLs for the API requests
    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${inputCity},us&limit=1&appid=30ba22cf3476c2ad903f09a213b675ab`;
    let weatherUrl;
    
    // Fetch the latitude and longitude for the searched city
    fetch(geoUrl)
      .then(response => response.json())
      .then(data => {
        const { lat, lon } = data[0];
        
        // Construct the URL for the weather API request
        weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=imperial&appid=30ba22cf3476c2ad903f09a213b675ab`;
        
        // Fetch the weather information for the searched city
        return fetch(weatherUrl);
      })
      .then(response => response.json())
      .then(data => {
        // Create elements to display the current weather information
        const cityName = $("<h>").addClass("h3").text(inputCity);
        const date = new Date(data.current.dt * 1000);
        const dateTime = $("<div>").text(`(${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()})`);
        const weatherIcon = data.current.weather[0].icon;
        const imgSrc = `https://openweathermap.org/img/wn/${weatherIcon}.png`;
        const icon = $("<img>").addClass("icon").attr({ src: imgSrc, width: 50, height: 50 });
        const temp = $("<div>").text(`Temperature: ${data.current.temp} °F`);
        const wind = $("<div>").text(`Wind Speed: ${data.current.wind_speed} MPH`);
        const humidity = $("<div>").text(`Humidity: ${data.current.humidity}%`);
        const uvIndex = $("<div>").text("UV Index: ");
        const uvi = $("<div>").text
      });  