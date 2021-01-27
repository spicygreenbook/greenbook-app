// @generated: @expo/next-adapter@2.1.0
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { StateReducer, InitialState, getData } from '../utils';

import {StateProvider} from "../components/State";
import Main from "../components/Main";
import Head from "next/head";


function App(props) {

  const initialState = InitialState(props);
  return (
      <StateProvider initialState={initialState} reducer={StateReducer}>
        <Head>
            <title>Spicy Green Book</title>
            <meta
              name="description"
              content="Spicy Green Book is a team of volunteers committed to help compile a directory of black owned businesses"
              key="description"
            />
            <meta name="og:description"
              content="Spicy Green Book is a team of volunteers committed to help compile a directory of black owned businesses"
              key="og:description"
            />
            <meta property="og:title" content={"Spicy Green Book"} key="title" />
            <meta property="og:url" content={"https://spicygreenbook.org/"} key="og:url" />
        </Head>
        <Main {...props} />
      </StateProvider>
  );
}

export async function getStaticProps(context) {

    let listings = await getData({type: 'listing'});
    let press = await getData({type: 'press'});
    let updates = await getData({type: 'updates'});
    let testimonials = await getData({type: 'testimonial'});

    return {
        props: {
            listings,
            press,
            updates,
            testimonials,
            url: '/'
        },
    };
}

export default App;