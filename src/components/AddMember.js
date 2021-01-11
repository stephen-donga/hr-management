import React,{useState} from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity,Dimensions } from 'react-native'
import DatePicker from 'react-native-datepicker'
import DropDownPicker from 'react-native-dropdown-picker';



import DrawerHeader from '../custom/DrawerHeader'
import HeaderBar from '../custom/HeaderBar'
import FormInput from '../custom/FormInput'
import Button from '../custom/Button'


const {width, height} = Dimensions.get('window')
const AddMember = ({navigation}) => {

    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [date, setDate] = useState("");
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

    const handleDateChange =(date)=>{
         setDate(date)
    }
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
        if(firstname=="")setFnameErr("Please enter firestname");
        if(lastname =="")setLnameErr('Please enter last name');
        if(experience=="")setExperienceErr('Please enter your experience');
        if(qualification=="")setQualifyErr('Please enter your qualification')
        

        // fetch('http://192.168.137.1:8000/staff/add',{
        //     method:'post',
        //     headers: {
        //         Accept: "application/json",
        //         "Content-Type": "application/json"
        //       },
        //       body: JSON.stringify({
        //         firstName:firstname,
        //         lastName:lastname,
        //         date:date,
        //         qualification:qualification,
        //         experience:experience,
        //         position:position
        //       })
        // })
        // .then(res =>res.json())
        // .then(server=>console.warn(server))
        // .catch(error=>console.warn(error))
        if(firstname == ""&& lastname==""&&qualification==""&&experience==""){
            alert('Enter details before you submit')
        }else{
            setFirstName("")
            setLastName("")
            setExperience("")
            setDate("")
            setQualification("")
            navigation.navigate('Home')


            //clearing errors
            setQualifyErr("")
            setExperienceErr("")
            setFnameErr("")
            setLnameErr(" ")
        }
        

       


    }

    let controller;
    return (
        <View style={styles.container} >
             <HeaderBar />
             <DrawerHeader 
                toggler={()=>navigation.openDrawer()}
                />
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
                <DatePicker 
                        style={{width: 200,marginVertical:15}}
                        date={date}
                        mode="date"
                        placeholder="Date of Birth"
                        format="YYYY-MM-DD"
                        minDate="2016-05-01"
                        maxDate="2021-05-12"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                          dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                          },
                          dateInput: {
                            marginLeft: 36,
                            borderColor:'teal',
                            borderRadius:5
                          }
                        }}
                        onDateChange={handleDateChange}
                    />
                 <Button 
                 title="Submit"
                 pressHandler={handleMemberAddition}
                 />
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
