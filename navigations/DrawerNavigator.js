import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomHeader from "./CustomHeader";
import BottomTabNavigator from "./BottomTabNavigator";
import { CustomDrawerContent } from './MenuItems';
const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => (
  <Drawer.Navigator
    // drawerContent={CustomDrawer} <-- is not being used by the app so I commented it out so it doesn't affect performance
    drawerPosition="right"
    drawerStyle={{
      backgroundColor: "white",
    }}
    screenOptions={(props) => ({
      header: () => <CustomHeader dark {...props} />,
    })}
    drawerContentOptions={{
      inactiveTintColor: "white",
      activeTintColor: "black",
      activeBackgroundColor: "white",
    }}
    drawerContent={(props) => <CustomDrawerContent {...props} />}
  >
    <Drawer.Screen
      name="Home"
      component={BottomTabNavigator}
      options={{ headerShown: false }}
    />
  </Drawer.Navigator>
);

export default DrawerNavigator;
