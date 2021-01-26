import {EventActionTypes} from './eventTypes'

const INITIAL_STATE ={
    events:[]
}

 const eventReducer = (state=INITIAL_STATE, action)=>{
    switch(action.type){
        case EventActionTypes.SET_EVENT:
            return {
                ...state,
                events:action.payload
            }
        default:
            return state
    }
}

export default eventReducer;