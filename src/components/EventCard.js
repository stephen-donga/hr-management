import React from 'react'
import { View, Text ,Dimensions} from 'react-native'


const {width, height} = Dimensions.get('window')
const EventCard = ({event, time}) => {
    return (
        <View style={{width:'100%',height:height/5-50,marginBottom:10,backgroundColor:'white',elevation:5,justifyContent:'center',padding:5}}>
        <Text style={{fontSize:18,fontWeight:'bold'}}>{event}</Text>
        <Text style={{fontSize:15}}>{time}</Text>
        </View>
    )
}

export default EventCard
