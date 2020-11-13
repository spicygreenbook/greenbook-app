import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from 'react-native-safe-area-context'
import DrawerNavigator from './DrawerNavigator';

const RootNavigator = () => (
  <SafeAreaProvider>
    <StatusBar barStyle="dark-content" />
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  </SafeAreaProvider>
);

export default RootNavigator;