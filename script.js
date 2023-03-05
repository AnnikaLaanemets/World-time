function setClock() {
  let NewYork = document.querySelector("#NewYork");
  NewYork.querySelector(".time").innerHTML = moment
    .tz("America/New_York")
    .format("HH:mm:ss");
  NewYork.querySelector(".date").innerHTML = moment
    .tz("America/New_York")
    .format("D MMMM YYYY");

  let Berlin = document.querySelector("#Berlin");
  Berlin.querySelector(".time").innerHTML = moment
    .tz("Europe/Berlin")
    .format("HH:mm:ss");
  Berlin.querySelector(".date").innerHTML = moment
    .tz("Europe/Berlin")
    .format("D MMMM YYYY");

  let Novosibirsk = document.querySelector("#Novosibirsk");
  Novosibirsk.querySelector(".time").innerHTML = moment
    .tz("Asia/Novosibirsk")
    .format("HH:mm:ss");
  Novosibirsk.querySelector(".date").innerHTML = moment
    .tz("Asia/Novosibirsk")
    .format("D MMMM YYYY");

  let Auckland = document.querySelector("#Auckland");
  Auckland.querySelector(".time").innerHTML = moment
    .tz("Pacific/Auckland")
    .format("HH:mm:ss");
  Auckland.querySelector(".date").innerHTML = moment
    .tz("Pacific/Auckland")
    .format("D MMMM YYYY");
}

setClock();
setInterval(setClock, 1000);

function reload() {
  location.reload();
}

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
    clock.innerHTML = `<div class="one">
        <ul>
          <li class="TZ">${timezone.replace("_", " ")}</li>
          <li class="time">${moment.tz(timezone).format("HH:mm:ss")}</li>
          <li class="date">${moment.tz(timezone).format("D MMMM YYYY")}</li>
        </ul>
      </div>
      
      <div class="back">🌆 Back to first page</div>
      `;
    document
      .querySelector(".back")
      .setAttribute(
        "style",
        "display:block; font-size: 38px; margin-block-start: 430px; margin-inline-start: -400px; color: #f73d93; cursor: pointer;"
      );
    document
      .querySelector(".one")
      .setAttribute(
        "style",
        "display:block;width:880px; margin: 12px; margin-block-start: 100px;"
      );
    document.querySelector(".time").style.fontSize = "84px";
    document.querySelector(".TZ").style.fontSize = "44px";
    document.querySelector(".date").style.fontSize = "44px";
    document.querySelector(".back").addEventListener("click", reload);
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
    } else if (calls === 4) {
      clearInterval(interval3);
      displaySelectedTime();
      interval4 = setInterval(displaySelectedTime, 1000);
    } else {
      clearInterval(interval4);
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
    "America/Denver",
    "America/Chicago",
    "America/Caracas",
    "America/Fortaleza",
    "Atlantic/Reykjavik",
    "Europe/Sofia",
    "Asia/Baghdad",
    "Asia/Tbilisi",
    "Asia/Ashgabat",
    "Asia/Dhaka",
    "Asia/Kuala_Lumpur",
    "Asia/Tokyo",
    "Australia/Canberra",
    "Asia/Anadyr",
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
