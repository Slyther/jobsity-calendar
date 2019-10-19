import { FETCH_WEATHER } from './types';

export const fetchWeather = (cityId) => (dispatch) => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast/?units=metric&id=${cityId}&appid=1c0e103c32f64cd4428126e2363e482c`)
        .then(res => res.json())
        .then(data => dispatch({
            type: FETCH_WEATHER,
            payload: data
        }));
}