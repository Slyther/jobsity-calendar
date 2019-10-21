import {
  FETCH_WEATHER,
  NEW_REMINDER,
  EDIT_REMINDER,
  DELETE_REMINDERS,
  DELETE_REMINDER,
} from '../actions/types';
import moment from 'moment';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WEATHER:
      let remindersWithWeatherData = state.map((reminder) => {
        if (reminder.cityId === action.payload.city.id) {
          reminder.forecast = action.payload.list.filter((prediction) => {
            return (
              moment(reminder.date, 'MM/DD/YYYY').diff(
                moment(prediction.dt_txt).startOf('day')
              ) === 0
            );
          });
        }
        return reminder;
      });
      return [...remindersWithWeatherData];
    case NEW_REMINDER:
      return [...state, { ...action.payload, reminderId: state.length }];
    case DELETE_REMINDERS:
      return state.filter((reminder) => reminder.date !== action.payload);
    case DELETE_REMINDER:
      return state.filter((reminder) => reminder.reminderId !== action.payload);
    case EDIT_REMINDER:
      let filteredReminders = state.filter(
        (reminder) => reminder.reminderId !== action.payload.reminderId
      );
      return [...filteredReminders, action.payload];
    default:
      return state;
  }
};
