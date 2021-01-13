import React from 'react'
import { View, StyleSheet,Text,Dimensions } from 'react-native'

import HeaderBar from '../custom/HeaderBar'


const {width, height} = Dimensions.get('window')
const Leaves = () => {
    return (
        <View style={styles.container}>
            <HeaderBar />
             <View style={styles.details}>
                <Text style={styles.title}>All members on Leave</Text>
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
        fontSize:15,
        fontWeight:'bold',
        alignSelf:'center',
        color:'darkblue'
    }
})

export default Leaves
