import React from "react";
import { Theme } from "../utils";
import { Text, View, TouchableOpacity } from "react-native";
import { FontAwesome } from '@expo/vector-icons'; 
import Link from 'next/link';

function DrawerContentScrollView(props) {
  return <View>{props.children}</View>
}
function Collapsible(props) {
  return <View style={{height: props.collapsed ? 0 : props.items.length * 56, overflow: 'hidden'}}>{props.children}</View>
}

export function RegularItem(props) {
  return (
    <View
      style={{
        borderBottomWidth: 2,
        borderBottomColor: Theme.green,
      }}
    >
      <Link href={props.link}>
        <Text
          style={{
            color: Theme.green,
            padding: 20,
            paddingLeft: 40,
          }}
        >
          {props.label}
        </Text>
      </Link>
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
      <Link href={props.link}>
        <Text style={{ padding: 20, paddingLeft: 60, color: "white" }}>{props.label}</Text>
      </Link>
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

      <Collapsible collapsed={isCollapsed} items={props.items}>
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
      <RegularItem label="Directory" link="/search" navigation={props.navigation} />
      <RegularItem label="Add Listing" link="/add" navigation={props.navigation} />

      <ExpandableItem
        label="About"
        items={[
          { label: "Our History", link: "/about" },
          { label: "The Team", link: "/team" },
          { label: "Volunteers", link: "/volunteers" },
          { label: "Updates", link: "/updates" },
        ]}
        navigation={props.navigation} 
      />

      <ExpandableItem
        label="How to Help"
        items={[
          { label: "Donate", link: "/donate" },
          { label: "Sponsor", link: "/sponsor" },
          { label: "Volunteer", link: "/volunteer" },
        ]}
        navigation={props.navigation} 
      />

      <ExpandableItem
        label="Media"
        items={[
          { label: "Press", link: "/press" },
          { label: "Testimonials", link: "/testimonials" },
        ]}
        navigation={props.navigation} 
      />

      <RegularItem label="Store" link="https://shop.spicygreenbook.org/" navigation={props.navigation} />
      <RegularItem label="FAQ" link="/faq" navigation={props.navigation} />
      <RegularItem label="Contact" link="/contact" navigation={props.navigation} />

    </DrawerContentScrollView>
  );
}
