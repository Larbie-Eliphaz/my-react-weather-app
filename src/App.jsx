import React, { useEffect, useState } from "react";
import "./App.css";
import {
  geoCoding,
  fetchCurrentWeather,
  fetchHourlyWeather,
  fetchDailyForecast,
} from "./Tools/weatherAPI.js";
import Current from "./components/Current";
import Future from "./components/Future";

const App = () => {
  const [hourlyWeatherData, setHourlyWeatherData] = useState(null);
  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [dailyWeatherData, setDailyWeatherData] = useState(null);
  const [city, setCity] = useState("kasoa");

  const loadData = async () => {
    const location = await geoCoding(city);

    const hourlyWeatherData = await fetchHourlyWeather(
      location[0].lat,
      location[0].lon
    );
    const currentWeatherData = await fetchCurrentWeather(
      location[0].lat,
      location[0].lon
    );
    const dailyWeatherData = await fetchDailyForecast(
      location[0].lat,
      location[0].lon
    );
    console.log("Hourly Data:", hourlyWeatherData.list.length);
    setHourlyWeatherData(hourlyWeatherData);
    setCurrentWeatherData(currentWeatherData);
    setDailyWeatherData(dailyWeatherData);
  };
  useEffect(() => {
    loadData();
  }, [city]);

  return (
    <div className="main">
      <Current
        search={loadData}
        setCity={setCity}
        city={city}
        temp={Math.round(currentWeatherData?.main?.temp)}
        weather={currentWeatherData?.weather?.[0]?.main}
        desc={currentWeatherData?.weather?.[0]?.description}
        feels_like={currentWeatherData?.main?.feels_like}
        humidity={currentWeatherData?.main?.humidity}
        visibility={currentWeatherData?.visibility}
        max_temp={currentWeatherData?.main?.temp_max}
        icon={currentWeatherData?.weather?.[0]?.icon}
        pressure={currentWeatherData?.main?.pressure}
      />
      <Future
        hourlyWeatherDataList={hourlyWeatherData?.list}
        cityName={currentWeatherData?.name}
        dailyWeatherDataList={dailyWeatherData?.list}
      />
    </div>
  );
};

export default App;
