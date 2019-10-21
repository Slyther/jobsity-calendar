import {
  FETCH_WEATHER,
  NEW_REMINDER,
  EDIT_REMINDER,
  DELETE_REMINDERS,
  DELETE_REMINDER,
} from '../actions/types';
import moment from 'moment';

const initialState = { increment: 0, reminders: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WEATHER:
      let remindersWithWeatherData = state.reminders.map((reminder) => {
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
      return {
        increment: state.increment,
        reminders: [...remindersWithWeatherData],
      };
    case NEW_REMINDER:
      const newReminder = { ...action.payload, reminderId: state.increment };
      return {
        increment: state.increment + 1,
        reminders: [...state.reminders, newReminder],
      };
    case DELETE_REMINDERS:
      return {
        increment: state.increment,
        reminders: state.reminders.filter(
          (reminder) => reminder.date !== action.payload
        ),
      };
    case DELETE_REMINDER:
      return {
        increment: state.increment,
        reminders: state.reminders.filter(
          (reminder) => reminder.reminderId !== action.payload
        ),
      };
    case EDIT_REMINDER:
      let filteredReminders = state.reminders.filter(
        (reminder) => reminder.reminderId !== action.payload.reminderId
      );
      return {
        increment: state.increment,
        reminders: [...filteredReminders, action.payload],
      };
    default:
      return state;
  }
};
