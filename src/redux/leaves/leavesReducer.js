import {LeavesActionTypes} from './leavesTypes'

const INITIAL_STATE = {
    leaves:[{name:'obong',id:3}]
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