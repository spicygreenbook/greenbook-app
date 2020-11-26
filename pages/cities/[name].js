// @generated: @expo/next-adapter@2.1.0
import React, { useState, useEffect } from 'react';
//import { StyleSheet, Text, View, Platform } from 'react-native';
import { StateReducer, InitialState, getData, getListingsByState, statesObjRev } from '../../utils';
//import 'react-native-gesture-handler';
import {StateProvider} from "../../components/State";
import Main from "../../components/Main";
import Head from "next/head";


function App(props) {

  const initialState = InitialState(props);
  return (
      <StateProvider initialState={initialState} reducer={StateReducer}>
        <Head>
            <title>Find Black-Owned Buiness In {props.city}, {props.state} - Spicy Green Book</title>
            <meta name="description" content={`Browse or search for black-owned businesses ${props.city}, ${props.state}`} key="description" />
            <meta property="og:title" content={`Find Black-Owned Buiness In ${props.city}, ${props.state}`} key="title" />
            <meta property="og:url" content={"https://spicygreenbook.org/search"} key="og:url" />
        </Head>
        <Main {...props} />
      </StateProvider>
  );
}


function urlSafe(str) {
    return (str || '').toString().toLowerCase().replace(/[^a-z0-9\-\.]/gi, '-').replace(/\-\-/g, '-').replace(/\-\-/g, '-').replace(/\-$/, '');
};

export async function getStaticPaths() {

    let listings = await getData({
      type: 'listing'
    });
    let items = [];

    const listingsByState = getListingsByState(listings);
    Object.keys(listingsByState).filter(_state => {
        return statesObjRev[_state];
    }).forEach(_state => {
        let state = listingsByState[_state];
        Object.keys(state)
        .filter(key => {return key.indexOf('_') !== 0}).forEach(city => {
            if (state[city]._name) {
                items.push({
                    path: urlSafe(state[city]._name + ' ' + statesObjRev[_state]),
                    city: state[city]._name,
                    state: statesObjRev[_state].toUpperCase()
                })
            }
        })
    })
    //console.log('by state', listingsByState);
    console.log('teims', items)
    return {
        paths: items.map((item) => {
            //console.log('piz', biz)
            return {
                params: { name: item.path, city: item.city, state: item.state },
            };
        }),
        fallback: false,
    };
}

export async function getStaticProps(context) {
    console.log('context', context.params)

    let listings = await getData({
      type: 'listing'
    });
    let itemsByPath = [];

    const listingsByState = getListingsByState(listings);
    Object.keys(listingsByState).filter(_state => {
        return statesObjRev[_state];
    }).forEach(_state => {
        let state = listingsByState[_state];
        Object.keys(state)
        .filter(key => {return key.indexOf('_') !== 0}).forEach(city => {
            if (state[city]._name) {
                let path = urlSafe(state[city]._name + ' ' + statesObjRev[_state]);
                itemsByPath[path] = {
                    path: path,
                    city: state[city]._name,
                    state: statesObjRev[_state].toUpperCase()
                }
            }
        })
    })
    let data = itemsByPath[context.params.name];
    console.log('data', data)
    return {
        props: {
            url: '/cities/' + data.path,
            city: data.city || '',
            state: data.state || ''
        }
    };
}

export default App;