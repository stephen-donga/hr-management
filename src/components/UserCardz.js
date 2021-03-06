import React from 'react'
import { View,StyleSheet,Image, Text,TouchableOpacity,TouchableWithoutFeedback} from 'react-native'
import {Entypo} from '@expo/vector-icons'
import { StackActions, useNavigation } from '@react-navigation/native'
import {connect} from 'react-redux'
import {setSingleTrainee} from '../redux/training/trainingActions'

const UserCard = ({email,image,role}) => {
    
    const navigation = useNavigation();

    const handlePress = ()=>{
        navigation.dispatch(StackActions.push('Userdetail',{email}))
    }

    
    return (
        <TouchableOpacity 
            onPress={handlePress}
            style={styles.container}
            >
        <View style={styles.view}>
            <View style={styles.leftsection}>
               {
                   image==null || undefined ?<Entypo name='user' color='royalblue' size={80}/>  :<Image source={{uri:image}}   style={styles.image}/> 
               }
            </View>
            <View style={styles.rightsection}>
                <View style={styles.upper}>
                <Text style={styles.text}>{email}</Text>

            </View>
                <View style={styles.lower}>
                    <Text style={styles.title}>Role:{" "}{role}</Text>

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
        fontWeight:'bold',
        color:'grey'
    },
    smalltext:{
        fontSize:14,
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
        height:'50%',
        borderBottomWidth:1,
        borderColor:'dodgerblue',
        justifyContent:'center'
    },
    leftsection:{
        width:'30%',
        height:'100%',
        backgroundColor:'indigo',
        justifyContent:'center',
        paddingLeft:15,
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
        borderRadius:80
    },
    rightsection:{
        width:'70%',
        height:'100%',
        marginHorizontal:15
    },
    lower:{
        width:'100%',
        height:'50%',
        justifyContent:'center'
    },
    card:{
        width:'100%',
        height:'100%'
    }
})
 
const mapDispatchToProps = dispatch => ({
     setPerson: person => dispatch(setSingleTrainee(person))
  });
export default connect(null,mapDispatchToProps)(UserCard)
