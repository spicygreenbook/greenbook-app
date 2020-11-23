import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import List from '../screens/List';
import CustomHeader from './CustomHeader';
import Listing from '../screens/Listing';

const Stack = createStackNavigator();

const BrowseStackNavigator = (props) => {
return (
    <Stack.Navigator initialRouteName="Home" headerMode="screen">
      <Stack.Screen name="Home" component={List} options={{ header: () => <CustomHeader dark {...props} /> }} />
      <Stack.Screen name="Listing" component={Listing} options={{headerShown: false}} />
    </Stack.Navigator>
  )
};

export default BrowseStackNavigator;