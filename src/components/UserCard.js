import React from 'react'
import { View,StyleSheet, Text ,TouchableOpacity,Alert} from 'react-native'
import {Entypo} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const UserCard = ({fname,lname,id,age,position,qualification,experience}) => {

    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <TouchableOpacity 
            style={styles.card}
            onPress={()=>alert('in-user')}
            >

            </TouchableOpacity>
             
             
 
                    
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        height:100,
        borderRadius:10,
        marginBottom:10,
        backgroundColor:'#F3ECE8'
    },
    card:{
        width:'100%',
        height:'100%'
    }
})

export default UserCard
