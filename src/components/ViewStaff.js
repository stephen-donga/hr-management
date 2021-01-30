import React,{useState,useEffect} from 'react'
import { View, Alert,Text,Dimensions,Image,ToastAndroid,StyleSheet} from 'react-native'
import{Feather as Icon} from "@expo/vector-icons"
import DateTimePicker from "@react-native-community/datetimepicker"
import { Modal, ModalContent } from 'react-native-modals';
import { ScrollView ,TextInput,TouchableOpacity } from 'react-native-gesture-handler'
import {connect} from 'react-redux'
import auditTrail from '../utils/trails'
import {setStaff} from '../redux/staff/staffActions'
import {setDetails} from '../redux/showUserDetails/detailsActions'
import { StackActions, useNavigation } from '@react-navigation/native'

import {urlConnection} from '../utils/url'

const {width, height} = Dimensions.get('window')

const ViewStaff = ({details,setStf,currentUser}) => {

    const navigation = useNavigation();

    const [modalVisible, setModalVisible] = useState(false);
    
    const {id,first_name,last_name,position,qualification,experience,onleave,date_of_birth,image} =details;
    
    const deleteMember = (memberId) =>{
        
        fetch(urlConnection(`staff/delete/${memberId}`),{
            method:'DELETE'
        })
        .then(res=>res.json())
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
        showToast()

        fetch(urlConnection('staff'))
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
          <Modal
           visible={modalVisible}
            onTouchOutside={() =>setModalVisible(!modalVisible)}
  >
    <ModalContent style={{width:width/2+170,height:height/2+200}}>
      <View >
        {/* <Text style={{fontSize:21,alignSelf:'center',fontWeight:'bold',color:'darkblue',marginBottom:30}}>Leave Request Form</Text>
        <Text style={{fontSize:18}}>Reason</Text>
        <TextInput 
        multiline={true}
        style={{width:'98%',padding:10,height:100,fontSize:19,marginBottom:10,backgroundColor:'#eee'}}
          placeholder='Reason and leave details here'
        />
          <TouchableOpacity  onPress={()=>showDatepicker()} 
          style={{width:'98%',height:50,backgroundColor:'blue',alignItems:'center',justifyContent:'center'}}
          >
            <Text style={{fontSize:17,marginBottom:10,fontWeight:'bold',color:'white'}}>Select start date</Text>
          </TouchableOpacity>
          <TouchableOpacity  onPress={showDatepicker2} 
          style={{width:'98%',height:50,marginTop:10,backgroundColor:'steelblue',alignItems:'center',justifyContent:'center'}}
          >
            <Text style={{fontSize:17,fontWeight:'bold',color:'white'}}>Select end date</Text>
          </TouchableOpacity>
          {show && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={date}
                      mode={mode}
                      is24Hour={true}
                      display="default"
                      onChange={onChange}
                      />
                    
      )}

        <TouchableOpacity
        style={{width:'98%',alignItems:'center',justifyContent:'center',height:50,marginTop:50,backgroundColor:'mediumaquamarine'}}
        >
          <Text style={{fontSize:18,fontWeight:'bold',color:'white'}}>Submit</Text>
        </TouchableOpacity>

        {show2 && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={date2}
                      mode={mode2}
                      is24Hour={true}
                      display="default"
                      onChange={onChange2}
                      />
                    
      )} */}
      </View>
    </ModalContent>
  </Modal>
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
                {
                  !onleave?(<TouchableOpacity
                  style={{width:'90%',height:40,backgroundColor:'dodgerblue',alignItems:'center',justifyContent:'center',alignSelf:'center',marginBottom:10}}
                  onPress={()=>navigation.navigate('LeaveForm',{id})}
                  
                  >
                      <Text style={styles.btntext}>Grant Leave</Text>
                  </TouchableOpacity>) :null
                }

                <TouchableOpacity
                style={{width:'90%',height:40,backgroundColor:'green',alignItems:'center',justifyContent:'center',alignSelf:'center',marginBottom:10}}
                onPress={()=>navigation.navigate('EditStaff')}
                
                >
                    <Text style={styles.btntext}>Edit</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                style={{width:'90%',height:40,backgroundColor:'#eee',elevation:5,alignItems:'center',justifyContent:'center',alignSelf:'center',marginBottom:10}}
                onPress={handleDelete}
                
                >
                    <Text style={{
                      fontSize:18,
                      fontWeight:'bold',
                      color:'red'
                      }}>Delete</Text>
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
        marginTop:100,
        marginBottom:10
    },
    title:{
        fontSize:15,
        color:'black'
    },
    text:{
        fontSize:15,
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
