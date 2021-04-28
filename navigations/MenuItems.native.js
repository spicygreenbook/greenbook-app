import React from "react";
import { Theme } from "../utils";
import Collapsible from "react-native-collapsible";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Text, View, TouchableOpacity } from "react-native";
import { FontAwesome } from '@expo/vector-icons'; 


export function RegularItem(props) {
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
export function ChildItem(props) {
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

export function ExpandableItem(props) {
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

export function CustomDrawerContent(props) {
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
