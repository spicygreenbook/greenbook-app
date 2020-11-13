import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Text, View } from "react-native";
import { MaterialCommunityIcons, MaterialIcons, FontAwesome5, Octicons } from '@expo/vector-icons'
import { Theme } from '../utils';
import HomeStackNavigator from './HomeStackNavigator';

const BottomTab = createMaterialBottomTabNavigator();

export const Profile = () => <View><Text>Profile</Text></View>
export const Volunteer = () => <View><Text>Volunteer</Text></View>

const BottomTabNavigator = () => {
  
  return (
    <BottomTab.Navigator
      activeColor='white'
      barStyle={{ backgroundColor: Theme.green, height: 100, paddingTop: 20 }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons color={color} name="home" size={22} />
        }}
      />

      <BottomTab.Screen
        name="Browse"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => <MaterialIcons color={color} name="search" size={22} />
        }}
      />

      <BottomTab.Screen
        name="Join"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => <Octicons color={color} name="request-changes" size={22} />
        }}
      />

      <BottomTab.Screen
        name="Volunteer"
        component={Volunteer}
        options={{
          tabBarIcon: ({ color }) => <FontAwesome5 color={color} name="hands-helping" size={22} />
        }}
      />   
    </BottomTab.Navigator>
  )
}

export default BottomTabNavigator;
