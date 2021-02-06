import React,{useState, useEffect} from 'react'
import { View, Text,Button,TextInput, ToastAndroid,Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import DateTimePicker from "@react-native-community/datetimepicker"
import {connect} from 'react-redux'
import {StackActions, useNavigation} from '@react-navigation/native'


import {urlConnection} from '../utils/url'
import FormInput from '../custom/FormInput'
import HeaderBar from '../custom/HeaderBar'
import auditTrail from '../utils/trails'
import { setEvents } from '../redux/events/eventActions'

const {width, height} = Dimensions.get('window')

const AddEvent = ({currentUser,addEvents}) => {

    const navigation = useNavigation();

    const [event, setEvnt] = useState('');
    const [describe, setDescribe] = useState('')

    const [eventErr, setEventErr] = useState('')
    const [describeErr, setDescribeErr] = useState('')

    const [date, setDate] = useState(new Date(96400000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const validate = date.toDateString()

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

     const handleEvent =()=>{
        let id = 2
            if(event !==""&&describe !==""){
                fetch(urlConnection('events/add'),{
                    method:'post',
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        event:event,
                        describe:describe,
                        time:validate,
                        user_id:id
                    })
                })
                .then(res =>res.json())
                .then(server=>console.log(server))
                .catch(error=>console.warn(error))

                setEvnt("")

                fetch(urlConnection('events'))
                .then(res => res.json())
                .then(res => addEvents(res))
                .catch(err => console.log(err))

            let trail = {
                actor:currentUser,
                action:`Added an event "${event}"`,
                time:new Date().toString()
                }
                auditTrail.logTrail(trail)
                setDescribe('')
                showToastWithGravity()
                navigate()
                
            }else{
                setEventErr('Please enter event !')
                setDescribeErr('Please write a detail about the even !')
                
            }
        }
     
        const navigate = ()=>{
            setTimeout(()=>{
                navigation.dispatch(StackActions.push('Events'))
            },200)
        }        

        const showToastWithGravity = () => {
            ToastAndroid.showWithGravity(
              "Event added Successfully",
              ToastAndroid.LONG,
              ToastAndroid.CENTER,
              ToastAndroid.color='blue'
            );
          };

        const handleEventChange = (text)=>{
            setEvnt(text)
        }
        
    return (
        <View style={{width:width}}>
            <HeaderBar />
           <View style={{width:'100%',alignItems:'center', marginTop:5}}>
               <Text style={{fontSize:18,fontWeight:'bold',marginBottom:25}}>Add an event</Text>
               <FormInput 
                    placeholder="Event name"
                    label='Event Name'
                    message={event ? "":eventErr}
                    value={event}
                    changeHandler={handleEventChange}
               />
           <View>

           

           <Text style={{marginTop:15,fontSize:17,}}>Description</Text>
            <TextInput 
                multiline={true}
                value={describe}
                placeholder='Description of event'
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
                    fontSize:15,
                    padding:20
                    
                }}
            />
            <Text style={{fontSize:14,color:'red'}}>{describe? "":describeErr}</Text>
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
                onPress={handleEvent}
                style={{width:'100%',height:40,marginTop:10,backgroundColor:'darkblue',alignItems:'center',justifyContent:'center'}}
                >
               <Text style={{fontSize:17,color:'white'}}>Add Event</Text>
           </TouchableOpacity>
           </View>
          
           </View>
        </View>
    )
}

const mapStateToProps = ({ user,events}) => ({
    currentUser: user.currentUser,
    eventz: events.events 
  });

  const mapDispatchToProps = dispatch => ({
      addEvents: event =>dispatch(setEvents(event))
  })

export default connect(mapStateToProps,mapDispatchToProps)(AddEvent)
