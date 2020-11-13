import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";;
import { View, Text } from 'react-native';
import BottomTabNavigator from './BottomTabNavigator'

const Drawer = createDrawerNavigator();

const Search = () => (
  <View>
    <Text>Home</Text>
  </View>
)

const DrawerNavigator = () => (
  <Drawer.Navigator screenOptions={{headerShown: false}}>
    <Drawer.Screen name="Home" children={BottomTabNavigator}  />
    <Drawer.Screen name="Donate" component={Search}  />
    <Drawer.Screen name="About" component={Search}  />
    <Drawer.Screen name="Updates" component={Search}  />
    <Drawer.Screen name="Team" component={Search}  />
    <Drawer.Screen name="Process" component={Search}  />
    <Drawer.Screen name="Press" component={Search}  />
    <Drawer.Screen name="Contact" component={Search}  />
  </Drawer.Navigator>
)

export default DrawerNavigator;