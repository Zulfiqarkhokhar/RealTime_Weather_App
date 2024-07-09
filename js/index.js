let searchBtn = document.getElementById("button-addon2");
let cityInput = document.getElementsByClassName("form-control");

let API_Key = "fbe15210c44ab4246ac914cd54584a08";

function getWeather(name, lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_Key}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}

function getCordinates() {
  let cityName = cityInput[0].value.trim();
  console.log(cityName);
  if (!cityName) return;

  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},&limit=1&appid=${API_Key}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let { name, lat, lon } = data[0];
      getWeather(name, lat, lon);
    })
    .catch(() => {
      alert(`Could not fetch Data for ${cityName}`);
    });
}

searchBtn.addEventListener("click", getCordinates);
