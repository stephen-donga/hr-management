import { DetailActionTypes } from './detailActionTypes';

const INITIAL_STATE = {
  showDetails: false,
  details:null
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DetailActionTypes.SET_DETAIL:
      return {
        ...state,
        showDetails: action.payload
      };
    case DetailActionTypes.ADD_DETAIL:
      return {
        ...state,
        details: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
