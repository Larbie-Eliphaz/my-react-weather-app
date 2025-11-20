import React from "react";

const Future = ({ hourlyWeatherDataList, cityName, dailyWeatherDataList }) => {
  const dateStr = hourlyWeatherDataList && hourlyWeatherDataList.length > 0
    ? hourlyWeatherDataList[0].dt_txt
    : null;

  const formatHour = (dateTimeStr) => {
    if (!dateTimeStr) return "";
    const parts = dateTimeStr.split(" ");
    const timePart = parts[1] || parts[0];
    const hour = timePart.split(":")[0];
    return `${hour}:00`;
  };
  const formatTemperature = (tempK) => {
    if (tempK === undefined || tempK === null) return "";
    const tempC = tempK - 273.15;
    return `${Math.round(tempC)}°C`;
  }

  const formatDate = (dateTimeStr) => {
    if (!dateTimeStr) return "";
    // ensure a parsable ISO datetime (replace space with "T" from "YYYY-MM-DD HH:MM:SS")
    const iso = dateTimeStr.includes("T") ? dateTimeStr : dateTimeStr.replace(" ", "T");
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return "";
    const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
    const month = date.toLocaleDateString("en-US", { month: "short" });
    const day = date.getDate();
    return `${weekday}, ${month} ${day}`;
  };

  return (
    <section className="future-weather">
      <div className="about-location">
        <h2>Weather Forecast for {cityName || "your location"}</h2>
        <p>{formatDate(dateStr)}</p>
      </div>
      <div className="hourly">
        <h4>
          <span className="icon">🕒 </span>HOURLY FORECAST
        </h4>
        <hr />
        <div id="forecast-items" className="actual-forecasts">
          {
            Array.isArray(hourlyWeatherDataList) && hourlyWeatherDataList.length > 0 ? (
              hourlyWeatherDataList.map((item, idx) => (
                <div  className="forecast-item" key={item.dt ?? idx}>
                  <h5>{formatHour(item.dt_txt)}</h5>
                  <h2>{formatTemperature(item.main?.temp)}</h2>
                  <p><img src={`http://openweathermap.org/img/wn/${item.weather?.[0]?.icon}@2x.png`} alt="" /></p>
                </div>
              ))
            ) : (
              <div className="forecast-item no-data">
                <h5>--:--</h5>
                <h2>—</h2>
                <p>No hourly data</p>
              </div>
            )
          }
        </div>
      </div>
      <div className="hourly">
        <h4>
          <span className="icon">📅 </span>5-DAY FORECAST
        </h4>
        <hr />
        <div id="forecast-items" className="actual-forecasts">
          {
            Array.isArray(dailyWeatherDataList) && dailyWeatherDataList.length > 0 ? (
              dailyWeatherDataList.map((item, idx) => (
                <div className="forecast-item" key={item.dt ?? idx}>
                  <p><img src={`http://openweathermap.org/img/wn/${item.weather?.[0]?.icon}@2x.png`} alt="" /></p>
                  <h5 className="dialy-desc">{item.weather?.[0]?.description}</h5>
                  <h2>{item.temp?.day}°</h2>
                </div>
              ))
            ) : ( 
              <div className="forecast-item no-data">
                <h5>--:--</h5>
                <h2>—</h2>
                <p>No daily data</p>
              </div>
            )
          }
        </div>
      </div>
    </section>
  );
};

export default Future;
