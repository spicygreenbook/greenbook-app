// @generated: @expo/next-adapter@2.1.0
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
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
import { getStyles, Theme } from '../utils';
import { debounce} from 'lodash/fp';

function Main(props) {

  const [{ view, isWeb, theme, menuOpen, lightbox, lightboxConfig }, dispatch] = useStateValue();
  const [isFrontEnd, setIsFrontEnd] = useState(false);

  const styles = StyleSheet.create(getStyles('body'));

  // This will ensure dimensions is defined in the frontend
  useEffect(() => {
    setIsFrontEnd(true);
  }, []);

  function onChangeScreenSize() {
    dispatch({ type: 'setDimensions', value: {
      width: Dimensions.get("window").width,
      height: Dimensions.get("screen").height
    } })
  };

  useEffect(() => {
    const fn = debounce(300, onChangeScreenSize)
    Dimensions.addEventListener("change", fn, false);
 
    return () => Dimensions.removeEventListener("change", fn, false);
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

  return !isFrontEnd 
    ? <View style={{marginTop: 200, marginBottom: 200}}>
        <ActivityIndicator color={Theme.green} size="large" />
      </View>
    : <View style={isWeb ? { position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, flex: 1 } : { flex: 1 }}>
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
        ) : menuOpen 
            ? <Menu /> 
            : <React.Fragment>
                {!lightbox && isWeb && <Nav theme={theme} />}{/* want nav on top for semantic html i guess*/}
                <View style={styles.body}>{renderContent(props)}</View>
                <Footer theme={theme} />
                {!lightbox && !isWeb && <Nav theme={theme} />}{/* makes it clickable to be last render on android*/}
              </React.Fragment>
        }
    </View>
}

export default Main;