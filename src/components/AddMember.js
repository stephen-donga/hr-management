import React,{useState} from 'react'
import { View, Text,Button, StyleSheet, ScrollView, TouchableOpacity,Dimensions } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from "@react-native-community/datetimepicker"
import auditTrail from '../utils/trails'

const auditManager = auditTrail()




import HeaderBar from '../custom/HeaderBar'
import FormInput from '../custom/FormInput'


const {width, height} = Dimensions.get('window');

const AddMember = ({navigation}) => {

    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [qualification, setQualification] = useState("");
    const [experience, setExperience] = useState("");

    const [filterBy, setFilterBy] = useState(null)
    const [items,setItems] = useState([
        
        {label: 'Intern Developer', value: 'intern' },
        {label: 'Fullstack Developer', value: 'fullstack' },
        {label: 'Backend Engineer', value: 'backend' },
        {label: 'Frontend Engineer', value: 'frontend' }
    ])

    const [firstnameErr, setFnameErr] = useState("")
    const [lastnameErr, setLnameErr] = useState("")
    const [qualificationErr, setQualifyErr] = useState("")
    const [experienceErr, setExperienceErr] = useState("")

    const [date, setDate] = useState(new Date(96400000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const validDate = new Date(date).toLocaleDateString()

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

        if(firstname == ""&& lastname==""&&qualification==""&&experience==""){
            alert('Enter details before you submit')
        }else{
            setFirstName("")
            setLastName("")
            setExperience("")
            setDate("")
            setQualification("")

            fetch('http://192.168.43.6:8000/staff/add',{
                method:'post',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    firstName:firstname,
                    lastName:lastname,
                    date:validDate,
                    qualification:qualification,
                    experience:experience,
                    position:filterBy
                  })
            })
            .then(res =>res.json())
            .then(server=>console.warn(server))
            .catch(error=>console.warn(error))

         let   trail={
                actor:"Steven",
                action:`Added new member Odongo Gerald`,
                time:new Date().toString()
            }
    
            auditTrail.logTrail(trail)

            navigation.navigate('Home')


            //clearing errors
            setQualifyErr("")
            setExperienceErr("")
            setFnameErr("")
            setLnameErr(" ")
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

export default AddMember
