// global variables //
var weatherResult;
var cityName = document.querySelector('#cityName')
var currentTemp = document.querySelector('#currentTemp')
var currentConditionIcon = document.querySelector('#currentConditionIcon')
var currentConditionText = document.querySelector('#currentConditionText')
var tomorrowMaxtemp = document.querySelector('#tomorrowMaxtemp')
var tomorrowMintemp = document.querySelector('#tomorrowMintemp')
var tomorrowConditionIcon = document.querySelector('#tomorrowConditionIcon')
var tomorrowConditionText = document.querySelector('#tomorrowConditionText')
var afterTomorrowMaxtemp = document.querySelector('#afterTomorrowMaxtemp')
var afterTomorrowMintemp = document.querySelector('#afterTomorrowMintemp')
var afterTomorrowConditionIcon = document.querySelector('#afterTomorrowConditionIcon')
var afterTomorrowConditionText = document.querySelector('#afterTomorrowConditionText')
var todayName = document.querySelector('#todayName')
var tomorrowName = document.querySelector('#tomorrowName')
var afterTomorrowName = document.querySelector('#afterTomorrowName')
var todayDate = document.querySelector('#todayDate')
// --------------------------------- //

// Get Date //
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const d = new Date();
let date = d.getDate();
let day = days[d.getDay()];
let tomorrow = days[d.getDay()+1];
let afterTomorrow = days[d.getDay()+2];
todayName.innerHTML = day
tomorrowName.innerHTML = tomorrow
afterTomorrowName.innerHTML = afterTomorrow
todayDate.innerHTML = date
// --------------------------------- //

// Get default weather //
function getWeather() {
    var weather = new XMLHttpRequest;
    weather.open('GET', 'https://api.weatherapi.com/v1/forecast.json?key=0ddfeae9bedb40fdbd1195745221901&q=cairo&days=3');
    weather.send();
    weather.addEventListener('readystatechange', function () {
        if (weather.readyState == 4 && weather.status == 200) {
            weatherResult = JSON.parse(weather.response)
            // display default weather // 
            // todays 's weather //
            cityName.innerHTML = weatherResult.location.name
            currentTemp.innerHTML = weatherResult.current.temp_c + `<sup>o</sup>C`
            currentConditionIcon.src = 'https://' + weatherResult.current.condition.icon
            currentConditionText.innerHTML = weatherResult.current.condition.text
            // tomorrow 's weather //
            tomorrowMaxtemp.innerHTML = weatherResult.forecast.forecastday[1].day.maxtemp_c + `<sup>o</sup>C`
            tomorrowMintemp.innerHTML = weatherResult.forecast.forecastday[1].day.mintemp_c + `<sup>o</sup>`
            tomorrowConditionIcon.src = 'https://' + weatherResult.forecast.forecastday[1].day.condition.icon
            tomorrowConditionText.innerHTML = weatherResult.forecast.forecastday[1].day.condition.text
            // after torrow 's weather //
            afterTomorrowMaxtemp.innerHTML = weatherResult.forecast.forecastday[2].day.maxtemp_c + `<sup>o</sup>C`
            afterTomorrowMintemp.innerHTML = weatherResult.forecast.forecastday[2].day.mintemp_c + `<sup>o</sup>`
            afterTomorrowConditionIcon.src = 'https://' + weatherResult.forecast.forecastday[2].day.condition.icon
            afterTomorrowConditionText.innerHTML = weatherResult.forecast.forecastday[2].day.condition.text
        }
    })
}
getWeather();
// --------------------------------- //

// Search to get specific city //
var citySearch = document.querySelector('#citySearch')
var userSearch;
citySearch.addEventListener('keyup', doSearch)
function doSearch() {
    userSearch = citySearch.value
    var search = new XMLHttpRequest;
    search.open('SEARCH', `http://api.weatherapi.com/v1/search.json?key=0ddfeae9bedb40fdbd1195745221901&q=${userSearch}`);
    search.send();
    var searchResult;
    search.addEventListener('readystatechange' , function () {
        if (search.readyState == 4 && search.status == 200) {
            searchResult = JSON.parse(search.response)
            // display the search result //
            if (searchResult.length != 0) {
                var weather = new XMLHttpRequest;
                weather.open('GET', `https://api.weatherapi.com/v1/forecast.json?key=0ddfeae9bedb40fdbd1195745221901&q=${userSearch}&days=3`);
                weather.send();
                weather.addEventListener('readystatechange', function () {
                    if (weather.readyState == 4 && weather.status == 200) {
                        weatherResult = JSON.parse(weather.response)
                        console.log(weatherResult)
                       // display default weather // 
                        // todays 's weather //
                        cityName.innerHTML = weatherResult.location.name
                        currentTemp.innerHTML = weatherResult.current.temp_c + `<sup>o</sup>C`
                        currentConditionIcon.src = 'https://' + weatherResult.current.condition.icon
                        currentConditionText.innerHTML = weatherResult.current.condition.text
                        // tomorrow 's weather //
                        tomorrowMaxtemp.innerHTML = weatherResult.forecast.forecastday[1].day.maxtemp_c + `<sup>o</sup>C`
                        tomorrowMintemp.innerHTML = weatherResult.forecast.forecastday[1].day.mintemp_c + `<sup>o</sup>`
                        tomorrowConditionIcon.src = 'https://' + weatherResult.forecast.forecastday[1].day.condition.icon
                        tomorrowConditionText.innerHTML = weatherResult.forecast.forecastday[1].day.condition.text
                        // after torrow 's weather //
                        afterTomorrowMaxtemp.innerHTML = weatherResult.forecast.forecastday[2].day.maxtemp_c + `<sup>o</sup>C`
                        afterTomorrowMintemp.innerHTML = weatherResult.forecast.forecastday[2].day.mintemp_c + `<sup>o</sup>`
                        afterTomorrowConditionIcon.src = 'https://' + weatherResult.forecast.forecastday[2].day.condition.icon
                        afterTomorrowConditionText.innerHTML = weatherResult.forecast.forecastday[2].day.condition.text
                    }
                })
            }
        }
    })
}