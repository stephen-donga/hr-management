import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import HeaderBar from '../custom/HeaderBar'

const LeaveDetails = () => {
    return (
        <View style={styles.container}>
            <HeaderBar />
            <View style={styles.uppersection}>
                <View style={{width:"35%",height:'100%'}}>
                <View style={{...StyleSheet.absoluteFillObject, backgroundColor:'dodgerblue'}}/>
                <View style={{width:'100%', height:'100%',backgroundColor:'lightblue',borderTopRightRadius:35}}>

                    </View>
                </View>
                <View style={{width:'65%', height:'100%'}}>
                    <View style={{width:'100%', height:'100%',backgroundColor:'dodgerblue',borderBottomLeftRadius:35}}>

                    </View>
                    <View style={{...StyleSheet.absoluteFillObject}}/>

                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    },
    uppersection:{
        width:'100%',
        height:150,
        flexDirection:'row'
    }
})

export default LeaveDetails
