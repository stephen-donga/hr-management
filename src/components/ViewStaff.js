import React from 'react'
import { View, Text,StyleSheet ,Image,Dimensions} from 'react-native'
import{Entypo} from "@expo/vector-icons"
import HeaderBar from '../custom/HeaderBar'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {connect} from 'react-redux'
import db from '../utils/database'
import auditTrail from '../utils/trails'
import {setStaff} from '../redux/staff/staffActions'

const {width,height} = Dimensions.get('window')

const ViewStaff = ({route,currentUser,navigation,allStaff,setStaff} ) => {
     
    const {first_name,last_name,id,position,qualification,image,experience,date_of_birth,del} = route.params;

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
        navigation.navigate('Staff',{memberId}) 
      }

    return (
        <View style={styles.container}>
            <HeaderBar />
           <View style={styles.topsection}>
               <View style={{...StyleSheet.absoluteFill,backgroundColor:'#B0B7B9',borderBottomLeftRadius:14,borderBottomRightRadius:14}} />
               {
                  image !==null?(<Image source={image} style={styles.pic}/>):( <Entypo name="user" size={80} color="steelblue" />)
              }

           </View>
           <View style={styles.extrudingsection}>
               <Text style={styles.text}>{first_name}{" "}{last_name} </Text>
               <View style={styles.userdetails}>
                    <View style={styles.righttdetailsection}>
                        <Text style={styles.ttle}>Position</Text>
                        <Text>{position}</Text>
                        <Text style={styles.ttle }>Qualification</Text>
                        <Text>{qualification}</Text>
                        <Text style={styles.ttle}>Date of birth</Text>
                        <Text> </Text>
                         
                      

                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-evenly',width:'100%',marginTop:220,height:40,position:'absolute'}}>
                        <TouchableOpacity 
                        onPress={()=>navigation.navigate('EditStaff',{first_name,last_name,id,position,qualification,image,experience})}
                        style={styles.button}
                        >
                            <Text>Edit</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                        onPress={()=>{del(id)
                          deleteMember(id)
                          navigation.navigate('Home')}}
                          style={styles.button}
                        >
                            <Text>Delete</Text>
                        </TouchableOpacity>
                         

                    </View>

               </View>
               

           </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        height:height,
        width:width,
    },
    topsection:{
        width:width,
        height:height/3,
        alignItems:'center',
        paddingTop:20,
        position:'relative'
    },
    extrudingsection:{
        width:width/3+150,
        height:height/2+50,
        backgroundColor:'white',
        marginTop:-40,
        alignSelf:'center',
        shadowColor:'black',
        shadowOffset:{width:0,height:2},
        shadowRadius:5,
        shadowOpacity:0.34,
        elevation:5, 
        borderRadius:5,
        paddingTop:25,
        paddingLeft:15,
        position:'relative'
    },
    text:{
        fontSize:18,
        fontWeight:'bold',
        alignSelf:'center',
        color:'steelblue'
    },
    userdetails:{
        width:'100%',
        height:'80%',
        position:"absolute",
        borderTopWidth:1,
        borderTopColor:'steelblue',
        marginTop:60,
        alignSelf:'center',
        flexDirection:'row'
    },
    leftdetailsection:{
        width:'10%',
        height:'100%',
        padding:5
    },
    righttdetailsection:{
        width:'90%',
        height:'100%',
        padding:5
    },
    title:{
        fontSize:15,
        color:'steelblue',
        fontWeight:'bold'
    },
    label:{
        fontSize:15,
        color:'black',
        paddingLeft:10,
        marginBottom:15
    },
    button:{
        width:width/3-20,
        height:30,
        backgroundColor:'whitesmoke',
        borderColor:'teal',
        borderWidth:1,
        borderRadius:5,
        alignItems:'center',
        justifyContent:'center'
    },
    pic:{
        width:100,
        height:105,
        borderRadius:80,
        borderWidth:1,
        borderColor:'teal'
    },
    ttle:{
        marginBottom:5,
        fontWeight:'bold',
        color:'teal'
    }

})
const mapStateToProps = ({ user,staff }) => ({
    currentUser: user.currentUser,
    allStaff:staff.staff
  });

  const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user)),
    setStaff: members => dispatch(setStaff(members))
  });

export default connect(mapStateToProps, mapDispatchToProps)(ViewStaff)
