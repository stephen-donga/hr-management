import React from 'react'
import { View,StyleSheet,Image, Text,TouchableOpacity,TouchableWithoutFeedback} from 'react-native'
import {Feather as Icon} from '@expo/vector-icons'
import { StackActions, useNavigation } from '@react-navigation/native'
import {connect} from 'react-redux'
import {setSingleTrainee} from '../redux/training/trainingActions'

const UserCard = ({first_name,last_name,id,date_of_birth,position,qualification,experience,setPerson,image}) => {
    
    const navigation = useNavigation();

    const handlePress = ()=>{
        let personToAdd = {
            first_name,
            last_name,
            id,
            date_of_birth,
            position,
            qualification,
            experience,
            image
        }
        setPerson(personToAdd)
        navigation.navigate('Trainee')
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

            </View>
                <View style={styles.lower}>
                    <Text style={styles.title}>Qualification:{"  "}{qualification}</Text>

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
        fontSize:16,
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
        width:'35%',
        height:'100%',
        justifyContent:'center',
        paddingLeft:5,
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
        borderRadius:80,
        alignSelf:'center'
    },
    rightsection:{
        width:'65%',
        height:'100%',
        marginHorizontal:5
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
