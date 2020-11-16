import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Icon } from "native-base";
import { StyleSheet } from "react-native";
import { Theme } from '../utils';
import HomeStackNavigator from './HomeStackNavigator';
import BrowseStackNavigator from './BrowseStackNavigator';
import AddListing from '../screens/AddListing';
import Volunteer from '../screens/Volunteer';

import { WithScrollView } from './helper';
import CustomHeader from './CustomHeader';

const BottomTab = createMaterialBottomTabNavigator();

const JoinStackNavigator = createStackNavigator();
const VolunteerStackNavigator = createStackNavigator();

const JoinStack = (props) => (
  <JoinStackNavigator.Navigator>
    <JoinStackNavigator.Screen name="Join" component={WithScrollView(AddListing)} options={{
      header: () => <CustomHeader dark {...props} />
    }} />
  </JoinStackNavigator.Navigator>
)

const VolunteerStack = (props) => (
  <VolunteerStackNavigator.Navigator>
    <VolunteerStackNavigator.Screen name="Volunteer" component={WithScrollView(Volunteer)} options={{
      header: () => <CustomHeader dark {...props} />
    }} />
  </VolunteerStackNavigator.Navigator>
)


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
          tabBarIcon: ({ color }) => <Icon style={styles.default} name="home" size={22} />
        }}
      />

      <BottomTab.Screen
        name="Browse"
        component={BrowseStackNavigator}
        options={{
          tabBarIcon: ({ color }) => <Icon type="MaterialIcons" style={styles.default} name="search" size={22} />
        }}
      />

      <BottomTab.Screen
        name="Join"
        component={JoinStack}
        options={{
          tabBarIcon: ({ color }) => <Icon type="Octicons" style={styles.default} name="request-changes" size={22} />
        }}
      />

      <BottomTab.Screen
        name="Volunteer"
        component={VolunteerStack}
        options={{
          tabBarIcon: ({ color }) => <Icon type="FontAwesome5" style={styles.default} name="hands-helping" size={22} />
        }}
      />   
    </BottomTab.Navigator>
  )
};

const styles = StyleSheet.create({
  default: {
    color: '#ffffff',
    fontSize: 22
  }
});

export default BottomTabNavigator;
