import { CLOSE_MODAL, OPEN_MODAL } from './types';

export const closeModal = () => (dispatch) => {
  dispatch({
    type: CLOSE_MODAL,
  });
};

export const openModal = () => (dispatch) => {
  dispatch({
    type: OPEN_MODAL,
  });
};
