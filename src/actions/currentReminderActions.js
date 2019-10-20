import { GET_CURRENT_REMINDER } from './types';

export const getReminder = (reminder) => (dispatch) => {
    dispatch({
        type: GET_CURRENT_REMINDER,
        payload: reminder
    });
}