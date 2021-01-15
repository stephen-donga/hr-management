import React from 'react'
import {createStore} from 'redux'

const initialState = {
    username:'',
    password:''
}

const reducer = (state = initialState, action) =>{
    switch(action.tpye){
        case "ADD_USER":
            state = {
                ...state,
                username:action.payload,
                password:action.payload
            }
            break;
    }
    return state;
}

export const store = createStore(reducer);