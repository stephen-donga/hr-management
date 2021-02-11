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

export const setNumberOfUsers = users =>({
  type: UserActionTypes.SET_NUMBER_OF_USERS,
  payload:users
});

export const setLoggedIn = user =>({
  type: UserActionTypes.LOGGED_USER,
  payload:user
});

export const setNewUser = users =>({
  type:UserActionTypes.SET_NEW_USERS,
  payload:users
})

export const setIsloggedIn =user=>({
  type:UserActionTypes.SET_ISLOGGED_IN,
  payload:user
})

export const setImage =user=>({
  type:UserActionTypes.SET_IMAGE,
  payload:user
})