import React, { useState, useEffect } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from 'react-native-safe-area-context'
import DrawerNavigator from './DrawerNavigator';
import { StateReducer, InitialState } from '../utils';
import { StateProvider } from "../components/State";
import Onboarding from "./Onboarding"
import AsyncStorage from '@react-native-async-storage/async-storage';

function App(props) {
  const initialState = InitialState(props);
  const [ loading, setLoading ] = useState(true);
  const [ onboarding, setOnboarding ] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('onboarded').then(value => {
      console.log('value', value)
      setOnboarding(value !== "1");
      setLoading(false);
    }).catch(err=> {
      console.error(err);
      setLoading(false);
    })
    
  }, [])

  return (
    <StateProvider initialState={initialState} reducer={StateReducer}>
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" />
        <NavigationContainer>
          {loading || onboarding
            ? <Onboarding onChange={() => {
                setOnboarding(false)
                AsyncStorage.setItem('onboarded', "1")
              }} />
            : <DrawerNavigator />
          }
        </NavigationContainer>
      </SafeAreaProvider>
    </StateProvider>
  );
}

export default App;