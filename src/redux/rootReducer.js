import {combineReducers} from 'redux'

import userReducer from './user/userReducer'
import staffReducer from './staff/staffReducer'

 export default combineReducers({
     user:userReducer,
     staff:staffReducer
 })