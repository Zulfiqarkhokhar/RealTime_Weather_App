let searchBtn = document.getElementById("button-addon2");
let cityInput = document.getElementsByClassName("form-control");
let weather_info = document.getElementById("info");

let API_Key = "fbe15210c44ab4246ac914cd54584a08";

function getWeather(name, lat, lon) {
  let seachedWeather = {};

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_Key}`
  )
    .then((res) => res.json())
    .then((data) => {
      const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
      console.log(data);
      let city = document.getElementById("city");
      let temp = document.querySelector(".temp");
      let description = document.querySelector(".description");
      let humadity = document.querySelector(".humadity");
      let wind = document.querySelector(".wind");
      let weather_icon = document.querySelector(".weather_icon");
      console.log(data.main.temp);
      city.textContent = name;
      weather_icon.src = iconUrl;
      temp.textContent = Math.round(data.main.temp - 273.15) + "°C";
      description.textContent = data.weather[0].description;
      humadity.textContent = data.main.humidity + "%";
      wind.textContent = data.wind.speed + "KM/h";
    });
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_Key}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      let list = data.list;
      let j = 1;
      for (let i = 1; i < 40; i = i + 8) {
        const date = new Date(list[i].dt_txt);
        const dayOfWeek = date.getDay();
        const dayName = days[dayOfWeek];
        let day = document.querySelector(`.day_${j}`);
        let temparatur = list[i].main.temp - 273.15;
        const iconUrl = `https://openweathermap.org/img/wn/${list[i].weather[0].icon}.png`;
        temparatur = Math.round(temparatur);
        day.innerHTML = `<p>${dayName}</p>
                  <img src="${iconUrl}" class="w-75" />
                  <p>${list[i].weather[0].description}</p>
                  <p>${temparatur}&deg;C</p>`;

        j++;
      }
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
