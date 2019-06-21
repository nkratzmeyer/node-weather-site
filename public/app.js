/* jshint esversion: 6 */
const weatherForm = document.querySelector('form');
const searchTextbox = document.querySelector('input');
const message1 = document.querySelector('#errMsg');
const message2 = document.querySelector('#forecast');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const searchData = searchTextbox.value;
    if (searchData) {
        message1.textContent = 'Loading...';
        message2.textContent = '';
        fetch(`http://localhost:3000/weather?address=${searchData}`)
            .then((result) => {
                result.json().then(jsonData => {
                    if (jsonData.error) {
                        message1.textContent = jsonData.error;
                    } else {
                        message1.textContent = jsonData.place_name;
                        message2.textContent = JSON.stringify(jsonData.forecast);
                    }

                });
            });
    }
});