let timezoneSelect = document.querySelector("#timezone");
let timezoneElement = document.querySelector(".TZ");
let timeElement = document.querySelector(".time");
let dateElement = document.querySelector(".date");

function updateTime(timezone) {
  timezoneElement.innerHTML = timezone;
  timeElement.innerHTML = moment.tz(timezone).format("HH:mm:ss");
  dateElement.innerHTML = moment.tz(timezone).format("D MMMM YYYY");
}
setInterval(updateTime, 1000, "Arctic/Longyearbyen");

//Select timezone
function selectTimeZone(event) {
  let timezone = event.target.value;
  timezone = timezone.replace("_", " ");
  clock = document.querySelector(".clock");
  if (timezone === "local") {
    timezone = moment.tz.guess();
  }
  function displaySelectedTime() {
    let time = moment.tz(timezone).format("HH:mm:ss");
    let date = moment.tz(timezone).format("D MMMM YYYY");
    clock.innerHTML = `<div class="clock">
        <ul>
          <li class="TZ">${timezone}</li>
          <li class="time">${time}</li>
          <li class="date">${date}</li>
        </ul>
      </div>`;
  }
  setInterval(displaySelectedTime, 1000);
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

  let table1 = document.querySelector(".table1");
  let table2 = document.querySelector(".table2");
  let cities1 = `<tr>`;
  let cities2 = `<tr>`;
  places.forEach(function (city, index) {
    if (index < 8) {
      cities1 =
        cities1 +
        `
          <td>${city.replace("_", " ").split("/")[1]}</td>
          <th>${moment.tz(city).format("HH:mm")}</th>
          <td>${moment.tz(city).format("DD.MM")}</td>
        </tr>
        `;
    }
  });
  cities1 = `<table>` + cities1 + `</table>`;
  table1.innerHTML = cities1;

  places.forEach(function (city, index) {
    if (index > 7 && index < 16) {
      cities2 =
        cities2 +
        `
          <td>${city.replace("_", " ").split("/")[1]}</td>
          <th>${moment.tz(city).format("HH:mm")}</th>
          <td>${moment.tz(city).format("DD.MM")}</td>
        </tr>
        `;
    }
  });
  cities2 = `<table>` + cities2 + `</table>`;
  table2.innerHTML = cities2;
}
displayTimeINDifferentCities();
setIntervall(displayTimeINDifferentCities, 100);
