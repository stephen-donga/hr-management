import React from 'react'
import { View, Text,Dimensions,StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import HeaderBar from '../custom/HeaderBar'

const {width, height} = Dimensions.get('window')

const Events = ({navigation}) => {
    return (
        <View style={styles.container}>
            <HeaderBar />
            <View style={styles.details}>
            
            <View style={{width:'100%'}}>
                <TouchableOpacity 
                onPress={()=>navigation.navigate('AddEvent')}
                style={{width:'100%',height:'100%',backgroundColor:'darkgreen',alignItems:'center',justifyContent:'center', height:30}}
                >
                    <Text style={{fontSize:18,color:'white'}}>Add Event</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>All Events</Text>
            <View style={{flex:1,backgroundColor:'white',marginTop:5}}>

            </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:width,
        height:height,
    },
     details:{
        flex:1,
        padding:10
    },
    title:{
        fontSize:18,
        fontWeight:'bold',
        alignSelf:'flex-start',
        color:'black',
        marginTop:10,
        paddingLeft:10
    }
})

export default Events;
