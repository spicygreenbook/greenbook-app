import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { WithScrollView } from './helper';
import Home from '../screens/Home'
import CustomHeader from './CustomHeader';
import Listing from '../screens/Listing';

const Stack = createStackNavigator();

const HomeStack = (props) => (
  <Stack.Navigator headerMode="screen">
    <Stack.Screen name="Home" component={WithScrollView(() => <Home {...props} />)} options={{
      header: () => <CustomHeader dark {...props} />
    }} />

    <Stack.Screen name="Listing" component={WithScrollView(Listing)} options={{
      headerShown: false,
    }} />
  </Stack.Navigator>
)

export default HomeStack;