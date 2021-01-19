import { DetailActionTypes } from './detailActionTypes';

export const setDetails = act => ({
  type: DetailActionTypes.SET_DETAIL,
  payload: act
});

export const detailsAdd = act => ({
  type: DetailActionTypes.ADD_DETAIL,
  payload: act
});