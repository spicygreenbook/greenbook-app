import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ScrollView } from 'react-native';
import Home from '../screens/Home'

export const HomeView = () => (
  <ScrollView>
      <Home />
  </ScrollView>
)

const Stack = createStackNavigator();

const HomeStack = ({ navigation }) => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={() => <HomeView navigation={navigation} />} />
  </Stack.Navigator>
)

export default HomeStack;