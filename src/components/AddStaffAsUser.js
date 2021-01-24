import React,{useState} from 'react'
import { View,ScrollView, Text,StyleSheet,Dimensions,TouchableOpacity } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';


// custom imports
import HeaderBar from '../custom/HeaderBar'
import Input from '../custom/Inputs'
import db from '../utils/database'

const {width, height} = Dimensions.get('window');
const NewUser = ({route,navigation}) => {

    const {id} = route.params;

   const [items,setItems] = useState([
       
       {label: 'Admin', value: 'admin' },
       {label: 'Tech lead', value: 'lead' },
   ])
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [confirmPassword, setConfirmPassword] = useState("")
   const [filterBy, setFilterBy]= useState('admin')
    let controller

    const handleEmailChange =(e)=>{
       setEmail(e)
    } 
    const handlePsswordChange = (text)=>{
            setPassword(text)
    }
    const handleConfirmPassword = (text) =>{
        setConfirmPassword(text)
    }

    const handleSubmit =()=>{
        db.transaction(tx => {
            tx.executeSql('INSERT INTO users (email,role,user_id,password) values (?,?,?,?)', 
            [email,filterBy,id,password],
              (txObj,resultSet) =>console.log(resultSet.rowsAffected),
              (txObj, error) => console.log('Error', error))
          });
    }

    return (
        <View styles={styles.conatiner}>
            <HeaderBar />
            <View style={styles.headerview}>
                <Text style={styles.heading1}>Create User</Text>
            </View>
            <View style={styles.form}>
                <View style={{...StyleSheet.absoluteFillObject,backgroundColor:'teal'}} />
                <View style={styles.overlay}>
                   <Text style={styles.heading}>Enroll staff as User</Text>
                   <ScrollView 
                   showsVerticalScrollIndicator={false}
                   style={styles.formarea}>
                       
                        <Input
                            label="Email" 
                            value={email}
                            changeHandler={handleEmailChange}
                            />
                        <Text style={styles.title}>Role</Text>
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
                            changeHandler={handlePsswordChange}
                       />
                        <Input
                            label="Confirm password"
                            textEntry={true} 
                            value={confirmPassword}
                            changeHandler={handleConfirmPassword}
                       />

                   </ScrollView>
                </View>
            </View>
            <View style={styles.buttonsection}>
                <TouchableOpacity 
                onPress={()=>{
                    handleSubmit
                    navigation.navigate('Home')
                }}
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
        width:'80%',
        height:'90%',
        alignSelf:'center',
        backgroundColor:'whitesmoke',
        borderRadius:15,
        alignItems:'center',
        marginTop:30,
        paddingTop:25
    },
    formarea:{
        width:'95%',
        height:'80%',
        padding:10,
        marginBottom:15
    },
    heading:{
        fontSize:16,
        fontWeight:'bold',
        color:'darkblue',
        marginTop:15,
        marginBottom:30
    },
    heading1:{
        fontSize:22,
        fontWeight:'bold',
        color:'white',
        marginTop:15,
        marginBottom:15
    },
    button:{
        width:width/2,
        height:40,
        backgroundColor:'whitesmoke',
        alignSelf:'center',
        marginTop:30,
        borderRadius:15,
        alignItems:'center',
        justifyContent:'center'
    },
    headerview:{
        width:'100%',
        height:50,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#2C7E84'
    },
    title:{
        fontSize:17,
        color:'teal'
    }
})

export default NewUser
