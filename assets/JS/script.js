//Variables to store API information
var weatherApiRootUrl = 'https://api.openweathermap.org/data/3.0/onecall?lat=';
var geoLocationApiRootUrl ='http://api.openweathermap.org/geo/1.0/direct';
var weatherApiKey = '114cbc8355fa237b4bef43c392e276d6';

var cityForm = document.querySelector("#cityForm");
var citySearchInput = document.querySelector("#citySearchInput");
var searchHistory = document.querySelector("#searchHistory");
var historyBtns = document.querySelector("#historyBtns");
var historyCard = document.querySelector("#historyCard");
var trashBtn = document.querySelector("#trashBtn");
var currentWeather = document.querySelector("#currentWeather");
var currentWeatherCard = document.querySelector("#currentWeatherCard");
var weatherStatus = document.querySelector("#weatherStatus");
var fiveDayCard = document.querySelector("#fiveDayCard");
var fiveDayBody = document.querySelector("#fiveDayBody");
var latitude = 0;
var longitude = 0;

//Array to store search history
var searchHistoryArr = [];

// Add timezone plugins to day.js
//dayjs.extend(window.dayjs_plugin_utc);
//dayjs.extend(window.dayjs_plugin_timezone);

//Variable to store the current date
var currentDate = dayjs().format("MM/DD/YYYY");

//Create history button with the city name once the user hits the get weather button
var createSearchHistory = function(event) {
    event.preventDefault();
    //Store the users input in a variable
    var cityName = citySearchInput.value.trim();
    //Save city name in local storage and create search history button
    if (cityName) {
        searchHistoryArr.push(cityName);
        localStorage.setItem("searchHistory", JSON.stringify(searchHistoryArr));
        var searchHistoryBtn = document.createElement('button');
        searchHistoryBtn.className = "btn";
        searchHistoryBtn.setAttribute("dataCity", cityName);
        searchHistoryBtn.innerHTML = cityName;
        historyBtns.appendChild(searchHistoryBtn);
        historyCard.removeAttribute("style");
        fetchWeatherData(cityName);
        citySearchInput.value = "";
    } else {
        alert("Please enter a valid City name");
    }
};

//Using the city inputed by the user fetch the weather data
var fetchWeatherData = function (cityName) {
    var fetchUrl = geoLocationApiRootUrl + "?q=" + cityName + "&limit=1&appid=" + weatherApiKey;
    fetch(fetchUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        if (response.length === 0) {
            alert("No current weather data available for this" + cityName);
        }
        console.log(response);
        //Create variables for lat/lon/city
        var latitude = response[0].lat;
        var longitude = response[0].lon;
        //var city = response[0].name;

        //Empty Current Weather/Five Day Cards
        currentWeather.classList.remove("hidden");
        fiveDayCard.classList.remove("hidden");

        // Return a fetch request to the OpenWeather using longitude and latitude from pervious fetch
        return fetch(weatherApiRootUrl + latitude + '&lon=' + longitude + '&exclude=alerts,minutely,hourly&units=imperial&appid=' + weatherApiKey);
    })
    //Return response in json
    .then(function (response) {
        return response.json();
    })
    .then(function (response) {
        console.log(response);
        // send response data to displayWeather function for final display 
        displayWeather(response);

    });
};

var displayWeather = function (data) {
    console.log(data);
    // Create/Append Current Temperature element
    var temp = document.createElement("p");
    temp.id = "temp";
    temp.innerHTML = "<strong>Temperature:</strong> " + data.current.temp.toFixed(1) + "°F";
    currentWeather.appendChild(temp);
}

//Create event listener for user submitting a city search
cityForm.addEventListener("submit", createSearchHistory);
