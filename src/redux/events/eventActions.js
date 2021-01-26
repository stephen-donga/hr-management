import {EventActionTypes} from './eventTypes'

export const setEvents = events => ({
    type:EventActionTypes.SET_EVENT,
    payload: events
})