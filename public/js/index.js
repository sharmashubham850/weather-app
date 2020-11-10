console.log('Client side Javascript loaded')

async function fetchWeather(address) {
    const response = await fetch(`http://localhost:3000/weather?address=${address}`);
    const data = await response.json();

    const { error } = data;

    if (error) {
        messageOne.innerHTML = error;
    }
    else {
        messageOne.innerHTML = data.location;
        messageTwo.innerHTML = data.weather;
    }

}

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    messageOne.innerHTML = 'Loading...';
    messageTwo.innerHTML = '';

    const location = search.value;
    fetchWeather(location);

    search.value = '';
})
