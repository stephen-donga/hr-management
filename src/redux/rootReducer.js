import {combineReducers} from 'redux'

import userReducer from './user/userReducer'
import staffReducer from './staff/staffReducer'
import detailsReducer from './showUserDetails/detailsReducer'
import eventReducer from './events/eventReducer'

 export default combineReducers({
     user:userReducer,
     events:eventReducer,
     staff:staffReducer,
     details:detailsReducer
 })