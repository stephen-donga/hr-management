import React from 'react'
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs"


import HomeScreen from "../components/HomeScreen"
import Staff from '../components/Staff'

const BottomTab  = createMaterialBottomTabNavigator();

const BottomTabs = () =>{
    return(
        <BottomTab.Navigator
            initialRouteName="users"
            activeColor="#f0edf6"
            inactiveColor="#3e2465"
            barStyle={{ backgroundColor: '#694fad' }}
        >
            <BottomTab.Screen name="users" component={HomeScreen}/>
            <BottomTab.Screen name="staff" component={Staff} />
        </BottomTab.Navigator>
    )
}

export default BottomTabs;