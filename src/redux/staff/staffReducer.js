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
      }
    default:
      return state;
  }
};

export default userReducer;
