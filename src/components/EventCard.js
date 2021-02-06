import React,{useState} from 'react'
import { View, Text,Dimensions,TouchableOpacity, StyleSheet, Button} from 'react-native'
import { Modal, ModalContent } from 'react-native-modals';
import {urlConnection} from '../utils/url'
import {connect} from 'react-redux'
import {setEvents} from '../redux/events/eventActions'


const {width, height} = Dimensions.get('window')
const EventCard = ({event,setEvent,description,time,id}) => {
    
    const [isSeen,setIseen] = useState(false)

    const handleDelete =()=>{
        fetch(urlConnection(`events/delete/${id}`),{
            method:'DELETE'
        })
        .then(res=>res.json())
        .then(res=>console.log(res))
        .catch(err=>console.log(err))

        fetch(urlConnection('events'))
        .then(res=>res.json())
        .then(res=>setEvent(res))
        .catch(err=>console.log(err))

        setIseen(!isSeen)

    }
    return (
         <View style={styles.container}>
             <TouchableOpacity onPress={()=>setIseen(!isSeen)}>
                <Text style={styles.title}>{event}</Text>
                <Text style={styles.text}>{time}</Text>
                <Modal
                    visible={isSeen}
                    onTouchOutside={() => {
                   setIseen(!isSeen)
                    }}
                >
        <ModalContent style={{width:width/2+80,height:height/3+30,backgroundColor:'#eee'}}>
            <View style={{height:'80%',paddingTop:10}}>
            <Text style={{fontSize:15,fontWeight:'bold',marginBottom:5,color:'black'}}>Details</Text>
            <Text style={{fontSize:15,color:'darkblue',marginBottom:10}}>{description}</Text>
            <Text style={{fontSize:15,marginBottom:5,color:'black'}}>Date</Text>
            <Text>{time}</Text>

        </View>
        <Button
        onPress= {handleDelete}
         title='Remove event'
         color='orange'/>
    </ModalContent>
  </Modal>
             </TouchableOpacity>
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

const mapDispatchToProps = dispatch => ({
    setEvent: events =>dispatch(setEvents(events))
})

export default connect(null,mapDispatchToProps)(EventCard)
