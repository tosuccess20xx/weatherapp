/* Global Variables */
// Setting up api variables
baseApi = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '6893b6b14f13b953c210bd4c384c00ae';
const zipCode = document.querySelector('#zip');
const feeling = document.querySelector('#feelings');
let error = 0;
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 +'.' + d.getDate() + '.' + d.getFullYear();

// Get button
const button = document.querySelector('#generate');

// Execute when button clicked
button.addEventListener('click', () => {
    // Validations
    if (!zipCode.value) {
        alert('Please Add A Zipcode');
    } else if (!feeling.value) {
        alert('Please Write What You Feel.');
    } else {
        const fullpath = baseApi + zipCode.value + '&appid=' + apiKey + '&units=metric'; 

        // Start Execution
        getWeatherApi(fullpath)
            .then((data) => {
                let dataObject = {
                    temp: data.main.temp,
                    date: newDate,
                    feelings: feeling.value
                }
                postData('/addData', dataObject)
                    .then(() => updateUI())
            })
        // End Execution
    }
});

// GET Data from OpenWeatherMap API
const getWeatherApi = async (url = '') => {
    const request = await fetch(url);
    // Error handling
    try {
        if (request.status !== 200) {
            throw new Error("Not 200 response")
        } else {
            const respond = await request.json();
            return respond;
        }
    } catch {
        alert('Invalid Zipcode Please try again.')
        return false;
    }

}

// Create a new data
const postData = async (url = '', data = {}) => {
    const request = await fetch(url, {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    // Error handling
    try {
        const newData = await request;
        return newData;
    } catch  {
        console.log("error");
        return false;
    }
}


// Fetch all data then Update the text
const updateUI = async () => {
    const request = await fetch('/getData');

    // Error handling
    try {
        const allData = await request.json();
        date.innerHTML = '<span class="result-title">Date: </span> ' + allData.date;
        temp.innerHTML = '<span class="result-title">Tempreature: </span>' + allData.temp + '&deg; C';
        content.innerHTML = '<span class="result-title">My Feelings: </span><br>' + allData.userResponse;
    } catch {
        return false;
    }
}

// end