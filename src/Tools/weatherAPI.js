const API_KEY = "aa28cc8041dd88b68fa5e30fe34fb7e9";
const BASE_URL = "https://pro.openweathermap.org/data/2.5/";

const fetchHourlyWeather = async (lat, long) => {
    try {
        const response = await fetch(`${BASE_URL}forecast/hourly?lat=${lat}&lon=${long}&cnt=6&appid=${API_KEY}`);
        const data = await response.json();
        // console.log(data);
        return data;
        
    } catch (error) {
        if (error.response) {
            console.error("Error Response:", error.response.data);
        } else if (error.request) {
            console.error("Error Request:", error.request);
        } else {
            console.error("Error Message:", error.message);
        }
    }
}

const fetchCurrentWeather = async (lat, long) => {
    try {
        const response = await fetch(`${BASE_URL}weather?lat=${lat}&lon=${long}&units=metric&appid=${API_KEY}`);
        const data = await response.json();
        // console.log(data);
        return data;
    } catch (error) {
        if (error.response) {
            console.error("Error Response:", error.response.data);
        } else if (error.request) {
            console.error("Error Request:", error.request);
        } else {
            console.error("Error Message:", error.message);
        }
    }
}

const geoCoding = async (city)=>{
    try {
        const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`);
        const data = await response.json();
        console.log("GEOCODING DATA:");
        // console.log(data);
        return data;
    } catch (error) {
        if (error.response) {
            console.error("Error Response:", error.response.data);
        } else if (error.request) {
            console.error("Error Request:", error.request);
        } else {
            console.error("Error Message:", error.message);
        }
    }
}

const fetchDailyForecast = async (lat, long)=>{
    try {
        const response = await fetch(`${BASE_URL}forecast/daily?lat=${lat}&lon=${long}&units=metric&cnt=5&appid=${API_KEY}`);
        const data = await response.json();
        // console.log(data);
        return data;
    } catch (error) {
        if (error.response) {
            console.error("Error Response:", error.response.data);
        } else if (error.request) {
            console.error("Error Request:", error.request);
        } else {
            console.error("Error Message:", error.message);
        }
    }
}

export {fetchHourlyWeather, fetchCurrentWeather, geoCoding, fetchDailyForecast};