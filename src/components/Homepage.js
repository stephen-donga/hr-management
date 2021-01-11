import React from 'react'
import {View, SafeAreaView,Text, FlatList, StyleSheet } from 'react-native';

import HeaderBar from '../custom/HeaderBar'
import DrawerHeader from '../custom/DrawerHeader'
import { DrawerActions, useNavigation } from '@react-navigation/native';

import Card from './Card'

const items = [
    {title:'Add Staff', icon:'user-plus',screen:'AddMember'},
    {title:'Search', icon:'search',screen:'Staff'},
    {title:'Add User', icon:'users',screen:'Home'},
    {title:'My Details', icon:'user',screen:'Profile'}
]


const Homepage = () => {
    const navigation = useNavigation()
    return (
        <SafeAreaView style={styles.container}>
            <HeaderBar />
            <DrawerHeader 
             toggler={()=>navigation.dispatch(DrawerActions.openDrawer())}
            
             lastIcon='user-check'
            
            />
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
        marginTop:20,
        alignItems:'center',
        justifyContent:'center'
     }
    
})

export default Homepage
