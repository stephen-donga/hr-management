import React from 'react'
import { View, Text ,Dimensions} from 'react-native'


const {width, height} = Dimensions.get('window')
const EventCard = ({event, date}) => {
    return (
        <View style={{width:'100%',height:height/5-50,marginBottom:10,backgroundColor:'#827C79',justifyContent:'center',padding:5}}>
        <Text style={{fontSize:18,fontWeight:'bold'}}>{event}</Text>
        <Text style={{fontSize:15}}>{date}</Text>
        </View>
    )
}

export default EventCard
