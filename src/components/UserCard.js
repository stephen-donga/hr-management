import React from 'react'
import { View,StyleSheet,Image, Text,TouchableOpacity,TouchableWithoutFeedback} from 'react-native'
import {Feather as Icon} from '@expo/vector-icons'
import { StackActions, useNavigation } from '@react-navigation/native'
import {connect} from 'react-redux'
import {detailsAdd} from '../redux/showUserDetails/detailsActions'

const UserCard = ({first_name,last_name,id,date_of_birth,position,qualification,experience,addDetails,onleave,image}) => {
    
    const navigation = useNavigation();
    const handlePress =()=>{
        let detail ={
            first_name,
            last_name,
            position,
            id,
            date_of_birth,
            qualification,
            experience,
            image,
            onleave
        }
        
            addDetails(detail)
            navigation.dispatch(StackActions.push('View'))
    }
    return (
        <TouchableOpacity 
            onPress={handlePress}
            style={styles.container}
            >
        <View style={styles.view}>
            <View style={styles.leftsection}>
                <Image source={{uri:image}}   style={styles.image}/>
            </View>
            <View style={styles.rightsection}>
                <View style={styles.upper}>
                <Text style={styles.text}>{first_name}{" "}{last_name}</Text>
                <Text style={styles.title}>{position}</Text>

            </View>
                <View style={styles.lower}>
               {
               onleave?(
                    <Text style={styles.title2}>
                        On Leave
                   </Text>
               ):(
                <Text style={styles.title1}>Available</Text>
               )
            }

                </View>
        </View>
                
                
        </View>
                </TouchableOpacity>
        
    )
}

const styles = StyleSheet.create({
    container:{
        height:100,
        borderRadius:5,
        marginBottom:10,
        borderColor:'grey',
        elevation:3
    },
    title:{
        fontSize:15,
        color:'grey'
    },
    title1:{
        fontSize:15,
        color:'green'
    },
    title2:{
        fontSize:15,
        color:'orange'
    },
    smalltext:{
        fontSize:15,
        fontWeight:'bold',
        color:'#aaa'
    },
    view:{
        width:'100%',
        height:'100%',
        flexDirection:'row',
    },
    upper:{
        width:'100%',
        height:'60%',
        justifyContent:'center'
    },
    leftsection:{
        width:'35%',
        height:'90%',
        justifyContent:'center',
        marginLeft:5,
        marginTop:5,
        borderTopLeftRadius:5,
        borderBottomLeftRadius:5
    },
    text:{
        fontSize:15,
        color:'grey',
        fontWeight:'bold',
    },
    image:{
        width:80,
        borderWidth:1,
        height:80,
        borderRadius:40,
        alignSelf:'center'
    },
    rightsection:{
        width:'65%',
        height:'100%',
        marginHorizontal:5
    },
    lower:{
        width:'100%',
        height:'40%',
        justifyContent:'center'
    },
    card:{
        width:'100%',
        height:'100%'
    }
})
const mapStateToProps = ({details}) => ({
 });

const mapDispatchToProps = dispatch => ({
    setDetails: act =>dispatch(setDetails(act)),
    addDetails: obj =>dispatch(detailsAdd(obj))

  });
export default connect(mapStateToProps,mapDispatchToProps)(UserCard)
