import { UserActionTypes } from './userType';

export const setCurrentUser = user => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user
});

export const setRole = role => ({
  type:UserActionTypes.SET_ROLE,
  payload:role
});

export const setActions = action => ({
  type: UserActionTypes.SET_ACTIONS,
  payload:action
});