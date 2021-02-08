import React,{useState} from 'react'
import { View,ScrollView,Button, Alert,Text,Dimensions,TouchableOpacity,StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from "@react-native-community/datetimepicker"
import auditTrail from '../utils/trails'
import {connect} from 'react-redux'
import {setStaff} from '../redux/staff/staffActions'
import {StackActions, useNavigation} from '@react-navigation/native'

import HeaderBar from '../custom/HeaderBar'
import FormInput from '../custom/FormInput'
import {urlConnection} from '../utils/url'


const {width, height} = Dimensions.get('window')

const EditStaff = ({details,addStaff,currentUser}) => {
    const {first_name,last_name,id,position,qualification,experience,image} = details;
    const navigation = useNavigation();
    const [filterBy, setFilterBy] = useState(position)
    const [items,setItems] = useState([
        {label: 'Intern Developer', value: 'Intern Developer' },
        {label: 'Fullstack Developer', value: 'Fullstack Developer' },
        {label: 'Backend Engineer', value: 'Backend Developer' },
        {label: 'Frontend Engineer', value: 'Frontend Developer' }
    ])
    const [firstname, setFirstName] = useState(first_name)
    const [lastname, setLastName] = useState(last_name)
    const [qualify, setQualify] = useState(qualification)
    const [positn, setPosition] = useState(filterBy)
    const [exprence, setExprence] = useState(experience)


    const [date, setDate] = useState(new Date(96400000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const [data, setData] = useState([])
     
   let validDate = date.toDateString()

   const handleUserEdit =()=>{

        fetch(urlConnection('staff/update'),{
          method:'PUT',
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              firstname:firstname,
              lastname:lastname,
              position:filterBy,
              qualification:qualification,
              experience:experience,
              date:validDate,
              id:id
            })
        })
        .then(res =>res.json())
        .then(server=>console.log(server))
        .catch(error=>console.log(error))
        .finally(()=>{
          fetch(urlConnection('staff'))
          .then(res => res.json())
          .then(res => addStaff(res))
          .catch(err =>console.log(err))
        })

       Alert.alert('Edit',"Apply changes ?",[
        {
          text: 'Cancel',
          onPress: () => alert('Cancelled'),
          style: 'cancel'
        },
        { text: 'OK', onPress: () =>{
            let trail = {
                actor:currentUser,
                action:`Edited staff ${firstname} ${lastname}`,
                time: new Date().toString()
            }

            auditTrail.logTrail(trail)
            
            navigation.dispatch(StackActions.push('Home'))
          } }
    ],{cancelable:true})
     }
    let controller;

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

    return (
        <View style={styles.container}>
            <HeaderBar />
            <ScrollView 
            showsVerticalScrollIndicator={false}
            style={styles.editsection}>
            <FormInput 
                  label="First Name"
                  placeholder={first_name}
                  value ={firstname}
                  changeHandler={(text)=>setFirstName(text)}
               
                />

            <FormInput 
                  label="Last Name"
                  placeholder={last_name}
                  value={lastname}
                  changeHandler={(text)=>setLastName(text)}
              
                />

             <Text style={{marginTop:15,fontSize:15}}>Position</Text>
                <DropDownPicker
                    items={items}
                    containerStyle={{height:30}}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    labelStyle={{color:'black',fontSize:14}}
                    controller={instance => controller = instance}
                    onChangeList={(items, callback) => {
                        new Promise((resolve, reject) => resolve(setItems(items)))
                            .then(() => callback())
                            .catch(() => {});
                    }}

                    defaultValue={filterBy}
                    onChangeItem={item => setFilterBy(item.value)}
                 />
                  <FormInput 
                    label="Qualification"
                    placeholder={qualification}
                    value={qualify}
                    changeHandler={(text)=>setQualify(text)}
              
                />
                <FormInput 
                    label="Experience"
                    placeholder={experience.toString()}
                    type="numeric"
                    changeHandler={(text)=>setExprence(text)}
              
                />
                 <Button onPress={showDatepicker} title="Select date of birth" />
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
      <View style={{marginTop:10}}>
          <Button 
             color="darkgreen"
            onPress={handleUserEdit} 
            title="Submit" />
      </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        width:width,
        height:height,
        paddingBottom:5
    },
    editsection:{
        width:width/2+150,
        alignSelf:'center',
        backgroundColor:'whitesmoke',
        paddingTop:15,
        paddingHorizontal:15,
        paddingBottom:10
    }
})
const mapStateToProps = ({ user,staff,details }) => ({
    currentUser: user.currentUser,
    allStaff:staff.staff ,
    details:details.details,
    showDetails:details.showDetails
  });

  const mapDispatchToProps = dispatch =>({
    addStaff: staff => dispatch(setStaff(staff))
  })

export default connect(mapStateToProps, mapDispatchToProps)(EditStaff);
