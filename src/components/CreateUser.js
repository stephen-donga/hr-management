import React from 'react'
import { View, Text,StyleSheet,Dimensions } from 'react-native'

import HeaderBar from '../custom/HeaderBar'

const {width, height} = Dimensions.get('window')

const CreateUser = () => {
    return (
        <View style={styles.conatiner}>
            <HeaderBar />
            <Text>Create User</Text>
            <View style={styles.section}>

            </View>
        </View>
    )
}

const styles= StyleSheet.create({
    conatiner:{
        width:width,
        height:height
    },
    section:{
        width:width
    }
})

export default CreateUser
