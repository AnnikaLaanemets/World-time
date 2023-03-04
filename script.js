let timezoneElement = document.querySelector(".TZ");
let timeElement = document.querySelector(".time");
let dateElement = document.querySelector(".date");

function updateTime(timezone) {
  timezoneElement.innerHTML = timezone;
  timeElement.innerHTML = moment.tz(timezone).format("HH:mm:ss");
  dateElement.innerHTML = moment.tz(timezone).format("D MMMM YYYY");
}
setInterval(updateTime, 1000, "Africa/Johannesburg");

//Select timezone
let timezoneSelect = document.querySelector("#timezone");
let calls = 0;
function selectTimeZone(event) {
  calls = calls + 1;
  let timezone = event.target.value;
  let clock = document.querySelector(".clock");
  if (timezone === "local") {
    timezone = moment.tz.guess();
  }
  function displaySelectedTime() {
    let time = moment.tz(timezone).format("HH:mm:ss");
    let date = moment.tz(timezone).format("D MMMM YYYY");
    clock.innerHTML = `<div class="clock">
        <ul>
          <li class="TZ">${timezone.replace("_", " ")}</li>
          <li class="time">${time}</li>
          <li class="date">${date}</li>
        </ul>
      </div>`;
  }

  function updateSelectedTime() {
    if (calls <= 1) {
      interval = setInterval(displaySelectedTime, 1000);
    } else if (calls === 2) {
      clearInterval(interval);
      displaySelectedTime();
      interval2 = setInterval(displaySelectedTime, 1000);
    } else if (calls === 3) {
      clearInterval(interval2);
      displaySelectedTime();
      interval3 = setInterval(displaySelectedTime, 1000);
    } else {
      clearInterval(interval3);
      displaySelectedTime();
    }
  }

  updateSelectedTime();
}

timezoneSelect.addEventListener("change", selectTimeZone);

//fill tables with real-time data
function displayTimeINDifferentCities() {
  places = [
    "America/Adak",
    "America/Vancouver",
    "America/Chicago",
    "America/Lima",
    "America/Fortaleza",
    "Atlantic/Reykjavik",
    "Africa/Kinshasa",
    "Europe/Sofia",
    "Asia/Baghdad",
    "Asia/Tbilisi",
    "Asia/Yekaterinburg",
    "Asia/Dhaka",
    "Asia/Kuala_Lumpur",
    "Asia/Tokyo",
    "Australia/Canberra",
    "Pacific/Auckland",
  ];

  let leftTable = document.querySelector(".leftTable");
  let rightTable = document.querySelector(".rightTable");
  let citiesLeft = `<tr>`;
  let citiesRight = citiesLeft;
  places.forEach(function (city, index) {
    if (index < 8) {
      citiesLeft =
        citiesLeft +
        `
          <td>${city.replace("_", " ").split("/")[1]}</td>
          <th>${moment.tz(city).format("HH:mm")}</th>
          <td>${moment.tz(city).format("DD.MM")}</td>
        </tr>
        `;
    }
  });
  citiesLeft = `<table>` + citiesLeft + `</table>`;
  leftTable.innerHTML = citiesLeft;

  places.forEach(function (city, index) {
    if (index > 7 && index < 16) {
      citiesRight =
        citiesRight +
        `
          <td>${city.replace("_", " ").split("/")[1]}</td>
          <th>${moment.tz(city).format("HH:mm")}</th>
          <td>${moment.tz(city).format("DD.MM")}</td>
        </tr>
        `;
    }
  });
  citiesRight = `<table>` + citiesRight + `</table>`;
  rightTable.innerHTML = citiesRight;
}
displayTimeINDifferentCities();
setInterval(displayTimeINDifferentCities, 1000);
