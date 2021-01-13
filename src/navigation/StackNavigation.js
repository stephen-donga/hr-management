import React from 'react'
import {createStackNavigator} from "@react-navigation/stack"

import BottomTabs from '../navigation/BottomTabNavigation'
import Login from '../components/Login'
import LoadingScreen from '../components/LoadingScreen'
import ViewStaff from '../components/ViewStaff'
import Staff from '../components/Staff'
import EditStaff from '../components/EditStaff'
import AddMember from '../components/AddMember'
import UserProfile from '../components/UserProfile'
import Leaves from '../components/Leaves'
import Training from '../components/Training'
import Expenses from '../components/Expenses'

const Stack = createStackNavigator()

const StackNavigation = ()=>{
    return(
        <Stack.Navigator
        headerMode="none"
        >
            <Stack.Screen name="Loading" component={LoadingScreen} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Staff" component={Staff} />
            <Stack.Screen name='Addmember' component={AddMember} />
            <Stack.Screen name="EditStaff" component={EditStaff} />
            <Stack.Screen name="View" component={ViewStaff} />
            <Stack.Screen name="Expenses" component={Expenses} />
            <Stack.Screen name="Leaves" component={Leaves} />
            <Stack.Screen name="Training" component={Training} />
            <Stack.Screen name="Home" component={BottomTabs} />
            <Stack.Screen name='Userprofile' component={UserProfile} />
        </Stack.Navigator>
    )
}

export default StackNavigation;