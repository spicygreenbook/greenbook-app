// @generated: @expo/next-adapter@2.1.0
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
//import { setGlobals } from '../utils';

import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Home from '../screens/Home';
import About from '../screens/About';
import {useStateValue} from "../components/State";
import { useFonts } from 'expo-font';
import { getStyles, getImage } from '../utils';
import { Dimensions } from 'react-native';


function Main(props) {

  const [{ view, isWeb, theme }, dispatch] = useStateValue();
  const [ isScrolled, setIsScrolled ] = useState({});

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
      'ApercuLight': {
          uri: require('../public/fonts/ApercuLight.ttf'),
          display: 'fallback',
      },
      'KnockoutBold': {
          uri: require('../public/fonts/Knockout_HTF71-FullMiddlewt_Regular.otf'),
          display: 'fallback',
      },
      'KnockoutWelterWeight': {
          uri: require('../public/fonts/Knockout_HTF50-Welterweight_Regular.otf'),
          display: 'fallback',
      },
      'KnockoutFeatherWeight': {
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

  function scrollEventListener() {
    if (window && document) {
        let y = document.body.scrollTop || document.documentElement.scrollTop;
        if (!isScrolled && y > 0) {
          setIsScrolled(true);
        } else if (isScrolled && y < 1) {
          setIsScrolled(false);
        }
    }
  }

  if (isWeb) {
    useEffect(() => {
      window.addEventListener('scroll', scrollEventListener, false)
      return () => {
        window.removeEventListener('scroll', scrollEventListener, false)
      }
    })
  }

  if (!fontsReady) {
    return ( <Text>Loading...</Text> )
  }

  return (
      <View>
          <Nav isScrolled={isScrolled} theme={theme} />
          <ScrollView style={styles.body} onScroll={(e) => {
            console.log(e);
            console.log(e.nativeEvent.contentOffset.y)
            if (!isScrolled && e.nativeEvent.contentOffset.y > 0) {
              setIsScrolled(true);
            } else if (isScrolled && e.nativeEvent.contentOffset.y < 1) {
              setIsScrolled(false);
            }
          }} scrollEventThrottle={16}>
            { view === '/about' ? 
              <About {...props} />
              :
              <Home {...props} />
            }
          </ScrollView>
          <Footer theme={theme} />
      </View>
  );
}


export default Main;