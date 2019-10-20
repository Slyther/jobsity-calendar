import { FETCH_WEATHER, NEW_REMINDER, EDIT_REMINDER } from '../actions/types';

const initialState = [];

export default (state = initialState, action) => {
    switch(action.type) {
        case FETCH_WEATHER:
            let remindersWithWeatherData = state.map(reminder => {
                if(reminder.cityId === action.payload.city.id){
                    reminder.forecast = action.payload.list.reduce((acc, curr) => {
                        return [...acc, curr];//missing date check
                    }, []);
                }
                return reminder;
            });
            return [...remindersWithWeatherData];
        case NEW_REMINDER:
            return [...state, {...action.payload, reminderId: state.length}];
        case EDIT_REMINDER:
        default:
            return state;
    }
}