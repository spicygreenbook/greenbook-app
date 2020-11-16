import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from 'react-native-safe-area-context'
import DrawerNavigator from './DrawerNavigator';
import * as Font from 'expo-font';
import { StateReducer, InitialState, getData } from '../utils';
import {StateProvider} from "../components/State";

function App(props) {

  const initialState = InitialState(props);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        'ApercuMedium': require('../public/fonts/ApercuRegular.ttf'),
        'ApercuLight': require('../public/fonts/ApercuLight.ttf'),
        'KnockoutBold': require('../public/fonts/Knockout_HTF71-FullMiddlewt_Regular.otf'),
        'KnockoutWelterWeight': require('../public/fonts/Knockout_HTF50-Welterweight_Regular.otf'),
        'KnockoutFeatherWeight': require('../public/fonts/Knockout_HTF48-Featherweight_Regular.otf')
      });

      setLoaded(true);
    };

    loadFont();
  }, []);

  return loaded && (
      <StateProvider initialState={initialState} reducer={StateReducer}>
        <SafeAreaProvider>
          <StatusBar barStyle="dark-content" />
          <NavigationContainer>
            <DrawerNavigator />
          </NavigationContainer>
       </SafeAreaProvider>
      </StateProvider>
  );
}

export async function getStaticProps(context) {

    let listings = await getData({
      type: 'listing'
    });
    let press = await getData({type: 'press'})
    let updates = await getData({type: 'updates'})

    return {
        props: {
            listings: listings,
            press: press,
            updates: updates,
        },
    };
}

export default App;