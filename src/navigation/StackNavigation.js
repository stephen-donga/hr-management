import React from 'react'
import {createStackNavigator} from "@react-navigation/stack"

import BottomTabs from '../navigation/BottomTabNavigation'
import Login from '../components/Login'
import LoadingScreen from '../components/LoadingScreen'

const Stack = createStackNavigator()

const StackNavigation = ()=>{
    return(
        <Stack.Navigator
        headerMode="none"
        >
            <Stack.Screen name="Loading" component={LoadingScreen} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={BottomTabs} />
        </Stack.Navigator>
    )
}

export default StackNavigation;