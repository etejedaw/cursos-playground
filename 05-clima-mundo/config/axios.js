const axios = require('axios');

const instance = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/weather?q=Osorno&appid=24eef16c7d08a12a185fb4eb316e0b8c&units=metric',
    headers: {
        'appid': '24eef16c7d08a12a185fb4eb316e0b8c',
        'units': 'metric'
    }
});

instance
.get()
.then(resp => console.log(resp.data.main))
.catch(err => console.log(err));


console.log(instance());