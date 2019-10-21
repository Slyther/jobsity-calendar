import { GET_CURRENT_REMINDER } from '../actions/types';

const initialState = { reminderId: -1 };

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_REMINDER:
      return action.payload;
    default:
      return state;
  }
};
