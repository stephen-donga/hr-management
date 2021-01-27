import {combineReducers} from 'redux'

import userReducer from './user/userReducer'
import staffReducer from './staff/staffReducer'
import detailsReducer from './showUserDetails/detailsReducer'
import eventReducer from './events/eventReducer'
import trainersReducer from './training/trainingReducer'

 export default combineReducers({
     user:userReducer,
     events:eventReducer,
     staff:staffReducer,
     trainers:trainersReducer,
     details:detailsReducer
 })