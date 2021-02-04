import React, {useState} from 'react'
import { View, Text,Alert, StyleSheet,ToastAndroid,Image } from 'react-native'
import {Entypo} from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {connect} from 'react-redux'

import HeaderBar from '../custom/HeaderBar'
import {urlConnection} from '../utils/url'
import {setStaff} from '../redux/staff/staffActions'
import {setLeaves} from '../redux/leaves/leavesActions'

const LeaveDetails = ({route,navigation,setStf}) => {

    const [onLeave, setOnleave] = useState(true)

    const {member,type,start_date,reason,lId,end_date,staff} = route.params
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
    const deleteLeave = (Id) =>{
        
        fetch(urlConnection(`leaves/delete/${Id}`),{
            method:'DELETE'
        })
        .then(res=>res.json())
        .then(res=>console.log(res))
        .catch(err=>console.log(err))

        fetch(urlConnection('leaves'))
        .then(res=>res.json())
        .then(res=>setLeavz(res))
        .catch(err=>console.log(err))
        setOnleave(!onLeave)
        navigation.navigate('Home')
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
        showToast2()
        deleteLeave(lId)
      }

    return (
        <View style={styles.container}>
            <HeaderBar />
              <View style={{position:'absolute',marginTop:'15%',borderColor:'#ccc',justifyContent:'center',borderRadius:360,alignSelf:'center', width:150,height:100, borderWidth:1}}>
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
                    <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize:15}}>Starts:{" "}{start_date}{"   "} </Text>
                    <Text style={{fontSize:15}}>Ends:{" "}{start_date} </Text>
                    </View>
                    <Text style={{fontSize:15}}> {} </Text>
                    <Text style={{fontSize:15,marginTop:5}}>{reason} </Text>
                   </View>

               </View>
               <View style={{width:'100%', height:'45%',backgroundColor:'indigo',flexDirection:'row'}}>
                   <View style={{width:'50%',height:'30%'}}>
                   </View>

                   <View style={{width:'50%',height:'35%',justifyContent:'center'}}>
                        {
                           onLeave ?
                             <TouchableOpacity 
                             onPress={cancelLeave}
                             style={{width:'60%',alignSelf:'center',justifyContent:'center',marginTop:-5,alignItems:'center',height:'60%',backgroundColor:'#ccc',borderRadius:5}}>
                                <Text style={{fontSize:14}}>Cancel Leave</Text>
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

const mapDispatchToProps = dispatch =>({
    setStf: members => dispatch(setStaff(members)),
    setLeavz: leavz =>dispatch(setLeaves(leavz))
})

export default connect(null,mapDispatchToProps)(LeaveDetails)
