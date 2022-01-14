const date = new Date().toString().split(" ");
const dat = Number(new Date().getDay());
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

navigator.geolocation.getCurrentPosition((loc) => {
  axios
    .get("http://api.weatherapi.com/v1/forecast.json", {
      params: {
        key: "61375cb82f7246eb8bc50035221401",
        q: `${loc.coords.latitude},${loc.coords.longitude}`,
        days: 10,
      },
    })
    .then((res) => {
      const data = res.data;
      const forecast = res.data.forecast.forecastday;
      document.body.innerHTML = `
      <div class="container">
        <div class="weather-side">
            <div class="weather-gradient"></div>
            <div class="date-container">
                <h2 class="date-dayname">${
                  days[dat]
                }</h2><span class="date-day">${
        date[1] + " " + date[2] + " " + date[3]
      }</span><i class="location-icon"
                    data-feather="map-pin"></i><span class="location">${
                      data.location.name
                    }, ${data.location.region}, ${data.location.country}</span>
            </div>
            <div class="weather-container"><i class="weather-icon" data-feather="sun"></i>
                <h1 class="weather-temp">${data.current.temp_c}°C</h1>
                <h3 class="weather-desc">${data.current.condition.text}</h3>
            </div>
        </div>
        <div class="info-side">
            <div class="today-info-container">
                <div class="today-info">
                    <div class="precipitation"> <span class="title">PRECIPITATION</span><span class="value">${
                      data.current.precip_in
                    } %</span>
                        <div class="clear"></div>
                    </div>
                    <div class="humidity"> <span class="title">HUMIDITY</span><span class="value">${
                      data.current.humidity
                    } %</span>
                        <div class="clear"></div>
                    </div>
                    <div class="wind"> <span class="title">WIND</span><span class="value">${
                      data.current.wind_kph
                    } km/h</span>
                        <div class="clear"></div>
                    </div>
                </div>
            </div>
            <div class="week-container">
                <ul class="week-list">
                    <li class="active"><i class="day-icon" data-feather="sun"></i><span class="day-name">${
                      days[dat]
                    }</span><span
                            class="day-temp">Max: ${
                              forecast[0].day.maxtemp_c
                            }°C</span><span class="day-temp">Min: ${
        forecast[0].day.mintemp_c
      }°C</span></li>
                    <li><i class="day-icon" data-feather="cloud"></i><span class="day-name">${
                      days[(dat + 1) % 7]
                    }</span><span
                    class="day-temp">Max: ${
                      forecast[1].day.maxtemp_c
                    }°C</span><span class="day-temp">Min: ${
        forecast[1].day.mintemp_c
      }°C</span></li>
                    <li><i class="day-icon" data-feather="cloud-snow"></i><span class="day-name">${
                      days[(dat + 2) % 7]
                    }</span><span
                    class="day-temp">Max: ${
                      forecast[2].day.maxtemp_c
                    }°C</span><span class="day-temp">Min: ${
        forecast[2].day.mintemp_c
      }°C</span></li>
                    <div class="clear"></div>
                </ul>
            </div>
        </div>
    </div>
        `;
    })
    .catch((err) => {
      console.log(err);
    });
});
