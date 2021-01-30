import React,{useState} from 'react'
import { View, Text,TouchableOpacity,TextInput,ToastAndroid ,Dimensions} from 'react-native'
import DateTimePicker from "@react-native-community/datetimepicker"
import {connect} from 'react-redux'
import {setStaff} from '../redux/staff/staffActions'

import HeaderBar from '../custom/HeaderBar'
import {urlConnection} from '../utils/url'

const {width,height} = Dimensions.get('window')
const LeaveForm = ({route,navigation,setStf}) => {

    const {id} = route.params;
    const [reason, setReason] = useState('')
    const [leaveType, setLeaveType] = useState('')

    const [date, setDate] = useState(new Date(96400000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const [date2, setDate2] = useState(new Date(96400000));
    const [mode2, setMode2] = useState('date');
    const [show2, setShow2] = useState(false);

    const showToast = () => {
        ToastAndroid.show('Can not add empty fields !', ToastAndroid.SHORT);
      };
      const showToast2 = () => {
        ToastAndroid.show('Leave granted', ToastAndroid.SHORT);
      };

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

    const onChange2 = (event, selectedDate) => {
      const currentDate = selectedDate || date2;
      setShow2(Platform.OS === 'ios');
      setDate2(currentDate);
    };
  
    const showMode2 = (currentMode) => {
      setShow2(true);
      setMode2(currentMode);
    };
  
    const showDatepicker2 = () => {
      showMode2('date');
    };
    const handleChange =(text)=>{
        setReason(text)
    }

    const handleTypeChange = (text) =>{
        setLeaveType(text)
    }

    let validStartDate =date.toLocaleDateString()
    let validEndDate = date2.toLocaleDateString()

    const handleSubmit = ()=>{
        if(reason==""&&leaveType==''){
            showToast()
            return;
        }else{
            fetch(urlConnection('leaves/add'),{
                method:'post',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    type:leaveType,
                    reason:reason,
                    starts:validStartDate,
                    ends:validEndDate,
                    staffId:id
                  })
            })
            .then(res =>res.json())
            .then(server=>console.log(server))
            .catch(error=>console.log(error))
            showToast2()
            navigation.navigate('Home')

            fetch(urlConnection('staff/leave'),{
              method:'PUT',
              headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  id:id
                })
            })
            .then(res =>res.json())
            .then(server=>console.log(server))
            .catch(error=>console.log(error))

          fetch(urlConnection('staff'))
          .then(res =>res.json())
          .then(server=>setStf(server))
          .catch(error=>console.log(error))
          
        }

    }

    return (
        <View style={{flex:1,backgroundColor:'#fff'}}>
            <HeaderBar />
        <View style={{width:width/2+170,height:height/2+200,alignSelf:'center'}}>
      
        <Text style={{fontSize:21,alignSelf:'center',fontWeight:'bold',color:'darkblue',marginTop:30,marginBottom:30}}>Leave Request Form</Text>
       
        <Text style={{fontSize:18}}>Type of Leave</Text>
        <TextInput 
            onChangeText={handleTypeChange}
            value={leaveType}
            style={{width:'98%',padding:5,height:50,fontSize:18,marginBottom:10,backgroundColor:'#eee'}}
            placeholder='leave type'
        />
        <Text style={{fontSize:18}}>Reason</Text>
        <TextInput 
            multiline={true}
            value={reason}
            onChangeText={handleChange}
            style={{width:'98%',padding:10,height:100,fontSize:19,marginBottom:10,backgroundColor:'#eee'}}
            placeholder='Reason and leave details here'
        />
          <TouchableOpacity  onPress={()=>showDatepicker()} 
          style={{width:'98%',height:50,backgroundColor:'blue',alignItems:'center',justifyContent:'center'}}
          >
            <Text style={{fontSize:17,marginBottom:10,fontWeight:'bold',color:'white'}}>Select start date</Text>
          </TouchableOpacity>
          <TouchableOpacity  onPress={showDatepicker2} 
          style={{width:'98%',height:50,marginTop:10,backgroundColor:'steelblue',alignItems:'center',justifyContent:'center'}}
          >
            <Text style={{fontSize:17,fontWeight:'bold',color:'white'}}>Select end date</Text>
          </TouchableOpacity>
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
        onPress={handleSubmit}
        style={{width:'98%',alignItems:'center',justifyContent:'center',height:50,marginTop:50,backgroundColor:'mediumaquamarine'}}
        >
          <Text style={{fontSize:18,fontWeight:'bold',color:'white'}}>Submit</Text>
        </TouchableOpacity>

        {show2 && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={date2}
                      mode={mode2}
                      is24Hour={true}
                      display="default"
                      onChange={onChange2}
                      />
                    
      )}
      </View>
      </View>
    )
}

const mapDispatchToProps = dispatch =>({
  setStf: users =>dispatch(setStaff(users))
})

export default connect(null, mapDispatchToProps)(LeaveForm)
