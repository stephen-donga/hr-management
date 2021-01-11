import React from 'react'
import { View, Text ,StyleSheet, Dimensions} from 'react-native'

const {width, height} = Dimensions.get('window')

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:width,
        height:height,
        backgroundColor:'red'
    }
})

export default HomeScreen
