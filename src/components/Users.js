import React from 'react'
import { View, Text,FlatList, StyleSheet } from 'react-native'
import {connect} from 'react-redux'

import HeaderBar from '../custom/HeaderBar'
import UserCard from './UserCardz'

const Users = ({users}) => {
    return (
        <View style={styles.container}>
            <HeaderBar />
            <View style={styles.header}>
                <Text style={styles.text}>All Users</Text>
            </View>
             <View style={styles.section}>
                 <FlatList 
                    data={users}
                    keyExtractor={member =>member.email.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item})=><UserCard {...item} />}
                 />
                 
             </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    section:{
        width:'100%',
        height:'100%',
        padding:10
    },
    header:{
        width:'100%',
        height:50,
        backgroundColor:'royalblue',
        justifyContent:'center',
        paddingHorizontal:15
    },
    text:{
        fontSize:21,
        fontWeight:'bold',
        color:'white'
    }


})

const mapStateToProps = ({user}) =>({
    users : user.user
})

export default connect(mapStateToProps)(Users)
