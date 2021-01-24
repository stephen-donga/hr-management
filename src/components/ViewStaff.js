import React,{useEffect} from 'react'
import { View, Alert,Text,StyleSheet} from 'react-native'
import{Feather as Icon} from "@expo/vector-icons"
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import {connect} from 'react-redux'
import db from '../utils/database'
import auditTrail from '../utils/trails'
import {setStaff} from '../redux/staff/staffActions'
import {setDetails} from '../redux/showUserDetails/detailsActions'
import { StackActions, useNavigation } from '@react-navigation/native'


const ViewStaff = ({details,showDetails,setStff,currentUser,setDetails}) => {

    const navigation = useNavigation();

    
     
    const {id,first_name,last_name,position,image} =details;

    const deleteMember = (memberId) =>{
        db.transaction(tx =>{
            tx.executeSql('DELETE FROM staff_members WHERE id=?',[memberId],
            (txObj,resultSet)=>console.log(resultSet)),
            (txObj, error) => console.log('Error', error)
        });
       

      let trail={
        actor:currentUser,
        action:`Deleted staff member with names ${first_name} ${last_name}`,
        time:new Date().toString()
    }
        auditTrail.logTrail(trail)
      }
      const refetch = () =>{
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM staff_members',null,
              (txObj,{rows:{_array}}) =>setStff(_array),
              (txObj, error) => console.log('Error', error))
          });
      }
      
      const handleDelete = ()=>{
        Alert.alert('Delete',"Delete member ?",[
            {
              text: 'Cancel',
              onPress:null,
              style: 'cancel'
            },
            { text: 'OK', onPress: () =>{
                deleteMember(id)
                setDetails(!showDetails)
                refetch()
                
               
    
              } }
        ],{cancelable:true})
    
      }

      useEffect(() => {
        refetch()
          return () => {
          }
      }, [])
    
    return (
        <View style={styles.container}>
            <Text style={styles.boxtext}>{first_name}{" "}{last_name}</Text>
            <Text style={styles.title}>{position}</Text>
            <ScrollView
            showsVerticalScrollIndicator={false} 
            style={styles.scroll}
            >
                <TouchableOpacity 
                style={styles.option}
                >
                    <Text>Grant Leave</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  onPress={()=>{
                    setDetails(!showDetails)
                    navigation.navigate('StaffUser',{id})}
                    }
                    style={styles.option}
                >
                    <Text>Make user</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={ ()=>{
                    setDetails(!showDetails)
                    navigation.dispatch(StackActions.push('EditStaff'))
                } } 
                 style={styles.option}
                >
                    <Text>Edit</Text>
                </TouchableOpacity>


                
                <TouchableOpacity 
                onPress={ handleDelete }
                style={styles.option}
                >
                    <Text>Delete</Text>
                </TouchableOpacity>
            </ScrollView>
            
               
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        height:'100%',
        padding:10,
        width:'100%',
        backgroundColor:'#B49F93'
    },

    boxtext:{
        fontSize:18,
        fontWeight:'bold',
        alignSelf:'center',
        color:'darkblue'
    },
    title:{
        fontSize:14,
        fontWeight:'bold',
        alignSelf:'center',
        marginTop:10
    },
    scroll:{
        paddingTop:10
    },
    option:{
        width:'100%',
        height:30,
        marginTop:5,
        backgroundColor:'whitesmoke',
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1,
        borderColor:'grey',
        borderRadius:5,
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
    setStff: members => dispatch(setStaff(members)),
    setDetails: act =>dispatch(setDetails(act))
  });

export default connect(mapStateToProps, mapDispatchToProps)(ViewStaff)
