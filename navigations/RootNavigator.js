import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from 'react-native-safe-area-context'

import BottomTabNavigator from './BottomTabNavigator'

const Stack = createStackNavigator();

const RootNavigator = () => (
  <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Home" component={BottomTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  </SafeAreaProvider>
);

export default RootNavigator;