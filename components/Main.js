// @generated: @expo/next-adapter@2.1.0
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
//import { setGlobals } from '../utils';

import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Home from '../screens/Home';
import About from '../screens/About';
import AddListing from '../screens/AddListing';
import Volunteer from '../screens/Volunteer';
import Contact from '../screens/Contact';
import Process from '../screens/Process';
import Updates from '../screens/Updates';
import Press from '../screens/Press';
import Team from '../screens/Team';
import Donate from '../screens/Donate';
import NotFound from '../screens/NotFound';
import List from '../screens/List';
import Listing from '../screens/Listing';
import Menu from '../components/Menu';
import ImageGallery from '../components/ImageGallery';
import {useStateValue} from "../components/State";
import { useFonts } from 'expo-font';
import { getStyles, getImage } from '../utils';
import { Dimensions } from 'react-native';


function Main(props) {

  const [{ view, isWeb, theme, menuOpen, lightbox, lightboxConfig }, dispatch] = useStateValue();
  const [ isScrolled, setIsScrolled ] = useState(false);

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
    console.log('theme', theme)
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

  function renderContent(props) {
      return (
          view === '/about' ? <About {...props} />
          : view === '/updates' ? <Updates {...props} />
          : view === '/press' ? <Press {...props} />
          : view === '/team' ? <Team {...props} />
          : view === '/process' ? <Process {...props} />
          : view === '/contact' ? <Contact {...props} />
          : view === '/add' ? <AddListing {...props} />
          : view === '/volunteer' ? <Volunteer {...props} />
          : view === '/donate' ? <Donate {...props} />
          : view === '/search' ? <List {...props} />
          : view.indexOf('/biz') === 0 ? <Listing {...props} />
          : view === '/' ? <Home {...props} />
          : <NotFound {...props} />
      )
  }

  return (
      <View>
          {lightbox && lightboxConfig.images ? (
            <ImageGallery images={lightboxConfig.images} />
          ) : menuOpen ? (
            <Menu />
          ) : (
            <React.Fragment>
              {!lightbox && <Nav isScrolled={isScrolled} theme={theme} />}
              
              { isWeb ? (
                  <View style={styles.body}>
                    {renderContent(props)}
                  </View>
                 ) : (
                  <ScrollView style={styles.body} onScroll={(e) => {
                    console.log(e);
                    console.log(e.nativeEvent.contentOffset.y)
                    if (!isScrolled && e.nativeEvent.contentOffset.y > 0) {
                      setIsScrolled(true);
                    } else if (isScrolled && e.nativeEvent.contentOffset.y < 1) {
                      setIsScrolled(false);
                    }
                  }} scrollEventThrottle={16}>
                    {renderContent(props)}
                    {!isWeb && <Footer theme={theme} />}
                  </ScrollView>
                 )}
              {isWeb && <Footer theme={theme} />}
            </React.Fragment>
          )}
      </View>
  );
}


export default Main;