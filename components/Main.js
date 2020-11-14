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
import Privacy from '../screens/Privacy';
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
import { Dimensions, Platform } from 'react-native';
import * as Font from 'expo-font';


function Main(props) {

  const [{ view, isWeb, theme, menuOpen, dimensions, lightbox, lightboxConfig }, dispatch] = useStateValue();
  const [ isScrolled, setIsScrolled ] = useState(false);
  const _isWeb = Platform.OS === 'web';
  console.log('initial render view is', view)
  const styles = StyleSheet.create(getStyles('body', {isWeb}));

  const onChangeScreenSize = ({ set_window, set_screen }) => {
    const get_window = Dimensions.get("window");
    let set_to = {
      width: get_window.width,
      height: get_window.height
    }
    console.log('setting to', set_to)
    if (isWeb && get_window.width !== dimensions.width) {
      dispatch({type: 'setDimensions', value: set_to})
    }
  };

  let fonts = {
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
  };
  if (!process.browser) {
      //await Font.loadAsync(fonts);
  }
  const [ fontsReady, fontsError ] = useFonts(fonts);


  useEffect(() => {
    Dimensions.addEventListener("change", onChangeScreenSize);
    return () => {
      Dimensions.removeEventListener("change", onChangeScreenSize);
    };
  }, []);

  useEffect(() => {
    console.log('view has changed to', view);
    let _theme = 'light';
    if (view && view.length > 1 && view != '/' && view != '') {
      _theme = 'light'
    } else {
      _theme = 'dark'
    }
    if (theme !== _theme) {
      console.log('theme', theme)
      dispatch({type: 'setTheme', value: theme})
    }
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

  if (!isWeb || !process.browser) {
    if (!fontsReady) {
      return ( <Text>Loading...</Text> )
    }
  }

  function renderContent(props) {
      return (
          view === '/about' ? <About {...props} />
          : view === '/updates' ? <Updates {...props} />
          : view === '/privacy' ? <Privacy {...props} />
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
      <View style={isWeb ? {minHeight: '100vh', flex: 1}: {flex: 1}}>
          {lightbox && lightboxConfig.images ? (
            <React.Fragment>
              <ImageGallery images={lightboxConfig.images} firstIndex={lightboxConfig.index} />
              {isWeb && <style
                dangerouslySetInnerHTML={{
                  __html: `#chat-widget-container {
                    z-index: 5 !important;
                    display: none !important
                  }`
              }} />}
            </React.Fragment>
          ) : menuOpen ? (
            <Menu />
          ) : (
            <React.Fragment>
              {!lightbox && isWeb && <Nav isScrolled={isScrolled} theme={theme} />}{/* want nav on top for semantic html i guess*/}
              { isWeb ? (
                  <View style={styles.body}>
                    {renderContent(props)}
                  </View>
                 ) : (
                  <ScrollView style={styles.body} onScroll={(e) => {
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
              {!lightbox && !isWeb && <Nav isScrolled={isScrolled} theme={theme} />}{/* makes it clickable to be last render on android*/}

            </React.Fragment>
          )}
      </View>
  );
}


export default Main;