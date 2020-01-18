console.log('Client side js file is loaded')



const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const msgOne = document.querySelector('#message-1');
const msgTwo = document.querySelector('#message-2');



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = searchElement.value;
    const URL = `http://localhost:3000/weather?address=${location}`;

    msgOne.textContent = 'Loading...'
    msgTwo.textContent = ''
    fetch(URL)
        .then((res) => {
            res.json()
                .then((data) => {

                    if (data.error) {
                        msgOne.textContent = data.error
                    } else {
                        msgOne.textContent = data.location;
                        msgTwo.textContent = data.forecast;
                    }
                })
        })
})