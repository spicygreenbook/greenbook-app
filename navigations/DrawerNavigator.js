import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";;
import { View, Text, Image } from 'react-native';
import { Theme } from '../utils';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeStackNavigator from './HomeStackNavigator';

const Drawer = createDrawerNavigator();

const Search = () => (
  <View>
    <Text>Home</Text>
  </View>
)

const Title = ({ title }) => <Text style={{ fontWeight: '800', fontSize: 16, color: Theme.green }}>{title}</Text>;
const Logo = () => <Image
  style={{ width: 90, resizeMode: 'contain', marginBottom: 5 }}
  alt="Spicy Green Book"
  source={require('../public/images/logo_nav_light.png')}
/>

const DrawerNavigator = () => (
  <Drawer.Navigator
    drawerPosition="right" 
    drawerStyle={{ 
      backgroundColor: Theme.green
    }}
    screenOptions={(props) => ({
      headerStyle: { paddingLeft: 20, paddingRight: 20 },
      headerTitle: () => <Title title={props.route.name}/>,
      headerRight: () => <MaterialCommunityIcons color={Theme.green} name="menu" size={34} onPress={() => props.navigation.openDrawer()} />,
      headerLeft: () => <Logo />
 
    })}
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