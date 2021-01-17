import {StaffActionTypes} from './staffActionTypes'

export const setStaff = staff =>({
    type: StaffActionTypes.SET_STAFF,
    payload:staff
});

export const addStaff = member =>({
    type:StaffActionTypes.ADD_STAFF,
    payload:member
})