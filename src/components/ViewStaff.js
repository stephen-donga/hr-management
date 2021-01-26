import React,{useEffect} from 'react'
import { View, Alert,Text,Dimensions,Image, ToastAndroid,StyleSheet} from 'react-native'
import{Feather as Icon} from "@expo/vector-icons"
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import {connect} from 'react-redux'
import auditTrail from '../utils/trails'
import {setStaff} from '../redux/staff/staffActions'
import {setDetails} from '../redux/showUserDetails/detailsActions'
import { StackActions, useNavigation } from '@react-navigation/native'

const {width, height} = Dimensions.get('window')

const ViewStaff = ({details,showDetails,setStf,currentUser,setDetails}) => {

    const navigation = useNavigation();

    
    
    const {id,first_name,last_name,position,qualification,experience,date_of_birth,image} =details;
    
    const deleteMember = (memberId) =>{
        
        fetch(`http://192.168.137.1:8000/staff/delete/${memberId}`,{
            method:'DELETE'
        })
        .then(res=>res.json())
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
        showToast()

        fetch('http://192.168.137.1:8000/staff')
        .then(res =>res.json())
        .then(server=>setStf(server))
        .catch(error=>console.log(error))
       

      let trail={
        actor:currentUser,
        action:`Deleted staff member with names ${first_name} ${last_name}`,
        time:new Date().toString()
    }
        auditTrail.logTrail(trail)
      }
      
      const showToast = () => {
        ToastAndroid.show('Delete successful !', ToastAndroid.SHORT);
      };

      const handleDelete = ()=>{
        Alert.alert('Delete',"Delete member ?",[
            {
              text: 'Cancel',
              onPress:null,
              style: 'cancel'
            },
            { text: 'OK', onPress: () =>{
                deleteMember(id)
                navigation.navigate('Staff')
                
               
    
              } }
        ],{cancelable:true})
    
      }

    return (
        <View style={styles.container}>
               <View style={styles.uppersection}></View>
               <View style={styles.extrudingsection}>
                   <Image source={{uri:image}} style={{width:170,height:170,borderRadius:80 }} />
               </View>
               <ScrollView style={styles.lowersection}>
                <View style={{width:'100%',height:50, flexDirection:'row',paddingHorizontal:40}}>
                   <View style={{width:'40%',height:'100%'}}>
                      <Text style={styles.title}>First name</Text>
                   </View>
                   <View style={{width:'60%',height:'100%'}}>
                     <Text style={styles.text}>{first_name}</Text>
                   </View>
                </View>
                <View style={{width:'100%',height:50, flexDirection:'row',paddingHorizontal:40}}>
                   <View style={{width:'40%',height:'100%'}}>
                      <Text style={styles.title}>Last name</Text>
                   </View>
                   <View style={{width:'60%',height:'100%'}}>
                     <Text style={styles.text}>{last_name}</Text>
                   </View>
                </View>

                <View style={{width:'100%',height:50, flexDirection:'row',paddingHorizontal:40}}>
                   <View style={{width:'40%',height:'100%'}}>
                      <Text style={styles.title}>Position</Text>
                   </View>
                   <View style={{width:'60%',height:'100%'}}>
                     <Text style={styles.text}>{position}</Text>
                   </View>
                </View>

                <View style={{width:'100%',height:50, flexDirection:'row',paddingHorizontal:40}}>
                   <View style={{width:'40%',height:'100%'}}>
                      <Text style={styles.title}>Qualification</Text>
                   </View>
                   <View style={{width:'60%',height:'100%'}}>
                     <Text style={styles.text}>{qualification}</Text>
                   </View>
                </View>

                <View style={{width:'100%',height:50, flexDirection:'row',paddingHorizontal:40}}>
                   <View style={{width:'40%',height:'100%'}}>
                      <Text style={styles.title}>Experience</Text>
                   </View>
                   <View style={{width:'60%',height:'100%'}}>
                     {
                         experience >1 ?(<Text style={styles.text}>{experience}{" "}years</Text>):(<Text style={styles.text}>{experience}{" "}year</Text>)
                     }
                   </View>
                </View>

                <View style={{width:'100%',height:50, flexDirection:'row',paddingHorizontal:40}}>
                   <View style={{width:'40%',height:'100%'}}>
                      <Text style={styles.title}>Date of birth</Text>
                   </View>
                   <View style={{width:'60%',height:'100%'}}>
                     <Text style={styles.text}>{date_of_birth}</Text>
                   </View>
                </View>
                <TouchableOpacity
                style={{width:'90%',height:40,backgroundColor:'dodgerblue',alignItems:'center',justifyContent:'center',alignSelf:'center',marginBottom:10}}
                onPress={()=>alert('Delete')}
                
                >
                    <Text style={styles.btntext}>Grant Leave</Text>
                </TouchableOpacity>

                <TouchableOpacity
                style={{width:'90%',height:40,backgroundColor:'green',alignItems:'center',justifyContent:'center',alignSelf:'center',marginBottom:10}}
                onPress={()=>navigation.navigate('EditStaff')}
                
                >
                    <Text style={styles.btntext}>Edit</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                style={{width:'90%',height:40,backgroundColor:'red',alignItems:'center',justifyContent:'center',alignSelf:'center',marginBottom:10}}
                onPress={handleDelete}
                
                >
                    <Text style={styles.btntext}>Delete</Text>
                </TouchableOpacity>

               </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        height:'100%',
        width:'100%',
        backgroundColor:'white'
    },
    btntext:{
        fontSize:18,
        fontWeight:'bold',
        color:'white'
    },
    uppersection:{
        width:width,
        height:height/3-80,
        backgroundColor:'dodgerblue'
    },
    extrudingsection:{
        position:'absolute',
        width:width/3+40,
        height:height/4-30,
        padding:5,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:150,
        backgroundColor:'white',
        marginTop:'15%',
        alignSelf:'center',
        elevation:5
    },
    lowersection:{
        flex:1,
        backgroundColor:'white',
        marginTop:120,
        marginBottom:10
    },
    title:{
        fontSize:18,
        color:'black'
    },
    text:{
        fontSize:18,
        fontWeight:'bold',
        color:'darkblue'
    }

   
})
const mapStateToProps = ({ user,staff,details }) => ({
    currentUser: user.currentUser,
    roles:user.actions,
    allStaff:staff.staff ,
    details:details.details,
    showDetails:details.showDetails
  });

  const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user)),
    setStf: members => dispatch(setStaff(members)),
    setDetails: act =>dispatch(setDetails(act))
  });

export default connect(mapStateToProps, mapDispatchToProps)(ViewStaff)
