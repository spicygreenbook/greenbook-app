import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from 'react-native-safe-area-context'
import DrawerNavigator from './DrawerNavigator';
import { StateReducer, InitialState } from '../utils';
import {StateProvider} from "../components/State";

function App(props) {
  const initialState = InitialState(props);

  return (
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

export default App;