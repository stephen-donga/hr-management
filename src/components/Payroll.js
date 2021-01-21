import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import HeaderBar from '../custom/HeaderBar'

const Payroll = () => {
    return (
        <View style={styles.container}>
            <HeaderBar />
            <View style={{width: "100%",height:40,backgroundColor:'#eee',padding:10,paddingLeft:15,paddingTop:10}}>
                <Text style={styles.title}>Payroll</Text>

            </View>
            <Text></Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
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

export default Payroll
