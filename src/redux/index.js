import React from 'react'
import {createStore} from 'redux'
import db from '../utils/database'

const initialState = {
    username:'',
    password:''
}

const reducer = (state = initialState, action) =>{
    switch(action.tpye){
        case "ADD_USER":
            state = {
                ...state,staff:action.payload
            }
            break;
    }
    return state;
}

export const store = createStore(reducer);