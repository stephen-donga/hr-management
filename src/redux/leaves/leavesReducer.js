import {LeavesActionTypes} from './leavesTypes'

const INITIAL_STATE = {
    leaves:[]
}

const leavesReducer = (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case LeavesActionTypes.SET_LEAVES:
            return {
                ...state,
                leaves:action.payload
            }
        default:
            return state;
    }
}

export default leavesReducer;