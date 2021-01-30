import React,{useState} from 'react'
import { View, Text,StyleSheet,Image ,Dimensions, TouchableOpacity} from 'react-native'
import{Entypo} from "@expo/vector-icons"
import {Feather as Icon} from "@expo/vector-icons"
import HeaderBar from '../custom/HeaderBar'
import {connect} from 'react-redux'
import Spinner from 'react-native-loading-spinner-overlay';


const {width,height} = Dimensions.get('window')

const ViewStaff = ({loggedIn,navigation}) => {

  const [loading, setLoading] = useState(false)

  const startSpinner = () =>{
    setLoading(true)
    setTimeout(()=>{
        setLoading(false)
        navigation.navigate('Login')
    },2000)
}

let image = null
const {email, role} = loggedIn;

    return (
        <View style={styles.container}>
            <HeaderBar />
            <Spinner
                    visible={loading}
                    size='large'
                    
            />
            <View style={{width:width,height:75,backgroundColor:'darkblue',justifyContent:'center',paddingLeft:10}}>
                <Text style={{fontSize:21, fontWeight:'bold', color:'white'}}>Profile</Text>
            </View>
           <View style={styles.topsection}>
              {
                  image !==null?(<Image source={require('../../assets/user.png')} style={styles.pic}/>):( <Entypo name="user"  size={130} color="steelblue" />)
              }
        <View>
        <Text style={{marginTop:30,fontWeight:'bold' ,fontSize:15}}>{email}</Text>
        <Text style={{fontSize:15,alignSelf:'center',marginTop:15}}>{role}</Text>
        </View>
           </View>

           <TouchableOpacity 
           onPress={()=>navigation.navigate('New')}
           >
           <View style={{flexDirection:'row', paddingHorizontal:20}}>
              <View style={{width:'25%',height:50,alignItems:'center',justifyContent:'center'}}>
                <Icon name ="user-plus" size={30} />
              </View>
              <View style={{width:'70%',marginLeft:10,height:50,justifyContent:'center',padding:10}}>
                <Text style={{fontSize:15,fontWeight:'bold'}}>Create new user</Text>
              </View>
           </View> 
           </TouchableOpacity>

           <TouchableOpacity 
           onPress={startSpinner}
           >
           <View style={{flexDirection:'row', paddingHorizontal:20}}>
              <View style={{width:'25%',height:50,alignItems:'center',justifyContent:'center'}}>
                <Icon name ="log-out" size={30} />
              </View>
              <View style={{width:'70%',marginLeft:10,height:50,justifyContent:'center',padding:10}}>
                <Text style={{fontSize:15,fontWeight:'bold'}}>Log out</Text>
              </View>
           </View>
           </TouchableOpacity> 
           
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        height:height,
        width:width,
        backgroundColor:'white'
    },
    topsection:{
        flexDirection:'row',
        justifyContent:'space-around',
        width:width,
        height:height/3,
        alignItems:'center',
        padding:20,
        backgroundColor:'#D3C0D4',
        position:'relative'
    },
    pic:{
        width:'35%',
        height:'70%',
        borderRadius:80,
        borderWidth:2,
        borderColor:'grey'
    }

})

const mapStateToProps = ({user})=>({
    loggedIn:user.loggedIn
})

export default connect(mapStateToProps)(ViewStaff) 
