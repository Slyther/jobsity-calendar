import { FETCH_WEATHER, NEW_REMINDER, EDIT_REMINDER } from '../actions/types';

const initialState = [];

export default (state = initialState, action) => {
    switch(action.type) {
        case FETCH_WEATHER:
            let remindersWithWeatherData = state.reminders.map(reminder => {
                if(reminder.cityId === action.payload.city.id){
                    reminder.forecast = action.payload.list; //missing date check
                }
                return reminder;
            });
            return {
                ...state,
                reminders: remindersWithWeatherData
            };
        case NEW_REMINDER:
        case EDIT_REMINDER:
        default:
            return state;
    }
}