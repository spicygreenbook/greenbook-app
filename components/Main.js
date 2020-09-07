// @generated: @expo/next-adapter@2.1.0
import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView } from 'react-native';
//import { setGlobals } from '../utils';

import Nav from '../components/Nav';
import Home from '../screens/Home';
import About from '../screens/About';
import {useStateValue} from "../components/State";

function Main(props) {

    const [{ view, fontsReady, isWeb }, dispatch] = useStateValue();

    if (!isWeb) {
        loadAsync({
            'KnockoutBold': {
                uri: require('../public/fonts/Knockout_HTF71-FullMiddlewt_Regular.otf'),
                fontDisplay: FontDisplay.FALLBACK,
            },
        }).then(loaded => {
            dispatch({type: 'fontsReady', value: true})
        }).catch(err => {
            console.error(err);
        });
    }

  useEffect(() => {
    console.log('view has changed to', view);
  }, [view])

  return (
        <View>
            <View>
              <Nav />
            </View>
            <ScrollView>
              <Text>View is {view}</Text>
              { view === '/about' ? 
                <About {...props} />
                :
                <Home {...props} />
              }
            </ScrollView>
        </View>
  );
}


export default Main;