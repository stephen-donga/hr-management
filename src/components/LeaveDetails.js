import React, {useState} from 'react'
import { View, Text,Alert, StyleSheet,ToastAndroid,Image } from 'react-native'
import {Entypo} from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'

import HeaderBar from '../custom/HeaderBar'
import {urlConnection} from '../utils/url'

const LeaveDetails = ({route,navigation}) => {

    const {member,type,start_date,reason,end_date,staff} = route.params
    const {first_name,last_name,position,onleave,id}  = member
    let image= require('../../assets/user.png')

    const showToast2 = () => {
        ToastAndroid.show('Leave cancelled !', ToastAndroid.SHORT);
      };
    const cancelLeave = ()=>{
        Alert.alert('Leave',"Cancel leave ?",[
            {
              text: 'Cancel',
              onPress:null,
              style: 'cancel'
            },
            { text: 'OK', onPress: () =>{
                 handleLeaveCancel()
              } }
        ],{cancelable:true})
    


    }

    const handleLeaveCancel= ()=>{
        fetch(urlConnection('staff/leave/cancel'),{
              method:'PUT',
              headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  id:id
                })
            })
            .then(res =>res.json())
            .then(server=>console.log(server))
            .catch(err=>console.log(err))

        fetch(urlConnection('staff'))
        .then(res => res.json())
        .then(res =>setStf(res))
        .catch(err=> console.log(err))
         onleave=1
        showToast2()
      }

    return (
        <View style={styles.container}>
            <HeaderBar />
              <View style={{position:'absolute',marginTop:'20%',borderColor:'#ccc',justifyContent:'center',borderRadius:360,alignSelf:'center', width:150,height:100, borderWidth:1}}>
                 {
                     image ?<Image source={image} style={{width:140, height:140, alignSelf:'center'}}/> :  <Entypo name='user'style={{alignSelf:'center'}} size={100} />
                 }
              </View>
           <View style={styles.lower}>
               <View style={{flex:1,paddingHorizontal:20}}>
                   <Text style={{alignSelf:'center',fontSize:18,fontWeight:'bold'}}>{first_name}{"  "}{last_name}</Text>
                   <View style={{width:'100%',height:'90%',padding:10,borderRadius:15,borderColor:'#eee',borderWidth:2}}>
                    <Text style={{fontSize:18,color:'darkblue',marginBottom:20, fontWeight:'bold',alignSelf:'center'}}>{type}</Text>
                    <Text style={{fontSize:15,fontWeight:'bold',marginBottom:10}}>Details</Text>
                    <Text style={{fontSize:15}}>{reason} </Text>
                   </View>

               </View>
               <View style={{width:'100%', height:'50%',backgroundColor:'indigo',flexDirection:'row'}}>
                   <View style={{width:'50%',height:'30%',borderRightWidth:2,borderColor:'teal'}}>
                   </View>

                   <View style={{width:'50%',height:'30%',justifyContent:'center'}}>
                        {
                           onleave ?
                             <TouchableOpacity 
                             onPress={cancelLeave}
                             style={{width:'60%',alignSelf:'center',justifyContent:'center',alignItems:'center',height:'60%',backgroundColor:'#ccc',borderRadius:5}}>
                                <Text style={{fontSize:15}}>Cancel Leave</Text>
                             </TouchableOpacity>
                             :null
                        }
                   </View>

               </View>

           </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    },
    lower:{
        width:'100%',
        height:'100%',
        marginTop:'55%',
        justifyContent:'space-between'
    }
})

export default LeaveDetails
