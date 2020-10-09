// @generated: @expo/next-adapter@2.1.0
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { StateReducer, InitialState, getData } from '../utils';
//import 'react-native-gesture-handler';
import {StateProvider} from "../components/State";
import Main from "../components/Main";


function App(props) {

  const initialState = InitialState(props);
  return (
      <StateProvider initialState={initialState} reducer={StateReducer}>
        <Main {...props} />
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