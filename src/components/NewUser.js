 import React,{useState} from 'react'
 import { View,ScrollView, Text,StyleSheet,Dimensions,TouchableOpacity } from 'react-native'
 import DropDownPicker from 'react-native-dropdown-picker';


 // custom imports
 import HeaderBar from '../custom/HeaderBar'
 import Input from '../custom/Inputs'
 import db from '../utils/database'
 
 const {width, height} = Dimensions.get('window');
 const NewUser = ({navigation}) => {

    const [items,setItems] = useState([
        {label: 'Admin', value: 'admin' },
        {label: 'Cashier', value: 'cashier' },
    ]);
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [filterBy, setFilterBy]= useState('admin')

    //setitng error messages
    const [fnameError, setFnameError] = useState("")
    const [lnameError, setLnameError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [pswdError, setPswdError] = useState("")

    let controller

     const handleFirstNameChange =(text)=>{
        setFirstName(text)
     } 
     const handleLastNameChange = (text) =>{
            setLastName(text)
     }

     const handleEmailchange = (text) =>{
            setEmail(text)
     }

     const handlePasswordChange = (text) =>{
            setPassword(text)
     }
     const handleConfirmPasswordChange = (text) =>{
            setConfirmPassword(text)
     }

     const handleUserInput =()=>{
         if(fnameError=="")setFnameError("Please enter first name")
         if(lnameError =="")setLnameError("Please enter last name")
         if(emailError =="")setEmailError("Please enter email")
         if(passwordError =="")setPasswordError("Please enter password")
         if(pswdError=="")setPswdError("Please confirm password")

         //setting user credentials
         if(firstName==""&&lastName==""){
             return;
         }
         if(email==""){
            return;
        }
        if(password !==confirmPassword){
            alert('Passwords don not match !')
            return
        }

        // db.transaction(tx =>{
        //     tx.executeSql('INSERT INTO  new_users (first_name,last_name,email,role,password) values (?,?,?,?,?)',[ firstName,lastName,email,filterBy,password],
        //     (txObj,resultSet)=>console.log(resultSet),
        //     (txObj, error)=>console.log('Error', error)
        //     )
        //     })
        fetch('http://172.18.100.1:8000/users',{
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

            navigation.navigate('Login')
            setFirstName("")
            setLastName("")
            setEmail("")
            setPassword("")
            setConfirmPassword("")
            



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
                            value={firstName}
                            changeHandler={handleFirstNameChange}
                            message={firstName ?'':fnameError}
                        />
                        <Input
                            label="Last name" 
                            value={lastName}
                            changeHandler={handleLastNameChange}
                            message={lastName ? '':lnameError}
                        />
                         <Input
                            label="Email" 
                            value={email}
                            changeHandler={handleEmailchange}
                            message={email ?"":emailError}
                        />
                        <Text style={styles.text}>Role</Text>
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
                            value={password}
                            changeHandler={handlePasswordChange}
                            message={password ?"":passwordError}
                            />
                         <Input
                            label="Confirm password"
                            textEntry={true} 
                            value={confirmPassword}
                            changeHandler={handleConfirmPasswordChange}
                            message={confirmPassword ? "":pswdError}
                            />
                            <Text style={{marginBottom:35}}></Text>

                    </ScrollView>
                 </View>
             </View>
             <View style={styles.buttonsection}>
                 <TouchableOpacity 
                 onPress={handleUserInput}
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
         height:height/2+170,
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
         marginBottom:10,
          
     },
     heading:{
         fontSize:16,
         fontWeight:'bold',
         color:'darkblue',
         marginTop:15,
         marginBottom:15
     },
     button:{
         width:width/2,
         height:40,
         backgroundColor:'white',
         alignSelf:'center',
         marginTop:30,
         borderRadius:15,
         alignItems:'center',
         justifyContent:'center'
     },
     text:{
         color:'teal',
         fontSize:18
     }
 })
 
 export default NewUser
 