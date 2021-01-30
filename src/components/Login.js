import React, { useState, useEffect } from 'react'
import {View,Button,Text,ToastAndroid,StyleSheet,TouchableOpacity} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import auditTrail from '../utils/trails'
import  {setLoggedIn} from '../redux/user/userAction'
import {connect} from  'react-redux'
import {setCurrentUser,setNewUser} from '../redux/user/userAction'
import {setStaff} from '../redux/staff/staffActions'

import Inputfield from '../custom/Inputfield'
import {urlConnection} from '../utils/url'

const Login = ({navigation,setStaf,setLoggedUser,newUsers,setNewUsers,setCurrentUser}) => {

    const [fetched, setFetched] = useState([])
    const [loading, setLoading] = useState(false)

    const showToast = () => {
        ToastAndroid.show('Pleas! enter credentials', ToastAndroid.SHORT);
      };

    const startSpinner = () =>{
        setLoading(true)
        setTimeout(()=>{
            setLoading(false)
            navigation.navigate('Home')
            setUsername("");
            setPassword("")
        },1000)
    }
    

    const fetchUsers = () => {
        fetch(urlConnection('users'))
        .then(res =>res.json())
        .then(server=>setFetched(server))
        .catch(error=>console.log(error))

        fetch(urlConnection('new'))
        .then(res =>res.json())
        .then(server=>setNewUsers(server))
        .catch(error=>console.log(error))

        fetch(urlConnection('staff'))
        .then(res =>res.json())
        .then(server=>setStaf(server))
        .catch(error=>console.log(error))

    }
     
    let allUserz = fetched.concat(newUsers)
     useEffect(() => {
         fetchUsers();
        return () => {
          
        }
    }, [])

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [userError,setUserError] = useState("")
    const [passwordError,setPasswordError] = useState("")
    
    const filteredUser = allUserz.filter(user =>user.username==username||user.email==username &&user.password==password)
    const handleUsernameChange = (text) => {
        setUsername(text)
    }

    const handlePasswordChange = (text) => {
        setPassword(text);
    }

    const validate = () =>{

        let trail={
            actor: "",
            action:'',
            time:new Date().toString()
        }

        if(userError=="")setUserError("Please enter a valid username")
        
        if(passwordError=="")setPasswordError("Please enter a valid password")
        
        if(filteredUser.length&&filteredUser[0].password===password){
            trail ={
                actor:username,
                action:'Successfully logged in',
                time:new Date().toString()
            }
            setCurrentUser(username)
            let user = filteredUser[0]
            setLoggedUser(user)

            auditTrail.logTrail(trail)
            startSpinner()
            }
            else{
                trail={
                    actor:username,
                    action:'Failed login with password',
                    time:new Date().toString()
                }
                showToast()
    
                auditTrail.logTrail(trail)
               navigation.navigate('Login')
 
            }
    }

    const handleLogin = () => {
        if(fetched.length<1){
        }
        validate();
        
      
      
    }
  
        return (
            <View style={styles.container}>
                <View style={{position:'absolute',marginTop:'60%',marginLeft:'40%',width:250,height:150,alignItems:'center',justifyContent:'center'}}>
                <Spinner
                    visible={loading}
                    size='large'
                    
                    />
                </View>
                <View style={{width:'100%',height:'40%',backgroundColor:'white'}} >
                    <View style={{height:120,width:'100%',paddingTop:20,borderRadius:30,backgroundColor:'#B0AAA7',position:'relative',alignItems:'center'}}>
                        <View style={{width:'100%',height:25,backgroundColor:'#827C79',...StyleSheet.absoluteFillObject}}/>
                        <Text style={{fontSize:18,color:'white'}}></Text>
                        <Text style={{fontSize:28,fontWeight:'bold',color:'white'}}>HRMS</Text>
                    </View>

                </View>

               <View style={{height:'60%',paddingTop:10}}>
               <View style={{width:'85%',borderRadius:10,padding:11}}>
                 
                     
                     <Inputfield 
                         label="Username or Email"
                         icon="user"
                         value={username}
                         message={username ?'':userError}
                         placeholder="username or email"
                         changeHandler={handleUsernameChange }
 
                  />
                  <Inputfield 
                     label="Password"
                     icon="lock"
                     textEntry={true}
                     message={password ?'':passwordError}
                     value={password}
                     isPaasword={true}
                     placeholder="Enter Password"
                     changeHandler ={handlePasswordChange}
 
                  />
                
                 </View>
                 
               
                    <View style={{width:200,marginLeft:35,height:50}}>
                    <Button 
                        title="Login"
                        color='darkgreen'
                        onPress={handleLogin}
                    />
                    </View>
                 
                 <View style={{flexDirection:'row',justifyContent:'space-between'}}>

                 <TouchableOpacity
                    style={{marginTop:10,height:30,width:150}}
                    onPress={()=>null}
                 >
                   <Text style={{color:'grey',paddingLeft:20,paddingTop:5}}>Forgot password ?</Text>
                 </TouchableOpacity>

                 </View>
               </View>

                
            </View>
        )
    }
 

const styles = StyleSheet.create({
    container:{
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white'

    }
})

const mapStateToProps = ({ user, staff }) => ({
    currentUser: user.currentUser,
    user_role: user.role,
    allS:staff.staff,
    newUsers:user.newUsers
  });
  
  const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user)),
    setStaf: user => dispatch(setStaff(user)),
    setLoggedUser: user => dispatch(setLoggedIn(user)),
    setNewUsers: user => dispatch(setNewUser(user))
   
  });

export default connect(mapStateToProps,mapDispatchToProps)(Login);
