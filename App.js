import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { StyleSheet, Text,Dimensions, View } from 'react-native';
import {NavigationContainer} from "@react-navigation/native"
import * as SqlLite from "expo-sqlite"

import StackNavigation from "./src/navigation/StackNavigation"

const {width,height} =Dimensions.get("window")

export default function App() {

  const [data,setData] = useState([])

  const setDatabase = ()=>{

  const db =  SqlLite.openDatabase('testDb');
  //   db.transaction(tx =>{
  //     tx.executeSql('CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, text Text, number INT)'
  //     )
  // });

  // db.transaction(tx=>{
  //   tx.executeSql('INSERT INTO items(text,number) values (?,?)',['edonga',21],
  //   (txObj,resultSet)=>setData(data.concat({id:resultSet.insertId,text:'edonga',number:21})),
  //   (txObj,error)=>console.log('error',error))
  // })


  db.transaction(tx=>{
    tx.executeSql('SELECT * FROM items',null,(txObj,{rows:{_array}})=>setData(_array),(txObj,error)=>console.warn(error))
  })
  }

  

  useEffect(() => {
    setDatabase();
   
    return () => {
      cleanup
    }
  }, [ ])
  console.log(data)
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width:width,
    height:height
  },
});
