import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";;
import { View, Text } from 'react-native';
import { Theme } from '../utils';
import HomeStackNavigator from './HomeStackNavigator';
import CustomHeader from './CustomHeader';

const Drawer = createDrawerNavigator();

const Search = () => (
  <View>
    <Text>Home</Text>
  </View>
)

const DrawerNavigator = () => (
  <Drawer.Navigator
    drawerPosition="right" 
    drawerStyle={{ 
      backgroundColor: Theme.green
    }}
    screenOptions={(props) => ({ header: () => <CustomHeader dark {...props} /> })}
    drawerContentOptions={{ 
      inactiveTintColor: 'white', 
      activeTintColor: 'black',
      activeBackgroundColor: 'white'
    }} 
  >
    <Drawer.Screen name="Home" component={HomeStackNavigator} options={{ headerShown: false }} />
    <Drawer.Screen name="Donate" component={Search}  />
    <Drawer.Screen name="About" component={Search}  />
    <Drawer.Screen name="Updates" component={Search}  />
    <Drawer.Screen name="Team" component={Search}  />
    <Drawer.Screen name="Process" component={Search}  />
    <Drawer.Screen name="Press" component={Search}  />
    <Drawer.Screen name="Contact" component={Search}  />
    <Drawer.Screen name="Volunteer" component={Search}  />
  </Drawer.Navigator>
)

export default DrawerNavigator;