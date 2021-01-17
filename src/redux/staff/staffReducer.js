import { concat } from 'react-native-reanimated';
import {StaffActionTypes } from './staffActionTypes'

const INITIAL_STATE = {
  staff:[]
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case StaffActionTypes.SET_STAFF:
      return {
        ...state,
        staff:action.payload
      };

  case StaffActionTypes.ADD_STAFF:
    return {
      ...state,
      staff:concat(action.payload)
    }
    default:
      return state;
  }
};

export default userReducer;
