import { SWITCH_TO_CALENDAR, SWITCH_TO_DAY } from './types';

export const goToCalendar = () => (dispatch) => {
  dispatch({
    type: SWITCH_TO_CALENDAR,
  });
};

export const goToDay = (date) => (dispatch) => {
  dispatch({
    type: SWITCH_TO_DAY,
    payload: date,
  });
};
