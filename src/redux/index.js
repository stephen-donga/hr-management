import React from 'react'
import {createStore} from 'redux'
import db from '../utils/database'

const initialState = {
    users:[]
}

db.transaction(tx=>{
    tx.executeSql('SELECT * FROM users',null,
    (txObj,{rows:{_array}})=>initialState.staff.concat(_array)),
    (txObj, error)=>console.log('Error',error)
})

const reducer = (state = initialState, action) =>{
    switch(action.tpye){
        case "DELETE_STAFF":
            state = {
                ...state,staff:action.payload
            }
            break;
    }
    return state;
}

export const store = createStore(reducer);