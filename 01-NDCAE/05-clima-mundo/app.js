const argv = require('./config/yargs').argv;





const axios = require('axios');

const instance = axios.create({
    baseURL: `https://api.openweathermap.org/data/2.5/weather`,
    headers: {
        'appid': '24eef16c7d08a12a185fb4eb316e0b8c',
        'units': 'metric',
        'q': 'Osorno'
    }
});

instance
.get()
.then(resp => console.log(resp.data.main))
.catch(err => console.log(err));