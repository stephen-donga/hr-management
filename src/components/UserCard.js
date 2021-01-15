import React from 'react'
import { View,StyleSheet, Text ,TouchableOpacity,Alert} from 'react-native'
import {Entypo} from '@expo/vector-icons'
import { StackActions, useNavigation } from '@react-navigation/native'

const UserCard = ({first_name,last_name,id,date_of_birth,position,qualification,experience}) => {

    const navigation = useNavigation()
    return (
        
            <TouchableOpacity 
            style={styles.container}
            onPress={()=>navigation.dispatch(StackActions.push('View',{first_name,last_name,id,position,qualification,experience}))}
            >
                <View style={{flexDirection:'row',flex:1}}>
                    <View style={{width:'40%',height:'90%',alignSelf:'center' ,margin:5}}>
                        
                    </View>
                    <View style={{width:'60%',height:'90%',alignItems:'center',justifyContent:'center'}}>
                        <Text style={{fontSize:15,fontWeight:'bold'}}>{first_name}{" "}{last_name}</Text>
                        <Text style={{fontSize:15,color:'steelblue'}}>{date_of_birth}</Text>
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
        backgroundColor:'whitesmoke',
        borderWidth:1,
        borderColor:'#FB8B84'
    },
    card:{
        width:'100%',
        height:'100%'
    }
})

export default UserCard
