import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { WithScrollView } from './helper';
import List from '../screens/List';

import CustomHeader from './CustomHeader';

const Stack = createStackNavigator();

const BrowseStackNavigator = (props) => (
  <Stack.Navigator>
    <Stack.Screen name="Browse" component={WithScrollView(List)} options={{
      header: () => <CustomHeader dark {...props} />
    }} />
  </Stack.Navigator>
)

export default BrowseStackNavigator;