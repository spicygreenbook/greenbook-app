import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { StateReducer, InitialState, getContent, getData } from '../utils';

import {StateProvider} from "../components/State";
import Main from "../components/Main";
import Head from "next/head";

import Map from "../components/Map";
import { useRouter } from 'next/router'

function App(props) {

  const router = useRouter()
  const { content } = props;
  let infostr = '';
  if (typeof window !== 'undefined') {
    infostr = (window.location.search || '').split('?info=')[1];
  }
  const initialState = InitialState(props);

  let info = {
    name: 'not found',
    geocoordinates: '0,0',
    address: ''
  };
  if (infostr) {
      try {
        info = JSON.parse(decodeURIComponent(infostr));
        console.log('info', info);
      } catch(e) {
        console.log('failed', e)
      }
    }

  return (
      <StateProvider initialState={initialState} reducer={StateReducer}>
        <Head>
            <title>Map Component | Spicy Green Book</title>
            <meta name="robots" content="noindex" />
        </Head>
        <Map list={[info]} single mode="d"/>
      </StateProvider>
  );
}

export default App;