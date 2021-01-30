import React from 'react'
import { View, Text,StyleSheet,Image ,Dimensions, TouchableOpacity} from 'react-native'
import{Entypo} from "@expo/vector-icons"
import {Feather as Icon} from "@expo/vector-icons"
import HeaderBar from '../custom/HeaderBar'
import {connect} from 'react-redux'

const {width,height} = Dimensions.get('window')

const UserDetail = ({users,route,navigation}) => {

let image = null
const {email} = route.params;
const user = users.filter(user =>user.email!='root@gmail.com'&&user.email===email)
const selected = user[0]
    return (
        <View style={styles.container}>
            <HeaderBar />
            <View style={{width:width,height:75,backgroundColor:'darkblue',justifyContent:'center',paddingLeft:10}}>
                <Text style={{fontSize:21, fontWeight:'bold', color:'white'}}>Profile</Text>
            </View>
           <View style={styles.topsection}>
              {
                  image !==null?(<Image source={require('../../assets/user.png')} style={styles.pic}/>):( <Entypo name="user"  size={130} color="steelblue" />)
              }
        <View>
        <Text style={{marginTop:30,fontWeight:'bold' ,fontSize:21}}>{selected.first_name}{"  "}{selected.last_name}</Text>
        <Text style={{fontSize:18, marginTop:10}}>Role:{"  "}{selected.role.toUpperCase()}</Text>
        </View>
           </View>
           <Text style={{alignSelf:'center',marginTop:20,fontSize:21}}>{selected.email}</Text>
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
        backgroundColor:'#eee',
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
    loggedIn:user.loggedIn,
    users:user.user
})

export default connect(mapStateToProps)(UserDetail) 
