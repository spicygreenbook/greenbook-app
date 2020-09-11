// @generated: @expo/next-adapter@2.1.0
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { StateReducer } from '../utils';
//import 'react-native-gesture-handler';
import {StateProvider} from "../components/State";
import Main from "../components/Main";
import { Dimensions } from 'react-native';


function App(props) {

  const isWeb = Platform.OS === 'web';
  let url = '';
  let get_vew = '/';
  if (isWeb && typeof window !== 'undefined') {
      url = window.location.href;
      if (window.location.pathname.length > 1) {
          get_vew = window.location.pathname.split('?')[0]
      }
  }

  const initialState = {
    view: get_vew,
    isWeb: isWeb,
    url: url,
    fontsReady: false,
    dimensions: {
        window: Dimensions.get("window"),
        screen: Dimensions.get("screen")
    }
  };
  
  

  return (
      <StateProvider initialState={initialState} reducer={StateReducer}>
        <Main />
      </StateProvider>
  );
}

export default App;