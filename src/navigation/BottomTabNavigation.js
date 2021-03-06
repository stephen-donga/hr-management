import React from 'react'
import {View,TouchableOpacity} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Entypo} from "@expo/vector-icons"
import {AntDesign} from "@expo/vector-icons"
import {Feather as Icon} from "@expo/vector-icons"
import Svg,{Path} from 'react-native-svg'

import HomeScreen from "../components/HomeScreen"
import Staff from '../components/Staff'
import Notifications from '../components/Notifications'

const BottomTab  = createBottomTabNavigator();

const TabBarCustomButton=({accessibilityState, children,onPress})=>{
  let isSelected = accessibilityState.selected

  if(isSelected){
    return(
      <View style={{flex:1,alignItems:'center'}}>
         <View style={{flexDirection:'row',position:'absolute',top:0,right:25,alignItems:'center'}}>
           <View style={{flex:1,backgroundColor:'white'}}/>
        <Svg 
          width={75}
          height={61}
          viewBox="0 0 75 61"
        >
          <Path
          d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
          fill='white'
          >

          </Path>

        </Svg>
        <View style={{flex:1,backgroundColor:'white'}}></View>
        <TouchableOpacity
          style={{
            top:-30,
            justifyContent:'center',
            alignItems:'center',
            width:50,
            height:50,
            borderRadius:25,
            backgroundColor:'white',
            elevation:5
          }}
        onPress={onPress}
        >
        {children}
      </TouchableOpacity>

       </View>
       </View>
    )

  }else{
    return(
<TouchableOpacity
  style={{
    flex:1,
    height:60,
    borderRadius:25,
    backgroundColor:'white'
  }}
onPress={onPress}
>
{children}
</TouchableOpacity>
    )

  }

}

const BottomTabs = () =>{
  
    return(
        <BottomTab.Navigator
              initialRouteName="users"
              tabBarOptions={{
              showLable:false,
              style:{
                borderTopWidth:0,
                elevation:0,
                backgroundColor:'white'
              }
            }}
            barStyle={{ backgroundColor: '#fff' }}
        >
            <BottomTab.Screen
             name="Home" 
             component={HomeScreen}
             options={{
                tabBarLabel:'',
                tabBarIcon: ({focused}) => (
                  <Entypo name="home" color={focused?"#3e2465":"#ccc"} style={{alignSelf:'center'}} size={30} />
                ),
                tabBarButton:(props)=>(
                  <TabBarCustomButton 
                  {...props}
                  />
                )
              }}
             />
            <BottomTab.Screen
              name="notification"
              component={Notifications}
              options={{
                tabBarLabel:' ',
                tabBarIcon: ({focused}) => (
                  <AntDesign name="bells" color={focused?"#3e2465":"#ccc"} style={{alignSelf:'center'}} size={30} />
                ),
                tabBarButton:(props)=>(
                  <TabBarCustomButton 
                  {...props}
                  />
                )
              }}

               />
            <BottomTab.Screen
             name="staff" 
             component={Staff}
             options={{
                tabBarLabel:' ',
                tabBarIcon: ({focused}) => (
                  <Icon name="users" color={focused?"#3e2465":"#ccc"} style={{alignSelf:'center'}} size={30} />
                ),
                tabBarButton:(props)=>(
                  <TabBarCustomButton 
                  {...props}
                  />
                )
              }}
              />
        </BottomTab.Navigator>
    )
}

export default BottomTabs;