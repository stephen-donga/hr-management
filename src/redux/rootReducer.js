import {combineReducers} from 'redux'

import userReducer from './user/userReducer'
import staffReducer from './staff/staffReducer'
import detailsReducer from './showUserDetails/detailsReducer'

 export default combineReducers({
     user:userReducer,
     staff:staffReducer,
     details:detailsReducer
 })