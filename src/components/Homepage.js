import React from 'react'
import {View, SafeAreaView,FlatList, StyleSheet } from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Card from './Card'

const items = [
    {title:'Events', icon:'grid',screen:'Events'},
    {title:'Training', icon:'book',screen:'Training'},
    {title:'Leaves', icon:'users',screen:'Leaves'}
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
