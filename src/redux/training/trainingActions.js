import {TrainingActionTypes} from './trainingTypes'

export const setTrainingList = trainers =>({
    type:TrainingActionTypes.SET_TRAINING,
    payload: trainers
});

export const setSingleTrainee = person =>({
    type: TrainingActionTypes.SET_SINGLE_PERSON,
    payload: person
})