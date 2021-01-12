import React from 'react'
import { View, Text ,StyleSheet,Dimensions} from 'react-native'
import HeaderBar from '../custom/HeaderBar'

const {width,height} = Dimensions.get('window')
const Notifications = () => {
    return (
        <View style={styles.container}>
            <HeaderBar />
            <Text style={styles.heading}>Notifications</Text>
            <View style={styles.hr}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:width,
        height:height,
        alignItems:'center',
        backgroundColor:'white'
    },
    heading:{
        fontSize:18,
        color:'darkblue',
        marginTop:5
    },
    hr:{
        width:width/2+100,
        borderWidth:1,
        borderColor:'darkgrey'
    }
})

export default Notifications
