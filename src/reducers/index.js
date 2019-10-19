import { combineReducers } from 'redux';
import remindersReducer from './remindersReducer';
import citiesReducer from './citiesReducer';

export default combineReducers({
    reminders: remindersReducer,
    cities: citiesReducer
});