// import weather from api openweather map
let weather = {
  apiKey: "668fea60c98841c0a5588bcbb168db7b",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&lang=us&appid=" +
        this.apiKey
    )
      .then((res) => res.json()) //get json file from api response
      .then((data) => this.displayWeather(data)); //display weather data
  },
  displayWeather: function (data) {
    //get data from json file
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    document.querySelector(".city").innerText = `Weather in ${name}`; //display weather
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png"; //display icon for weather
    document.querySelector(".description").innerText = description; //display description
    document.querySelector(".temp").innerText = Math.round(temp) + "°C"; //display temperature
    document.querySelector(".humidity").innerText = `Humidity: ${humidity}%`; // display humidity
    document.querySelector(".wind").innerText = `Wind speed: ${Math.round(
      speed
    )}km/h`; // display wind speed
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/random/?" + name + "')"; //display background image depending on name city
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value); //get value from search bar
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  // add click to button
  weather.search();
  document.querySelector(".search-bar").value = ""; //clear search bar after clicking
});

document.querySelector(".search-bar").addEventListener("keyup", function (e) {
  if (e.key == "Enter") {
    weather.search(); //if you press enter key the search bar will be updated
  }
});

weather.fetchWeather("Warsaw"); //sample city weather onload
