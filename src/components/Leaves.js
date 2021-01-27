import React from 'react'
import { View, StyleSheet,Text,Dimensions,FlatList } from 'react-native'
import {connect} from 'react-redux'

import HeaderBar from '../custom/HeaderBar'
import LeavesCard from '../components/LeavesCard'


const {width, height} = Dimensions.get('window')
const Leaves = ({leaves}) => {
     
    return (
        <View style={styles.container}>
            <HeaderBar />
            <View style={{width:width,height:40,backgroundColor:'#eee',padding:10,paddingLeft:15,paddingTop:10}}>
                <Text style={styles.title}>All members on Leave</Text>
            </View>
             <View style={styles.details}>
                  <FlatList
                    data={leaves}
                    renderItem={({item})=> <LeavesCard {...item}/>}
                    keyExtractor={member =>member.id.toString()}
                    showsVerticalScrollIndicator={false}
                  />
             </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:width,
        height:height,
        backgroundColor:'#ccc'
    },
    details:{
        flex:1,
        padding:10
    },
    title:{
        fontSize:18,
        fontWeight:'bold',
        alignSelf:'center',
        color:'darkblue'
    }
})

const mapStateToProps = ({leaves})=>({
    leaves:leaves.leaves
})

export default connect(mapStateToProps)(Leaves)
