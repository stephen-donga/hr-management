import React from 'react'
import { View, Text,Dimensions, StyleSheet} from 'react-native'


const {width, height} = Dimensions.get('window')
const EventCard = ({event, time}) => {
    return (
         <View style={styles.container}>
             <Text style={styles.title}>{event}</Text>
             <Text style={styles.text}>{time}</Text>
         </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:70,
        backgroundColor:'indianred',
        elevation:5,
        marginBottom:15,
        padding:10
    },
    title:{
        fontWeight:'bold',
        fontSize:17,
        color:'#fff'
    },
    text:{
        fontSize:17,
        color:'black'
    }
})

export default EventCard
