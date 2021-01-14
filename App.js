import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { StyleSheet, Text,Dimensions, View } from 'react-native';
import {NavigationContainer} from "@react-navigation/native"

import StackNavigation from "./src/navigation/StackNavigation"

const {width,height} =Dimensions.get("window")

export default function App() {

  const [data,setData] = useState([])
 
  useEffect(() => {
      
   
    return () => {
    }
  }, [])

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
