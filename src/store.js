import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import * as cities from './json/city.list.min.json';

const initialState = {
    cities: cities,
    reminders: []
};

const middleWare = [thunk];

const store = createStore(
    rootReducer, 
    initialState, 
    compose(
        applyMiddleware(...middleWare),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;