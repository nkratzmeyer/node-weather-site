/* jshint esversion: 6 */
const weatherForm = document.querySelector('form');
const searchTextbox = document.querySelector('input');
const message1 = document.querySelector('#errMsg');
const currentTemp = document.querySelector('#currentTemp');
const highTemp = document.querySelector('#highTemp');
const lowTemp = document.querySelector('#lowTemp');
const precip = document.querySelector('#precip');
const forecastDiv = document.querySelector('.hidden');
const summary = document.querySelector('#summary');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const searchData = searchTextbox.value;
    if (searchData) {
        message1.textContent = 'Loading...';

        fetch(`/weather?address=${searchData}`)
            .then((result) => {
                result.json().then(jsonData => {
                    if (jsonData.error) {
                        message1.textContent = jsonData.error;
                    } else {
                        forecastDiv.classList.remove('hidden');
                        message1.textContent = jsonData.place_name;
                        summary.textContent = jsonData.forecast.summary;
                        currentTemp.textContent = jsonData.forecast.currentTemp;
                        highTemp.textContent = jsonData.forecast.high;
                        lowTemp.textContent = jsonData.forecast.low;
                        precip.textContent = jsonData.forecast.precipProbability;
                    }

                });
            });
    }
});