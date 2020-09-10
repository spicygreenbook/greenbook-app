// @generated: @expo/next-adapter@2.1.0
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
//import { setGlobals } from '../utils';

import Nav from '../components/Nav';
import Home from '../screens/Home';
import About from '../screens/About';
import {useStateValue} from "../components/State";
import { useFonts } from 'expo-font';
import { getStyles, getImage } from '../utils';
import { Dimensions } from 'react-native';


function Main(props) {

  const [{ view, isWeb, theme }, dispatch] = useStateValue();

  const styles = StyleSheet.create(getStyles('body', {isWeb}));

  const onChangeScreenSize = ({ set_window, set_screen }) => {
    const get_window = Dimensions.get("window");
    const get_screen = Dimensions.get("screen");
    let set_to = {
      window: get_window,
      screen: get_screen
    }
    console.log('setting to', set_to)
    dispatch({type: 'setDimensions', value: set_to})
  };

  const [ fontsReady, fontsError ] = useFonts({
      'ApercuMedium': {
          uri: require('../public/fonts/ApercuRegular.ttf'),
          display: 'fallback',
      },
      'KnockoutBold': {
          uri: require('../public/fonts/Knockout_HTF71-FullMiddlewt_Regular.otf'),
          display: 'fallback',
      },
      'KnockoutNOTSURE1': {
          uri: require('../public/fonts/Knockout_HTF50-Welterweight_Regular.otf'),
          display: 'fallback',
      },
      'KnockoutNOTSURE2': {
          uri: require('../public/fonts/Knockout_HTF48-Featherweight_Regular.otf'),
          display: 'fallback',
      }
  });

  useEffect(() => {
    Dimensions.addEventListener("change", onChangeScreenSize);
    return () => {
      Dimensions.removeEventListener("change", onChangeScreenSize);
    };
  });

  useEffect(() => {
    console.log('view has changed to', view);
    let theme = 'light';
    if (view && view.length > 1 && view != '/' && view != '') {
      theme = 'light'
    } else {
      theme = 'dark'
    }
    dispatch({type: 'setTheme', value: theme})
  }, [view])

  if (!fontsReady) {
    return ( <Text>Loading...</Text> )
  }

  return (
      <View>
          <Nav theme={theme} />
          <ScrollView style={styles.body}>
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