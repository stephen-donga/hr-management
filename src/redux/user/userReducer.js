import { UserActionTypes } from './userType';

const INITIAL_STATE = {
  currentUser:null,
  role:null,
  actions:[],
  user:[],
  loggedIn:{},
  newUsers:[]
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      };
    case UserActionTypes.SET_ROLE:
      return{
        ...state,
        role:action.payload
      }
    case UserActionTypes.SET_ACTIONS:
      return{
        ...state,
        actions:action.payload
      }
    case UserActionTypes.SET_NUMBER_OF_USERS:
      return {
        ...state,
        user:action.payload

      }
    case UserActionTypes.LOGGED_USER:
      return {
        ...state,
        loggedIn: action.payload
      }
    case UserActionTypes.SET_NEW_USERS:
      return {
        ...state,
        newUsers: action.payload
      }
    default:
      return state;
  }
};

export default userReducer;
