import { FETCH_CITIES } from './types';

export const fetchCities = () => (dispatch) => {
  dispatch({
    type: FETCH_CITIES,
  });
};
