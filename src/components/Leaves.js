import React from 'react'
import { View, StyleSheet,Text,Dimensions } from 'react-native'

import HeaderBar from '../custom/HeaderBar'


const {width, height} = Dimensions.get('window')
const Leaves = () => {
    return (
        <View style={styles.container}>
            <HeaderBar />
            <View style={{width:width,height:40,backgroundColor:'#eee',padding:10,paddingLeft:15,paddingTop:10}}>
                <Text style={styles.title}>All members on Leave</Text>

            </View>
             <View style={styles.details}>
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

export default Leaves
