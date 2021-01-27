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
import Events from '../components/Events'
import AddEvent from '../components/AddEvent'
import NewUser from '../components/NewUser'
import Payroll from '../components/Payroll'
import AddStaffAsUser from '../components/AddStaffAsUser'
import ViewTrainee from '../components/ViewTrainee'
import Users from '../components/Users'

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
            <Stack.Screen name="Trainee" component={ViewTrainee} />
            <Stack.Screen name="View" component={ViewStaff} />
            <Stack.Screen name="Events" component={Events} />
            <Stack.Screen name="AddEvent" component={AddEvent} />
            <Stack.Screen name="Leaves" component={Leaves} />
            <Stack.Screen name="Users" component={Users} />
            <Stack.Screen name="Training" component={Training} />
            <Stack.Screen name="New" component={NewUser} />
            <Stack.Screen name="StaffUser" component={AddStaffAsUser} />
            <Stack.Screen name="Payroll" component={Payroll} />
            <Stack.Screen name="Home" component={BottomTabs} />
            <Stack.Screen name='Userprofile' component={UserProfile} />
        </Stack.Navigator>
    )
}

export default StackNavigation;