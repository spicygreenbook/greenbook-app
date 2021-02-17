import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Icon } from "native-base";
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

const BottomTabNavigator = ({ navigation }) => {

  return (
    <BottomTab.Navigator
      shifting={false}
      activeColor='white'
      barStyle={{ backgroundColor: Theme.green, height: 100, paddingTop: 20 }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ color }) => <Icon style={{ fontSize: 22, color }} name="home" />
        }}
      />

      <BottomTab.Screen
        name="Directory"
        component={BrowseStackNavigator}
        options={{
          tabBarIcon: ({ color }) => <Icon type="MaterialIcons" style={{ fontSize: 22, color }} name="search" />
        }}
        listeners={({ navigation, route }) => ({
          tabPress: () => {
            if(!route.params) return;
            
            const { home } = route.params;
            if(home) {
              navigation.reset({
                index: 0,
                routes: [{ name: 'Directory' }],
              });
            }
          }
        })}
      />

      <BottomTab.Screen
        name="Add Listing"
        component={JoinStack}
        options={{
          tabBarIcon: ({ color }) => <Icon type="Octicons" style={{ fontSize: 22, color }} name="request-changes" />
        }}
      />

      <BottomTab.Screen
        name="Volunteer"
        component={VolunteerStack}
        options={{
          tabBarIcon: ({ color }) => <Icon type="FontAwesome5" style={{ fontSize: 22, color }} name="hands-helping" />
        }}
      />   
    </BottomTab.Navigator>
  )
};

export default BottomTabNavigator;
