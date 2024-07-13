let searchBtn = document.getElementById("button-addon2");
let cityInput = document.getElementsByClassName("form-control")[0];
let API_Key = "fbe15210c44ab4246ac914cd54584a08";

function getWeather(name, lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_Key}`
  )
    .then((res) => res.json())
    .then((data) => {
      const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
      document.getElementById("city").textContent = name;
      document.querySelector(".weather_icon").src = iconUrl;
      document.querySelector(".temp").textContent =
        Math.round(data.main.temp - 273.15) + "°C";
      document.querySelector(".description").textContent =
        data.weather[0].description;
      document.querySelector(".humadity").textContent =
        data.main.humidity + "%";
      document.querySelector(".wind").textContent = data.wind.speed + "KM/h";
    });

  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_Key}`
  )
    .then((res) => res.json())
    .then((data) => {
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
      for (let i = 1; i < 40; i += 8) {
        const date = new Date(list[i].dt_txt);
        const dayName = days[date.getDay()];
        let day = document.querySelector(`.day_${j}`);
        const temparatur = Math.round(list[i].main.temp - 273.15);
        const iconUrl = `https://openweathermap.org/img/wn/${list[i].weather[0].icon}.png`;
        day.innerHTML = `<p>${dayName}</p>
                          <img src="${iconUrl}" class="w-75" />
                          <p>${list[i].weather[0].description}</p>
                          <p>${temparatur}&deg;C</p>`;
        j++;
      }
    });
}
function getCoordinates() {
  let cityName = cityInput.value.trim();
  if (!cityName) return;

  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_Key}`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.length === 0) {
        alert(`City ${cityName} not found`);
        return;
      }
      let { name, lat, lon } = data[0];
      getWeather(name, lat, lon);
      cityInput.value = "";
    })
    .catch(() => {
      alert(`Could not fetch data for ${cityName}`);
    });
}
function getCurrentLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        fetch(
          `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_Key}`
        )
          .then((res) => res.json())
          .then((data) => {
            let { name, lat, lon } = data[0];
            getWeather(name, lat, lon);
          });
      },
      () => {
        alert("Geolocation is not supported by this browser.");
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}
searchBtn.addEventListener("click", getCoordinates);

window.addEventListener("load", getCurrentLocationWeather);
