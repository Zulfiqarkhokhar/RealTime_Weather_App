let searchBtn = document.getElementById("button-addon2");
let cityInput = document.getElementsByClassName("form-control");

let API_Key = "fbe15210c44ab4246ac914cd54584a08";

async function getCordinates() {
  let cityName = cityInput[0].value.trim();
  console.log(cityName);
  if (!cityName) return;

  let response =
    await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName},&limit=1&appid=${API_Key}
`);

  let data = response.json();
  console.log(data);
}

searchBtn.addEventListener("click", getCordinates);
