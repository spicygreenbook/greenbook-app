import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Theme } from "../utils";
import { WithScrollView } from "./helper";
import CustomDrawer from "./CustomDrawer";
import CustomHeader from "./CustomHeader";
import BottomTabNavigator from "./BottomTabNavigator";
import Donate from "../screens/Donate";
import Shop from "../screens/Shop";
import About from "../screens/About";
import Updates from "../screens/Updates";
import Team from "../screens/Team";
import Process from "../screens/Process";
import Press from "../screens/Press";
import Testimonials from "../screens/Testimonials";
import Contact from "../screens/Contact";
import FAQ from "../screens/FAQ";
import Volunteers from "../screens/Volunteers";
import Volunteer from "../screens/Volunteer";
import Sponsors from "../screens/Sponsors";
import Collapsible from "react-native-collapsible";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Text, View, TouchableOpacity } from "react-native";
import { FontAwesome } from '@expo/vector-icons'; 
const Drawer = createDrawerNavigator();

function RegularItem(props) {
  return (
    <View
      style={{
        borderBottomWidth: 2,
        borderBottomColor: Theme.green,
      }}
    >
      <TouchableOpacity onPress={() => props.navigation.navigate(props.link)}>
        <Text
          style={{
            color: Theme.green,
            padding: 20,
            paddingLeft: 40,
          }}
        >
          {props.label}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
function ChildItem(props) {
  return (
    <View
      style={{
        backgroundColor: Theme.green,
        color: "white",
      }}
    >
      <TouchableOpacity onPress={() => props.navigation.navigate(props.link)}>
        <Text style={{ padding: 20, paddingLeft: 60, color: "white" }}>{props.label}</Text>
      </TouchableOpacity>
    </View>
  );
}

function ExpandableItem(props) {
  const [isCollapsed, setIsCollapsed] = React.useState(true);

  return (
    <View
      style={{
        backgroundColor: isCollapsed ? 'white' : Theme.green,
        borderBottomWidth: 2,
        borderBottomColor: Theme.green,
      }}
    >
      <TouchableOpacity onPress={() => setIsCollapsed(!isCollapsed)}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Text
            style={{
              color: isCollapsed ? Theme.green : 'white',
              padding: 20,
              paddingLeft: 40,
            }}
          >
            {props.label}
          </Text>
          <FontAwesome name={isCollapsed ? 'plus' : 'minus'} size={24} color={isCollapsed ? Theme.green : 'white'} style={{marginRight: 40}}/>
        </View>
      </TouchableOpacity>

      <Collapsible collapsed={isCollapsed}>
        {props.items.map((item) => (
          <ChildItem navigation={props.navigation} {...item} />
        ))}
      </Collapsible>
    </View>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} style={{ padding: 0 }}>
      <RegularItem label="Directory" link="Directory" navigation={props.navigation} />
      <RegularItem label="Add Listing" link="Add Listing" navigation={props.navigation} />

      <ExpandableItem
        label="About"
        items={[
          { label: "Our History", link: "About" },
          { label: "The Team", link: "Team" },
          { label: "Volunteers", link: "Volunteers" },
          { label: "Updates", link: "Updates" },
        ]}
        navigation={props.navigation} 
      />

      <ExpandableItem
        label="How to Help"
        items={[
          { label: "Donate", link: "Donate" },
          { label: "Sponsor", link: "Sponsor Us" },
          { label: "Volunteer", link: "Volunteer" },
        ]}
        navigation={props.navigation} 
      />

      <ExpandableItem
        label="Media"
        items={[
          { label: "Press", link: "Press" },
          { label: "Testimonials", link: "Testimonials" },
        ]}
        navigation={props.navigation} 
      />

      <RegularItem label="Store" link="Store" navigation={props.navigation} />
      <RegularItem label="FAQ" link="FAQ" navigation={props.navigation} />
      <RegularItem label="Contact" link="Contact" navigation={props.navigation} />

    </DrawerContentScrollView>
  );
}

const DrawerNavigator = () => (
  <Drawer.Navigator
    drawerContent={CustomDrawer}
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
    <Drawer.Screen name="Donate" component={WithScrollView(Donate)} />
    <Drawer.Screen name="Store" component={WithScrollView(Shop)} />
    <Drawer.Screen name="Sponsor Us" component={WithScrollView(Sponsors)} />
    <Drawer.Screen name="About" component={WithScrollView(About)} />
    <Drawer.Screen name="Updates" component={WithScrollView(Updates)} />
    <Drawer.Screen name="Team" component={WithScrollView(Team)} />
    <Drawer.Screen name="Volunteers" component={WithScrollView(Volunteers)} />
    <Drawer.Screen name="Process" component={WithScrollView(Process)} />
    <Drawer.Screen name="Press" component={WithScrollView(Press)} />
    <Drawer.Screen
      name="Testimonials"
      component={WithScrollView(Testimonials)}
    />
    <Drawer.Screen name="FAQ" component={WithScrollView(FAQ)} />
    <Drawer.Screen name="Contact" component={WithScrollView(Contact)} />
  </Drawer.Navigator>
);

export default DrawerNavigator;
