import React from 'react'
import { View, Text ,StyleSheet, Dimensions} from 'react-native'

import HeaderBar from '../custom/HeaderBar'

const {width, height} = Dimensions.get('window')

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <HeaderBar />
            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:width,
        height:height,
    }
})

export default HomeScreen
