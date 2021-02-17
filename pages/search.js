// @generated: @expo/next-adapter@2.1.0
import React, { useState, useEffect } from 'react';
//import { StyleSheet, Text, View, Platform } from 'react-native';
import { StateReducer, InitialState, getData } from '../utils';

import {StateProvider} from "../components/State";
import Main from "../components/Main";
import Head from "next/head";


function App(props) {

  const initialState = InitialState(props);
  return (
      <StateProvider initialState={initialState} reducer={StateReducer}>
        <Head>
            <title>Browse and Search Our List - Spicy Green Book</title>
            <meta name="description" content="Browse or search for black-owned businesses in your area." key="description" />
            <meta property="og:title" content={"Browse and Search Our List - Spicy Green Book"} key="title" />
            <meta property="og:url" content={"https://spicygreenbook.org/search"} key="og:url" />
        </Head>
        <Main {...props} />
      </StateProvider>
  );
}

export async function getStaticProps(context) {
    let listings = await getData({
      type: 'listing'
    });
    return {
        props: {listings: listings, url: '/search'}
    };
}

export default App;