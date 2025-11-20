import React from "react";
import "../App.css";
import location from "../assets/location.png";

const Current = ({
  setCity,
  city,
  search,
  temp,
  desc,
  feels_like,
  humidity,
  visibility,
  max_temp,
  icon,
  pressure,
}) => {
  const [cityInput, setCityInput] = React.useState("");
  const handleCityChange = (e) => {
    setCityInput(e.target.value);
  };

  return (
    <div className="right">
      {/* search location form */}
      <form action="#" className="search">
        <div>
          <img src={location} alt="" />
          <input type="text" name="location" placeholder="Enter the name of a city..." id="location" onChange={handleCityChange}/>
          <button type="button" onClick={() => {setCity(cityInput); search();}}>Search</button>
        </div>
      </form>
      {/* current weather display */}
      <div className="current-weather">
        <div className="temp">
          <h3><img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="" /></h3>
          <h1>{temp}°</h1>
          <h2 className="city-name">{city}</h2>
          <p>
            {desc} day with temperature reaching a maximum of {max_temp}°C.
          </p>
        </div>
        <div className="conditions">
          <div className="condition">
            <h4>
              <span>🌡</span>FEELS LIKE
            </h4>
            <h3>{feels_like}</h3>
            <p>Humidity is making it feel warmer</p>
          </div>
          <div className="condition">
            <h4>
              <span>🧭</span>PRESSURE
            </h4>
            <h3>{pressure}</h3>
            <p className="prep-desc"></p>
            <p>2" expected in next 24h</p>
          </div>
          <div className="condition">
            <h4>
              <span>👁</span>VISIBILITY
            </h4>
            <h3>{visibility / 1000} Km</h3>
            <p>Visibility range is {visibility / 1000} Km</p>
          </div>
          <div className="condition">
            <h4>
              <span>💦</span>HUMIDITY
            </h4>
            <h3>{humidity}%</h3>
            <p>The dew point is 25 right now</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Current;
