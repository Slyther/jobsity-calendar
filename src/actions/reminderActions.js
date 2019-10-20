import { FETCH_WEATHER, NEW_REMINDER, EDIT_REMINDER } from './types';

export const fetchWeather = (cityId) => (dispatch) => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast/?units=metric&id=${cityId}&appid=1c0e103c32f64cd4428126e2363e482c`)
        .then(res => res.json())
        .then(data => dispatch({
            type: FETCH_WEATHER,
            payload: data
        }));
}

export const postReminder = (reminder) => (dispatch) => {
    if(reminder.reminderId === -1) {
        dispatch({
            type: NEW_REMINDER,
            payload: reminder
        });
    }else {
        dispatch({
            type: EDIT_REMINDER,
            payload: reminder
        });
    }
}