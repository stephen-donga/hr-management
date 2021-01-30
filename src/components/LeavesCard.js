import React from 'react'
import {Entypo} from '@expo/vector-icons'
import { View, Text, StyleSheet,Image, TouchableOpacity} from 'react-native'
import { StackActions, useNavigation } from '@react-navigation/native'
import {connect} from 'react-redux'

const LeavesCard = ({id,type,start_date,reason,end_date,staff_id,staff}) => {

    let returnedStaff = staff.filter(one =>one.id===staff_id)
    let member = returnedStaff[0]
    let lId = id

    const navigation = useNavigation()
    return (
        <TouchableOpacity onPress={()=>navigation.dispatch(StackActions.push('LeaveDetails',{member,lId,type,start_date,reason,end_date,staff}))}>
        <View style={styles.container}>
             <View style={styles.leftsection}>
                    {
                        member.image ?<Image source={{uri:member.image}} style={{width:100,height:100,borderRadius:100}} /> :<Entypo name="user" color='steelblue' size={80} />
                    }
             </View>
             <View style={styles.rightsection}>
                 <View style={{...StyleSheet.absoluteFillObject,backgroundColor:'dodgerblue'}}/>
                <View style={styles.left}>
                   {
                       member ? ( <Text style={{alignSelf:'center',fontSize:17,fontWeight:'bold',marginBottom:15}}> {member.first_name}{" "}{member.last_name}</Text>):null
                   }
                    <View style={styles.row}>
                        {
                            member ?(<Text style={styles.title}>{type}</Text>):null
                        }
                    </View>

                    

                    {
                        member ?(
                        <View style={styles.row}>
                            <Text style={styles.title}>{start_date}{" "}</Text>
                            <Text style={styles.title}>to{"  "}{end_date}</Text>
                        </View>):null
                    }

                </View>
             </View>
        </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:120,
        flexDirection:'row',
        marginBottom:10
    },
    leftsection:{
        width:"35%",
        height:'100%',
        backgroundColor:'dodgerblue',
        alignItems:'center',
        justifyContent:'center'
    },
    rightsection:{
        width:'65%',
        height:'100%',
    },
    left:{
        height:'95%',
        width:'100%',
        backgroundColor:'white',
        borderTopLeftRadius:35,
        marginTop:5,
        padding:5
    },
    label:{
        fontSize:15,
        color:'darkblue'
    },
    label1:{
        fontSize:15,
        color:'darkblue',
        marginLeft:80
    },
    title:{
        marginLeft:5,
        fontSize:15,
        color:'grey',
    },
    row:{
        flexDirection:'row',
        marginBottom:3,
        marginLeft:15,
    }
})

const mapStateToProps = ({staff})=>({
    staff: staff.staff
})

export default connect(mapStateToProps)(LeavesCard)
