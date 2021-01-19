import {StaffActionTypes} from './staffActionTypes'

export const setStaff = staff =>({
    type: StaffActionTypes.SET_STAFF,
    payload:staff
});
 