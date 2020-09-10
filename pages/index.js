// @generated: @expo/next-adapter@2.1.0
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
//import { setGlobals } from '../utils';
import 'react-native-gesture-handler';

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
  
  const reducer = (state, action) => {
    console.log('state', state, 'action', action)
    switch (action.type) {
      case 'setView':
        console.log('set view called', action)
        return {
          ...state,
          view: action.view
        };
      case 'fontsReady':
        return {
          ...state,
          fontsReady: action.value
        };
      case 'setDimensions':
        return {
          ...state,
          dimensions: action.value
        };
      case 'setTheme':
        return {
          ...state,
          theme: action.value
        };
        
      default:
        return state;
    }
  };
  

  return (
      <StateProvider initialState={initialState} reducer={reducer}>
        <Main />
      </StateProvider>
  );
}

export default App;