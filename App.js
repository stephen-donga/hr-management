import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text,Dimensions, View } from 'react-native';
import {NavigationContainer} from "@react-navigation/native"

import StackNavigation from "./src/navigation/StackNavigation"

const {width,height} =Dimensions.get("window")

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <NavigationContainer>

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
