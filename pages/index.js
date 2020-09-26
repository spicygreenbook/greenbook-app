// @generated: @expo/next-adapter@2.1.0
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { StateReducer, getData } from '../utils';
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

export async function getStaticProps(context) {

    let listings = await getData({
      type: 'listing'
    });
    let press = await getData({type: 'press'})
    let updates = await getData({type: 'updates'})

    return {
        props: {
            listings: listings.sort((a, b) => {
                if (a.updated < b.updated) {
                    return 1;
                }
                if (a.updated > b.updated) {
                    return -1;
                }
                return 0;
            }).slice(0,10),
            press: press,
            updates: updates
        },
    };
}

export default App;