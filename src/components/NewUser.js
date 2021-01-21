 import React,{useState} from 'react'
 import { View,ScrollView, Text,StyleSheet,Dimensions,TouchableOpacity } from 'react-native'
 import DropDownPicker from 'react-native-dropdown-picker';


 // custom imports
 import HeaderBar from '../custom/HeaderBar'
 import Input from '../custom/Inputs'
 
 const {width, height} = Dimensions.get('window');
 const NewUser = ({navigation}) => {

    const [items,setItems] = useState([
        
        {label: 'Admin', value: 'admin' },
        {label: 'Cashier', value: 'cashier' },
        {label: 'Tech lead', value: 'lead' },
    ])
    const [filterBy, setFilterBy]= useState('admin')
     let controller

     const handleFirstNameChange =(e)=>{
        
     } 

     return (
         <View styles={styles.conatiner}>
             <HeaderBar />
             <View style={styles.form}>
                 <View style={{...StyleSheet.absoluteFillObject,backgroundColor:'teal'}} />
                 <View style={styles.overlay}>
                    <Text style={styles.heading}>Create new User</Text>
                    <ScrollView 
                    showsVerticalScrollIndicator={false}
                    style={styles.formarea}>
                        <Input
                        label="First name"
                        changeHandler={()=>alert('clicked')}
                        />
                        <Input
                        label="Last name" 
                        />
                         <Input
                        label="Email" 
                        />
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
                         <Input
                        label="Password"
                        textEntry={true}
                        />
                         <Input
                        label="Confirm password"
                        textEntry={true} 
                        />

                    </ScrollView>
                 </View>
             </View>
             <View style={styles.buttonsection}>
                 <TouchableOpacity 
                 onPress={()=>navigation.navigate('Login')}
                 style={styles.button}>
                     <Text>Create User</Text>

                 </TouchableOpacity>
             </View>
         </View>
     )
 }

 const styles = StyleSheet.create({
     conatiner:{
        flex:1,
        backgroundColor:'whitesmoke',
     },
     form:{
         width:width,
         height:height/2+150,
     },
     buttonsection:{
         width:width,
         height:'100%',
         backgroundColor:'teal'
     },
     overlay:{
         width:'100%',
         height:'100%',
         backgroundColor:'white',
         borderBottomLeftRadius:35,
         borderBottomRightRadius:35,
         alignItems:'center'
     },
     formarea:{
         width:'95%',
         height:'80%',
         padding:10,
         marginBottom:25
     },
     heading:{
         fontSize:16,
         fontWeight:'bold',
         color:'darkblue',
         marginTop:15,marginBottom:15
     },
     button:{
         width:width/2,
         height:40,
         backgroundColor:'white',
         alignSelf:'center',
         marginTop:50,
         borderRadius:15,
         alignItems:'center',
         justifyContent:'center'
     }
 })
 
 export default NewUser
 