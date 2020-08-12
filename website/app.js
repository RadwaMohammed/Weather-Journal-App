/* Global Variables */
/* API credentials for OpenWeatherMap */
const apikey = '96e40292186f4edc8eda790705381722';
const baseURL = 'http://penweathermap.org/data/2.5/weather?zip=';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Create async function to make GET request to OpenWeatherMap API
const getData = async (baseURL, zipCode, apikey) => {
    // Get weather info from OpenWeatherMap.org
    const res = await fetch(`${baseURL}${zipCode}&appid=${apikey}`);
    try {
        const data = await res.json();
        console.log(data);
        return data;
    } catch(error) {
        // Handle error
        console.log("error", error);
    }
};