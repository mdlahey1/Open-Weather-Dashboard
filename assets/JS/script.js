//API Variables
var weatherApiRootURL = "https://api.openweathermap.org";
var weatherApiKey = "114cbc8355fa237b4bef43c392e276d6";

//Element Variables
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

//Array to store search history
var searchHistoryArr = [];

// Add timezone plugins to day.js
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

//Variable to store the current date
var currentDate = "(" + dayjs().format("MM/DD/YYYY") + ")";

