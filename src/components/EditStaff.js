import React,{useState} from 'react'
import { View,ScrollView, Alert,Text,Dimensions,TouchableOpacity,StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-datepicker'




import HeaderBar from '../custom/HeaderBar'
import FormInput from '../custom/FormInput'
import Button from '../custom/Button'


const {width, height} = Dimensions.get('window')

const EditStaff = ({route,navigation}) => {
    const{id,fname,lname,experience,position,qualification} = route.params


    const [filterBy, setFilterBy] = useState(null)
    const [items,setItems] = useState([
        {label: 'Intern Developer', value: 'intern' },
        {label: 'Fullstack Developer', value: 'fullstack' },
        {label: 'Backend Engineer', value: 'backend' },
        {label: 'Frontend Engineer', value: 'frontend' }
    ])

    const [firstname, setFirstName] = useState(fname)
    const [lastname, setLastName] = useState(lname)
    const [qualify, setQualify] = useState(qualification)
    const [exprence, setExprence] = useState(experience)
    const [date, setDate] = useState("")

    let exp =experience.toString()

    const handleDateChange =(date)=>{
        setDate(date)
   }

   const handleUserEdit =()=>{
       Alert.alert('Edit',"Apply changes ?",[
        {
          text: 'Cancel',
          onPress: () => alert('Cancelled'),
          style: 'cancel'
        },
        { text: 'OK', onPress: () =>{
            alert('Confirmed Edit')
            navigation.navigate('Home')
          } }
    ],{cancelable:true})
    //    navigation.navigate('Drawer')
    }
    let controller;
    return (
        <View style={styles.container}>
            <HeaderBar />
            <ScrollView 
            showsVerticalScrollIndicator={false}
            style={styles.editsection}>
            <FormInput 
                  label="First Name"
                  placeholder={firstname}
                  value ={firstname}
                  changeHandler={(text)=>setFirstName(text)}
               
                />

            <FormInput 
                  label="Last Name"
                  placeholder={lname}
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
                    placeholder={qualify}
                    value={qualify}
                    changeHandler={(text)=>setQualify(text)}
              
                />
                <FormInput 
                    label="Experience"
                    placeholder={exp}
                    value={exprence}
                    type="number-pad"
                    changeHandler={(text)=>setExprence(text)}
              
                />
                 <DatePicker 
                        style={{width: 200,marginVertical:15}}
                        date={date}
                        mode="date"
                        placeholder="Date of Birth"
                        format="YYYY-MM-DD"
                        minDate="1980-01-01"
                        maxDate="2009-05-01"
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
                 pressHandler={handleUserEdit}
                 />

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

export default EditStaff;
