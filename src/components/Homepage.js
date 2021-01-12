import React from 'react'
import {View, SafeAreaView,Text, FlatList, StyleSheet } from 'react-native';

import HeaderBar from '../custom/HeaderBar'
import DrawerHeader from '../custom/DrawerHeader'
import { DrawerActions, useNavigation } from '@react-navigation/native';

import Card from './Card'

const items = [
    {title:'Expenses', icon:'dollar-sign',screen:'AddMember'},
    {title:'Training', icon:'book',screen:'Staff'},
    {title:'Activities', icon:'activity',screen:'Home'},
    {title:'Leaves', icon:'users',screen:'Profile'}
]


const Homepage = () => {
    const navigation = useNavigation()
    return (
        <SafeAreaView style={styles.container}>
           
          
            <View style={styles.cardsection}>
             
                   <FlatList 
                        data={items}
                        numColumns={2}
                        renderItem={({item})=><Card {...item}/>}
                        keyExtractor={item=>item.title}
                        showsVerticalScrollIndicator={false}
                   />   
              
            </View>
            

             
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        width:'100%',
        height:'100%',
    },
    cardsection:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
     }
    
})

export default Homepage
