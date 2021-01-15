import React,{useState} from 'react'
import { View,ScrollView,Button, Alert,Text,Dimensions,TouchableOpacity,StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from "@react-native-community/datetimepicker"
import auditTrail from '../utils/trails'
import db from '../utils/database'

import HeaderBar from '../custom/HeaderBar'
import FormInput from '../custom/FormInput'


const {width, height} = Dimensions.get('window')

const EditStaff = ({route,navigation}) => {
    const {first_name,last_name,id,position,qualification,experience} = route.params;
    const [filterBy, setFilterBy] = useState(null)
    const [items,setItems] = useState([
        {label: 'Intern Developer', value: 'intern' },
        {label: 'Fullstack Developer', value: 'fullstack' },
        {label: 'Backend Engineer', value: 'backend' },
        {label: 'Frontend Engineer', value: 'frontend' }
    ])
    const [firstname, setFirstName] = useState(first_name)
    const [lastname, setLastName] = useState(last_name)
    const [qualify, setQualify] = useState(qualification)
    const [positn, setPosition] = useState(position)
    const [exprence, setExprence] = useState(experience)


    const [date, setDate] = useState(new Date(1598051730000).toString());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const [data, setData] = useState([])
     
   

   const handleUserEdit =()=>{
       Alert.alert('Edit',"Apply changes ?",[
        {
          text: 'Cancel',
          onPress: () => alert('Cancelled'),
          style: 'cancel'
        },
        { text: 'OK', onPress: () =>{
            alert('Staff Edited')

            let trail = {
                actor:'steven',
                action:`${first_name} ${last_name} to ${firstname} ${lastname}`,
                time: new Date().toString()
            }

            auditTrail.logTrail(trail)
            
            navigation.navigate('Home')
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

      db.transaction(tx => {
        tx.executeSql(`UPDATE staff_members SET first_name = ${firstname} last_name = ${lastname} position = ${positn} qualification= ${qualify} experience= ${exprence} date_of_birth =${date} WHERE id = ?`, [id],
          (txObj,{rows:{_array}}) => setData(data.concat(_array))),
          (txObj, error)=>console.log('Error',error) 
         })
    

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
                    value={exprence}
                    type="number-pad"
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

export default EditStaff;
