import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { StyleSheet,Dimensions, View } from 'react-native';
import {NavigationContainer} from "@react-navigation/native"

import StackNavigation from "../navigation/StackNavigation"

const {width,height} =Dimensions.get("window")

 function MainScreen() {

 
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

export default MainScreen;