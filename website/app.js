/* Personal API key for OpenWeatherMap */
const apikey = '96e40292186f4edc8eda790705381722';
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Create async function to make GET request to OpenWeatherMap API
const getData = async (baseURL, zipCode, apikey) => {
    // Get weather info from OpenWeatherMap.org
    const res = await fetch(`${baseURL}${zipCode}&appid=${apikey}&units=imperial`);
    try {
        const data = await res.json();
        console.log(data);
        // Check the user put valid zip code
        // By using 'cod' and 'message' internal parameters in OpenWeatherMap API response 
        if (data.cod != '200') { 
            alert(`Error \n${data.message.toUpperCase()}...`);
            return;
        } else {
            // return data if the zip code is vlide
            return data;
        } 
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

// Create async function to update UI elements
const updateUI = async (url = '') => {
    const req = await fetch(url);
    try {
        const allData = await req.json();
            console.log(allData);
        // Check if the temperature is found to update the elements
        if (allData.temperature) {
            // Update the DOM elements
            document.getElementById('date').innerHTML = `<p><span>Date: </span>${allData.date}</p>`;
            document.getElementById('temp').innerHTML = `<p><span>Temperature: </span>${allData.temperature}</p>`;
            document.getElementById('content').innerHTML = `<p><span>Your Fealings: </span>${allData.userResponse}</p>`;
        }
    } catch(error) {
      console.log("error", error);
    }
  }

// Function to handle click event
const generateData = e => {
    e.preventDefault();
    // Value that user enter to zip input field
    const zipCode = document.getElementById('zip').value.trim();
    // Value that user enter to feelings input field
    const userRes = document.getElementById('feelings').value;
    // Check if user enter the zipcode and fealings field
    if (!zipCode.length || !userRes.length) {
        alert('Fill all the fields...');
        return;
    }
   // Get data from OpenWeatherMap API
    getData(baseURL, zipCode, apikey)
        .then(userData => {
            // Make a POST request to add the API data and data entered by the user
            postData('/add', { 
                date: newDate, 
                // Check if the data is found to get the temperature
                temperature: userData ? userData.main.temp : '', 
                userResponse: userRes
            });
        }) // then Update UI elements 
        .then(() => updateUI('/all'))
    
    // Reset the form
    document.getElementById('my-form').reset();
};

// Create an event listener (click) for 'Generate' button
document.getElementById('generate').addEventListener('click', generateData);

