import React, { useEffect, useState } from "react";
import { Platform } from 'react-native';
import * as Font from 'expo-font';
import Web from './pages';
import Rootnavigator from './navigations/RootNavigator';

function App() {

  const [loaded, setLoaded] = useState(false);
  const APP = Platform.OS === 'web' ? <Web /> : <Rootnavigator />

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        'ApercuMedium': require('./public/fonts/ApercuRegular.ttf'),
        'ApercuLight': require('./public/fonts/ApercuLight.ttf'),
        'KnockoutBold': require('./public/fonts/Knockout_HTF71-FullMiddlewt_Regular.otf'),
        'KnockoutWelterWeight': require('./public/fonts/Knockout_HTF50-Welterweight_Regular.otf'),
        'KnockoutFeatherWeight': require('./public/fonts/Knockout_HTF48-Featherweight_Regular.otf')
      });

      setLoaded(true);
    };

    loadFont();
  }, []);

  return loaded && APP;
}

export default App;