import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ScrollView } from 'react-native';
import Home from '../screens/Home'

import CustomHeader from './CustomHeader';

export const HomeView = () => (
  <ScrollView>
      <Home />
  </ScrollView>
)

const Stack = createStackNavigator();

const HomeStack = (props) => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={() => <HomeView navigation={props.navigation} />} options={{
      header: () => <CustomHeader dark {...props} />
    }} />
  </Stack.Navigator>
)

export default HomeStack;