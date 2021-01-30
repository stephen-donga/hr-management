import 'react-native-gesture-handler';
import React from 'react'
import { Provider } from "react-redux";
import { store } from "./src/redux/index";
import { ModalPortal } from 'react-native-modals';


import MainScreen from './src/components/MainScreen'

export default function App() {
 
   return (
     
     <Provider store={store}>
         <MainScreen />
          <ModalPortal />
     </Provider>
  );
}
 