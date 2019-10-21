import { combineReducers } from 'redux';
import remindersReducer from './remindersReducer';
import citiesReducer from './citiesReducer';
import currentReminderReducer from './currentReminderReducer';
import modalReducer from './modalReducer';
import currentViewReducer from './currentViewReducer';

export default combineReducers({
    reminders: remindersReducer,
    cities: citiesReducer,
    currentReminder: currentReminderReducer,
    showModal: modalReducer,
    currentView: currentViewReducer,
});