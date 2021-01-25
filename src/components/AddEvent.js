import React,{useState} from 'react'
import { View, Text,Button,TextInput, Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import DateTimePicker from "@react-native-community/datetimepicker"
import {connect} from 'react-redux'


import FormInput from '../custom/FormInput'
import HeaderBar from '../custom/HeaderBar'
import db from '../utils/database'
import auditTrail from '../utils/trails'

const {width, height} = Dimensions.get('window')

const AddEvent = ({currentUser,navigation}) => {

    const [event, setEvent] = useState('');
    const [describe, setDescribe] = useState('')

    const [date, setDate] = useState(new Date(96400000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [result, setResult] = useState([])

    let validDate =date.toString();

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
      };
    
      const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
      };
    
      const showDatepicker = () => {
        showMode('date');
      };
     const addEvent =()=>{
        // db.transaction(tx => {
        //     tx.executeSql('INSERT INTO events (event, description,date) values (?,?,?)', 
        //     [event,describe,validDate],
        //       (txObj, resultSet) => setResult(result.concat(resultSet)),
        //       (txObj, error) => console.log('Error', error))
        //   })

        let id = 2

          fetch('http://172.18.100.1:8000/events/add',{
            method:'post',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                 event:event,
                 describe:describe,
                 time:validDate,
                 user_id:id
              })
          })
          .then(res =>res.json())
          .then(server=>setResult(result.concat(server)))
          .catch(error=>console.warn(error))

          let trail ={
              actor:currentUser,
              action:`Added an event "${event}"`,
              time:new Date().toString()
            }
            auditTrail.logTrail(trail)
     }

    return (
        <View style={{width:width}}>
            <HeaderBar />
           <View style={{width:'100%',alignItems:'center', marginTop:5}}>
               <Text style={{fontSize:25,fontWeight:'bold',marginBottom:25}}>Add an event</Text>
               <FormInput 
                    placeholder="Event name"
                    label='Event Name'
                    value={event}
                    changeHandler={(e)=>{
                        setEvent(e)
                    }}
               />
           <View>
           <Text style={{marginTop:15,fontSize:17,}}>Description</Text>
            <TextInput 
                multiline={true}
                value={describe}
                onChangeText={(e)=>{
                    setDescribe(e)
                }}
                style={{
                    width:width/2+150,
                    height:height/3,
                    backgroundColor:'white',
                    marginTop:10,borderWidth:1,
                    borderColor:'black',
                    borderRadius:5,
                    fontSize:20,
                    padding:5
                    
                }}
            />

                <View  style={{marginTop:20,marginBottom:20}}>

                <Button  onPress={showDatepicker} title="Select date"  />
                </View>
                {show && (
                <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
                />
                
                )}
             <TouchableOpacity 
                onPress={()=>{
                    addEvent()
                    fetchEvents()
                    navigation.navigate('Events')
                }}
                style={{width:'100%',height:40,marginTop:10,backgroundColor:'darkblue',alignItems:'center',justifyContent:'center'}}
                >
               <Text style={{fontSize:17,color:'white'}}>Add Event</Text>
           </TouchableOpacity>
           </View>
          
           </View>
        </View>
    )
}

const mapStateToProps = ({ user}) => ({
    currentUser: user.currentUser,
  });

export default connect(mapStateToProps)(AddEvent)
