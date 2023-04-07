let currentTime = new Date();

let h2 = document.querySelector("h2");
let hours = currentTime.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentTime.getDay()];
h2.innerHTML = `${day}   ${hours}:${minutes}`;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;
  let apiKey = "b40b135798f82a05aed08769f9275f50";
  let units = "metric";
  let currentCity = searchInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemperature);
}
let form = document.querySelector("form");
form.addEventListener("submit", search);

function showTemperature(response) {
  let currentTemperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature-degree");
  temperatureElement.innerHTML = `${currentTemperature}`;
  let currentCity = document.querySelector("h1");
  currentCity.innerHTML = `${response.data.name}`;
}
function retrievePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showTemperature);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentCity = document.querySelector("#Location");
currentCity.addEventListener("click", getCurrentLocation);
