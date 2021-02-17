// @generated: @expo/next-adapter@2.1.0
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { StateReducer, InitialState, getContent } from '../utils';

import {StateProvider} from "../components/State";
import Main from "../components/Main";
import Head from "next/head";


function App(props) {

  const { content } = props;

  const initialState = InitialState(props);

  return (
      <StateProvider initialState={initialState} reducer={StateReducer}>
        <Head>
            <title>Shop - Spicy Green Book</title>
                <meta
                name="description"
                content={"Shop our online store for SGB branded products. Help support us!"}
                key="description"
                />
            <meta
            name="og:description"
            content={"Shop our online store for SGB branded products. Help support us!"}
            key="og:description"
            />

            <meta property="og:title" content={"Shop - Spicy Green Book"} key="title" />
            <meta property="og:url" content={"https://spicygreenbook.org/shop"} key="og:url" />
        </Head>
        <Main {...props} />
      </StateProvider>
  );
}

export async function getStaticProps(context) {
    //let content = await getContent({type: 'content', uid: 'contact', ref_id: context.preview || ''});
    return {
        props: {content: {title: 'Merch'}, url: '/shop'}
    };
}

export default App;