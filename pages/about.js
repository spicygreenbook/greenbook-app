// @generated: @expo/next-adapter@2.1.0
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { StateReducer, InitialState, getContent } from '../utils';
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
    let content = await getContent({type: 'content', uid: 'about', ref_id: context.preview || ''});
    return {
        props: {content: content && content.content || {}}
    };
}

export default App;