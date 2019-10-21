import {
  FETCH_WEATHER,
  NEW_REMINDER,
  EDIT_REMINDER,
  DELETE_REMINDERS,
  DELETE_REMINDER,
} from './types';
import moment from 'moment';

export const fetchWeather = (cityId) => (dispatch) => {
  let weather = [];
  fetch(
    `https://api.openweathermap.org/data/2.5/weather/?units=metric&id=${cityId}&appid=1c0e103c32f64cd4428126e2363e482c`
  )
    .then((res) => res.json())
    .then(
      (currentWeather) =>
        (weather = [
          {
            dt_txt: moment().startOf('day'),
            weather: currentWeather.weather,
            main: currentWeather.main,
          },
        ])
    )
    .then(() => {
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast/?units=metric&id=${cityId}&appid=1c0e103c32f64cd4428126e2363e482c`
      )
        .then((res2) => res2.json())
        .then((forecast) => {
          weather = [...weather, ...forecast.list];
          dispatch({
            type: FETCH_WEATHER,
            payload: { list: weather, city: forecast.city },
          });
        });
    });
};

export const postReminder = (reminder) => (dispatch) => {
  if (reminder.reminderId === -1) {
    dispatch({
      type: NEW_REMINDER,
      payload: reminder,
    });
  } else {
    dispatch({
      type: EDIT_REMINDER,
      payload: reminder,
    });
  }
};

export const deleteReminders = (date) => (dispatch) => {
  dispatch({
    type: DELETE_REMINDERS,
    payload: date,
  });
};

export const deleteReminder = (reminderId) => (dispatch) => {
  dispatch({
    type: DELETE_REMINDER,
    payload: reminderId,
  });
};
