import { FETCH_WEATHER } from '../actions/types';

const initialState = {
    reminders: []
};

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
        default:
            return state;
    }
}