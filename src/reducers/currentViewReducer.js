import { SWITCH_TO_CALENDAR, SWITCH_TO_DAY } from "../actions/types";

const initialState = {view: 'calendar', payload: ''};

export default (state = initialState, action) => {
    switch(action.type) {
        case SWITCH_TO_CALENDAR:
            return {view: 'calendar', payload: ''};
        case SWITCH_TO_DAY:
            return {view: 'day', payload: action.payload};
        default:
            return state;
    }
}