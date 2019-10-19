import { FETCH_CITIES } from '../actions/types';
import * as cities from '../json/city.list.min.json';

const initialState = [];

let simplifiedCities = cities.default;

export default (state = initialState, action) => {
    switch(action.type) {
        case FETCH_CITIES:
            return [...simplifiedCities];
        default:
            return state;
    }
}