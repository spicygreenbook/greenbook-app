import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from 'react-native-safe-area-context'
import DrawerNavigator from './DrawerNavigator';

const RootNavigator = () => (
  <SafeAreaProvider>
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  </SafeAreaProvider>
);

export default RootNavigator;