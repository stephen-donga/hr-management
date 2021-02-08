import React,{useState, useEffect} from 'react'
import { View, Text,Button, StyleSheet, ScrollView,ToastAndroid,Dimensions } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from "@react-native-community/datetimepicker"
import auditTrail from '../utils/trails'
import {connect} from 'react-redux'
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import {urlConnection} from '../utils/url'

import {setStaff} from '../redux/staff/staffActions'

import HeaderBar from '../custom/HeaderBar'
import FormInput from '../custom/FormInput'

const {width, height} = Dimensions.get('window');

const AddMember = ({navigation,currentUser,setStf}) => {

    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [qualification, setQualification] = useState("");
    const [experience, setExperience] = useState("");

    const [filterBy, setFilterBy] = useState('Intern Developer')
    const [items,setItems] = useState([
        
        {label: 'Intern Developer', value: 'Intern Developer' },
        {label: 'Fullstack Developer', value: 'Fullstack Developer' },
        {label: 'Backend Engineer', value: 'Backend Developer' },
        {label: 'Frontend Engineer', value: 'Frontend Developer' }
    ])

    const [firstnameErr, setFnameErr] = useState("")
    const [lastnameErr, setLnameErr] = useState("")
    const [qualificationErr, setQualifyErr] = useState("")
    const [experienceErr, setExperienceErr] = useState("")

    const [date, setDate] = useState(new Date(96400000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const [image, setImage] = useState(null)

    const validDate = new Date(date).toLocaleDateString()

    const showToast = () => {
        ToastAndroid.show('Member added successfully !', ToastAndroid.SHORT);
      };

    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
      }, []);

      const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
      };

    const handleFirstNameChange = (value) => {
        setFirstName(value)
    }
    const handleLastNameChange = (value) => {
        setLastName(value)
    }
    const handleExperienceChange = (value) => {
        setExperience(value)
    }
    const handleQualificationChange = (value) => {
        setQualification(value)
    }
    
    const handleMemberAddition = () =>{

        if(firstname==""){
            setFnameErr("Please enter first name")
            return;
        }else{

        }
        if(lastname ==""){
            setLnameErr('Please enter last name')
            return;
        }else{

        }

        if(filterBy ==null){
            alert('Please select position')
            return;
        }else{

        }

        if(qualification==""){
            setQualifyErr('Please enter qualification')
            return;
        }

        if(experience==""){
            setExperienceErr('Please enter experience')
                return;
            }

        if(firstname ==""&& lastname==""&&qualification==""&&experience==""){
            alert('Enter details before you submit')
        }else{
            showToast()
            setTimeout(() => {
              fetch(urlConnection('staff'))
              .then(res =>res.json())
              .then(server=>setStf(server))
              .catch(error=>console.log(error))
                
                navigation.navigate('Staff')
            }, 100);
            setFirstName("")
            setLastName("")
            setExperience("")
            setDate("")
            setQualification("")

            fetch(urlConnection('staff/add'),{
                method:'post',
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
                    image:image
                  })
                })
                .then(res =>res.json())
                .then(server=>{
                  if(server.message=="exists"){
                     alert('No duplicate allowed !')
                     }else{
                     let trail={
                      actor:currentUser,
                      action:`Added new member ${firstname} ${lastname}`,
                      time:new Date().toString()
                      }
          
                       auditTrail.logTrail(trail)
        
                        //clearing errors
                        setQualifyErr("")
                        setExperienceErr("")
                        setFnameErr("")
                        setLnameErr(" ")
                    
                  }
                })
                .catch(error=>console.log(error))
                .finally(()=>{
                  fetch(urlConnection('staff'))
                .then(res =>res.json())
                .then(server=>setStf(server))
                .catch(error=>console.log(error))
                })
              }
          
              }
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
      
     let controller;
    return (
        <View style={styles.container} >
             <HeaderBar />
             <View style={{width:width,height:40,backgroundColor:'#eee',padding:10,paddingLeft:15,paddingTop:10}}>
                <Text style={{fontSize:16,fontWeight:'bold',alignSelf:'center',color:'darkblue'}}>Add staff member</Text>

            </View>
             
            <ScrollView style={styles.section}
                showsVerticalScrollIndicator={false}
                >
                <FormInput 
                  label="First Name"
                  placeholder="Enter first name"
                  message= {firstname ? "":firstnameErr}
                  value={firstname}
                  changeHandler={handleFirstNameChange}
                />

                <FormInput 
                  label="Last Name"
                  placeholder="Enter last name"
                  message={lastname ? "":lastnameErr}
                  value={lastname}
                  changeHandler={handleLastNameChange}
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
                    placeholder="Enter Qualification"
                    message={qualification ? "":qualificationErr}
                    value={qualification}
                    changeHandler={handleQualificationChange}
                />
                 <FormInput 
                    label="Experience"
                    placeholder="Enter years of experience eg.2"
                    type="number-pad"
                    message={experience ?"":experienceErr}
                    value={experience}
                    changeHandler={handleExperienceChange}
                />
                 <View  style={{marginTop:20,marginBottom:20}}>
                  <Button  onPress={pickImage} title="Select Image"  />
                </View>
                <View  style={{marginTop:5,marginBottom:20}}>

                 <Button  onPress={showDatepicker} title="Select date of birth"  />
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
                 <View  style={{marginBottom:20}}>

                 <Button 
                    title="Submit"
                    color="green"
                    onPress={handleMemberAddition}
                 />
                 </View>
               <View style={{height:50}}>

              </View>
            </ScrollView>
             
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        width:width,
        alignItems:'center',
        justifyContent:'center'
    },
    header:{
        width:'100%',
        height:70,
        backgroundColor:'#c1c1c1',
        alignItems:'center',
        justifyContent:'center'
    },
    heading:{
        fontSize:20,
        alignSelf:'center'
    },
    text:{
        color:'white',
        fontSize:18
    },
    section:{
        flex:1,
        width:width/2+150,
        padding:10,
        borderRadius:5,
        backgroundColor:'white',
    }
    
})


const mapStateToProps = ({ user }) => ({
    currentUser: user.currentUser,
  });
const mapDispatchToProps = dispatch =>({
    setStf: staff => dispatch(setStaff(staff))
})
 

export default connect(mapStateToProps,mapDispatchToProps)(AddMember)
