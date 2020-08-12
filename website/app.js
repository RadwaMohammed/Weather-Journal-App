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

// Create async function to make POST request 
const postData = async (url = '', data = {}) => {
    const res = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin', 
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data) // to match the body data type to the "Content-Type" header
    });
    try {
        const newData = await res.json();
        return newData;
    } catch(error) {
        // Handle error
        console.log('error', error);
    }
};

// Function to handle click event
const generateData = e => {
    e.preventDefault();
};

// Create an event listener (click) for 'Generate' button
document.getElementById('generate').addEventListener('click', generateData);

