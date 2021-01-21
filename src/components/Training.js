import React from 'react'
import { View, Text,Dimensions,StyleSheet } from 'react-native'

import HeaderBar from '../custom/HeaderBar'

const {width, height} = Dimensions.get('window')

const Training = () => {
    return (
        <View style={styles.container}>
            <HeaderBar />
            <View style={{width:width,height:40,backgroundColor:'#eee',padding:10,paddingLeft:15,paddingTop:10}}>
                <Text style={{fontSize:16,fontWeight:'bold',alignSelf:'center',color:'darkblue'}}>Training</Text>

            </View>
            <View style={styles.details}>
            {/* <Text style={styles.title}>Training</Text> */}

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:width,
        height:height,
        backgroundColor:'white'
    },
     details:{
        flex:1,
        padding:10
    },
    title:{
        fontSize:15,
        fontWeight:'bold',
        alignSelf:'center',
        color:'darkblue'
    }
})

export default Training;
