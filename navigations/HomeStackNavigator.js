import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { WithScrollView } from './helper';
import Home from '../screens/Home'

import CustomHeader from './CustomHeader';

const Stack = createStackNavigator();

const HomeStack = (props) => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={WithScrollView(Home)} options={{
      header: () => <CustomHeader dark {...props} />
    }} />
  </Stack.Navigator>
)

export default HomeStack;