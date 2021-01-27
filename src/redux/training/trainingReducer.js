import {TrainingActionTypes} from './trainingTypes'

const INITIAL_STATE = {
    trainers:[],
    person:{}
}

const trainersReducer = (state=INITIAL_STATE,action) =>{
    switch(action.type){
        case TrainingActionTypes.SET_TRAINING:
            return {
                ...state,
                trainers:action.payload
            }
        case TrainingActionTypes.SET_SINGLE_PERSON:
            return {
                ...state,
                person: action.payload
            }
        default:
            return state;
    }

}

export default trainersReducer;