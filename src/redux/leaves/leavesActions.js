import { LeavesActionTypes } from './leavesTypes'

export const setLeaves = leave =>({
    type:LeavesActionTypes.SET_LEAVES,
    payload: leave
})