import React from 'react'
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs"
import {Entypo} from "@expo/vector-icons"
import {AntDesign} from "@expo/vector-icons"
import {Feather as Icon} from "@expo/vector-icons"

import HomeScreen from "../components/HomeScreen"
import Staff from '../components/Staff'
import Notifications from '../components/Notifications'

const BottomTab  = createMaterialBottomTabNavigator();

const BottomTabs = () =>{
    return(
        <BottomTab.Navigator
            initialRouteName="users"
            activeColor="#f0edf6"
            inactiveColor="#3e2465"
            barStyle={{ backgroundColor: '#694fad' }}
        >
            <BottomTab.Screen
             name="Home" 
             component={HomeScreen}
             options={{
                tabBarLabel:'',
                tabBarIcon: () => (
                  <Entypo name="home" color="white"  size={25} />
                ),
              }}
             />
            <BottomTab.Screen
             name="notification"
              component={Notifications}
              options={{
                tabBarLabel:' ',
                tabBarIcon: () => (
                  <AntDesign name="bells" color="white"  size={25} />
                ),
              }}

               />
            <BottomTab.Screen
             name="staff" 
             component={Staff}
             options={{
                tabBarLabel:' ',
                tabBarIcon: () => (
                  <Icon name="users" color="white"  size={24} />
                ),
              }}
              />
        </BottomTab.Navigator>
    )
}

export default BottomTabs;