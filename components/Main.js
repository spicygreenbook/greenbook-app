// @generated: @expo/next-adapter@2.1.0
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';

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
import { useStateValue } from "../components/State";
import { getStyles, getImage } from '../utils';
import { Dimensions, Platform } from 'react-native';

function Main(props) {

  const [{ view, isWeb, theme, menuOpen, dimensions, lightbox, lightboxConfig }, dispatch] = useStateValue();
  const [isScrolled, setIsScrolled] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0);

  /* debug purposes figureing out dispatches causing rerender  
    useEffect(() => {
      console.log('dispatches')
      console.log(view, isWeb, theme, menuOpen, dimensions, lightbox, lightboxConfig);
    }, [view, isWeb, theme, menuOpen, dimensions, lightbox, lightboxConfig]);
  */
  const styles = StyleSheet.create(getStyles('body', { isWeb }));

  const onChangeScreenSize = ({ set_window, set_screen }) => {
    const get_window = Dimensions.get("window");
    let set_to = {
      width: get_window.width,
      height: get_window.height
    }
    console.log('setting to', set_to)
    if (isWeb && get_window.width !== dimensions.width) {
      dispatch({ type: 'setDimensions', value: set_to })
    }
  };

  useEffect(() => {
    Dimensions.addEventListener("change", onChangeScreenSize);
    return () => {
      Dimensions.removeEventListener("change", onChangeScreenSize);
    };
  }, []);

  useEffect(() => {
    let _theme = 'light';
    if (view && view.length > 1 && view != '/' && view != '') {
      _theme = 'light'
    } else {
      _theme = 'dark'
    }
    if (theme !== _theme) {
      console.log('view has changed to', view);
      console.log('theme changed to', _theme)
      dispatch({ type: 'setTheme', value: _theme })
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
        setForceUpdate(forceUpdate + 1);
        window.addEventListener('scroll', scrollEventListener, false)

      return () => {
        window.removeEventListener('scroll', scrollEventListener, false)
      }
    }, []);
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
                          : view === '/search' || view.indexOf('/cities') > -1 ? <List {...props} />
                            : view.indexOf('/biz') === 0 ? <Listing {...props} />
                              : view === '/' ? <Home {...props} />
                                : <NotFound {...props} />
    )
  }

  return (
    <View key={forceUpdate} style={isWeb ? { position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, flex: 1 } : { flex: 1 }}>
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
  )
}


export default Main;