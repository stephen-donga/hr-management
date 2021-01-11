 import React from 'react';
 import {View,Dimensions ,TouchableOpacity,StyleSheet} from "react-native";
 import {Avatar,Caption,Drawer,Text } from "react-native-paper"
 import {
     DrawerContentScrollView,
     DrawerItem
  } from "@react-navigation/drawer"
import {Feather as Icon } from "@expo/vector-icons"
import {Entypo} from '@expo/vector-icons'
import { DrawerActions, useNavigation } from '@react-navigation/native';

  const {width,height} = Dimensions.get('window')

  export const DrawerContent =props=>{

    const draw = useNavigation()
      
      return(
          <View style={{flex:1 }}>
              <View style={{ width:"100%",height:25,backgroundColor:'steelblue'}}/>
              <View style={{width:'100%',height:height/14}}>
                    <View style={{width:'100%',height:'100%',backgroundColor:'steelblue',borderBottomRightRadius:35}}>
                        <View style={{width:'100%',height:'100%',flexDirection:'row',justifyContent:'flex-end',padding:10}}>
                            <TouchableOpacity 
                            onPress={()=>{draw.dispatch(DrawerActions.closeDrawer())}}
                            style={{alignSelf:'center',marginRight:15,marginBottom:10}}>
                                <Icon name="x" size={24} color="white" />
                            </TouchableOpacity>
                        </View>

                    </View>
              </View>
              
               <DrawerContentScrollView {...props}>
                   <View style={{flex:1,height:height/5,marginBottom:20, justifyContent:'center',alignItems:'center'}}>
                       <View>
                           <Entypo name="user"  color="mediumaquamarine"size={80}/>
                       </View>
                       <View style={{paddingTop:10,alignItems:'center',justifyContent:'center'}}>
                           <Text style={{fontSize:18,fontWeight:"bold",color:'steelblue'}}>Steven Edonga</Text>
                           <Caption style={{fontSize:15}}>@steven.gmail</Caption>
                       </View>
   
                   </View>
                   <View style={{width:'90%',borderColor:'teal',borderWidth:1,alignSelf:'center'}}/>
                <Drawer.Section style={{flex:1, marginTop:50,borderBottomRightRadius:35}}>
                   <DrawerItem 
                        icon={()=><Icon name="home" size={24}/>}
                        label="Home "
                        onPress={()=>{props.navigation.navigate('Home')}}
                        />
                        <DrawerItem 
                        icon={()=><Icon name="user-plus" size={24}/>}
                        label="Add Staff Member"
                        onPress={()=>{props.navigation.navigate("AddMember")}}
                        />
                        <DrawerItem 
                        icon={()=><Icon name="search" size={24}/>}
                        label="Search"
                        onPress={()=>{props.navigation.navigate('Staff')}}
                        />
                        <DrawerItem 
                        icon={()=><Icon name="users" size={24}/>}
                        label="Create new User"
                        onPress={()=>{props.navigation.navigate('CreateUser')}}
                        />
                        <DrawerItem 
                        onPress={()=>{props.navigation.navigate('Login')}}
                        icon={()=><Icon name="log-out" size={24}/>}
                        label="Log out"/>
                   
                </Drawer.Section>

               </DrawerContentScrollView>
                   
          </View>
      )
      
      }
           
      