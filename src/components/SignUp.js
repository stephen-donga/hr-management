import React, { useState } from 'react'
import { Text, View, StyleSheet,ScrollView, TouchableOpacity} from 'react-native';

import Inputfield from '../custom/Inputfield'

const SignUp =({navigation}) =>{

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [pswd, setPassword] = useState("")
    const [confirmPswd, setConfirmPswd] = useState("");

    const[fnameErr,setFnameError] = useState("")
    const[lnameErr,setLnameError] = useState("")
    const[userNameErr,setUserNameError] = useState("")
    const[passwordErr,setPasswordError] = useState("")
    const[confirmErr,setConfirmError] = useState("")


    const handleFirstName = (text)=>{
        setFirstName(text)
    }

    const handleLastName = (text)=>{
        setLastName(text)
    }
    const handleUsername = (text)=>{
        setUsername(text)
    }
    const handlePassword = (text)=>{
        setPassword(text)
    }
    const handleConfirmPsd = (text)=>{
        setConfirmPswd(text)
    }

    const validation =()=>{
         if(firstName == '')setFnameError("Name cannot be empty!");
         
         if(lnameErr == ''){
             setLnameError("Please enter your last name!")
          }
          if(userNameErr==""){
              setUserNameError("Please enter a username!")
          }
          if(passwordErr==''){
              setPasswordError("Please enter a password!")
          }
          if(confirmErr ==""){
              setConfirmError("Please confirm your password")
          }
          if(firstName!==""&& lastName!==""){
            //   postUser();

          }else{
            alert('Please sign up !')
          }
          if(pswd !==confirmPswd){
              alert('Passwords don not match !')
            }else{
              navigation.navigate('Login')
            }
    }

    const postUser = ()=>{
        fetch('http://192.168.137.1:8000/users/add',{
            method:'post',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                firstname: firstName,
                lastname: lastName,
                username: username,
                password: pswd
              })
        })
        .then(res =>res.json())
        .then(server=>console.warn(server))
        .catch(error=>console.warn(error))
    }
    
    const handleSignUp = () => {
        validation()

         
        
        // clear input fields on submit
        setFirstName("")
        setLastName("")
        setUsername("")
        setPassword("")
        setConfirmPswd("")

    }

        return (
            <View  style={styles.container}>

                <View style={styles.header}>
                    <Text style={styles.text}>Sign up </Text>
                   
                </View>

                <ScrollView style={styles.detailsSection}>
                    <Inputfield 
                        placeholder="First name"
                        label="First name"
                        value={firstName}
                        message={firstName?"":fnameErr}
                        changeHandler={handleFirstName}
                    />

                    <Inputfield 
                        placeholder="Last name"
                        label="Last name"
                        message={lastName?"":lnameErr}
                        value={lastName}
                        changeHandler={handleLastName}
                    />
                    <Inputfield 
                        placeholder="Username"
                        label="Username"
                        message={username?"":userNameErr}
                        value={username}
                        changeHandler={handleUsername}
                    />
                     
                    <Inputfield 
                        placeholder="Password"
                        textEntry={true}
                        value={pswd}
                        message={pswd?"":passwordErr}
                        label="Password"
                        changeHandler = {handlePassword}
                    />
                    <Inputfield 
                        placeholder="Confirm Password"
                        textEntry={true}
                        value={confirmPswd}
                        message={confirmPswd?"":confirmErr}
                        label="Confirm Password"
                        changeHandler={handleConfirmPsd}
                    />
                    
                   <TouchableOpacity 
                        style={styles.button}
                        onPress={handleSignUp}>
                       <Text style={styles.text2}>Sign Up</Text>
                   </TouchableOpacity>
                    
                     
                </ScrollView>
            </View>
        )
    }
 

const styles = StyleSheet.create({
    container:{
        flex:1,
        width:"100%",
        height:"100%",
        backgroundColor:'whitesmoke'
    },
    header:{
        width:'100%',
        height:80,
        backgroundColor:'#c1c1c1',
        justifyContent:'center',
        alignItems:'center'
    },
    text:{
        fontSize:25,
        fontWeight:'bold',
        color:'white'
    },
    text2:{
        fontSize:18,
        color:'white'
    },
    detailsSection:{
        height:'100%',
        marginHorizontal:15,
        marginVertical:15,
  
    },
    button:{
        width:'98%',
        padding:10,
        backgroundColor:'rebeccapurple',
        borderRadius:15,
        borderWidth:0,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:15
    }
})
export default SignUp
