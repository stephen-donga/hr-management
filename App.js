import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet, Text,Dimensions, View } from 'react-native';
import {NavigationContainer} from "@react-navigation/native"
import * as SqlLite from "expo-sqlite"

import StackNavigation from "./src/navigation/StackNavigation"

const {width,height} =Dimensions.get("window")

export default function App() {

  const [data,setData] = useState([])

  const db =  SqlLite.openDatabase('testDb');
  db.transaction(tx =>{
    tx.executeSql(
        'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, text Text, number INT)'
    )
});

  const fetchData=() => {
    db.transaction(tx => {
      // sending 4 arguments in executeSql
      tx.executeSql('SELECT * FROM items', null, // passing sql query and parameters:null
        // success callback which sends two things Transaction object and ResultSet Object
        (txObj, { rows: { _array } }) =>  setData(_array),
        // failure callback which sends two things Transaction object and Error
        (txObj, error) => console.log(error)
        ) // end executeSQL
    }) // end transaction
  }
  fetchData();
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
