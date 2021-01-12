import React from 'react'
import { View,StyleSheet, Text ,TouchableOpacity,Alert} from 'react-native'
import {Entypo} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const UserCard = ({fname,lname,id,age,position,qualification,experience}) => {

    const navigation = useNavigation()
    return (
        
            <TouchableOpacity 
            style={styles.container}
            onPress={()=>alert('in-user')}
            >
                <View style={{flexDirection:'row',flex:1}}>
                    <View style={{width:'40%',height:'90%',alignSelf:'center',borderRadius:130,margin:5,backgroundColor:'white',borderColor:'#A1625E',borderWidth:1}}>
                        
                    </View>
                    <View style={{width:'60%',height:'90%',alignItems:'center',justifyContent:'center'}}>
                        <Text style={{fontSize:15,fontWeight:'bold'}}>{fname}{" "}{lname}</Text>
                        <Text style={{fontSize:15,color:'steelblue'}}>{position}</Text>
                    </View>

                </View>

            </TouchableOpacity>
        
    )
}

const styles = StyleSheet.create({
    container:{
        height:130,
        borderRadius:10,
        marginBottom:10,
        backgroundColor:'#F4BCB8',
        borderWidth:1,
        borderColor:'#FB8B84'
    },
    card:{
        width:'100%',
        height:'100%'
    }
})

export default UserCard
