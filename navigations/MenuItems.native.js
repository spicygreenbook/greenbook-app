import React from "react";
import { Theme } from "../utils";
import Collapsible from "react-native-collapsible";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Text, View, Linking, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from '@expo/vector-icons'; 
import { FooterTab, Footer, Button, Icon } from 'native-base';

const SocialLinks = () => {
  const styles = StyleSheet.create({
    default: { color: Theme.green, fontSize: 22, }
    });
  return (
    <View>
      <Footer> 
        <FooterTab style={{ backgroundColor: "white" }}>
          <Button onPress={() => Linking.openURL("https://instagram.com/spicygreenbook")} >
            <Icon type="FontAwesome" style={styles.default} name="instagram" size={22} />
          </Button>
          <Button onPress={() => Linking.openURL("https://twitter.com/spicygreenbook")}>
            <Icon type="FontAwesome" style={styles.default} name="twitter" size={22} />
          </Button>
          <Button onPress={() => Linking.openURL("https://www.linkedin.com/company/spicy-green-book/")}>
            <Icon type="FontAwesome" style={styles.default} name="linkedin" size={22} />
          </Button>
          <Button onPress={() => Linking.openURL("https://www.facebook.com/SpicyGreenBook/")}>
            <Icon type="FontAwesome" style={styles.default} name="facebook" size={22} />
          </Button>
          <Button onPress={() => Linking.openURL("https://www.youtube.com/channel/UCS5gEWNUF2fibLwwxFibKGg")}>
            <Icon type="FontAwesome" style={styles.default} name="youtube" size={22} />
          </Button>
        </FooterTab>
      </Footer>
      <Footer>
        <FooterTab style={{ backgroundColor: "white", borderBottomWidth: 2,
        borderBottomColor: Theme.green }}>
          <Button onPress={() => Linking.openURL("https://github.com/spicygreenbook/greenbook-app")}>
            <Icon type="FontAwesome" style={styles.default} name="github" size={22} />
          </Button>
          <Button onPress={() => Linking.openURL("https://www.behance.net/spicygreenbook/")}>
            <Icon type="FontAwesome" style={styles.default} name="behance" size={22} />
          </Button>
          <Button onPress={() => Linking.openURL("https://www.pinterest.com/spicygreenbook/")}>
            <Icon type="FontAwesome" style={styles.default} name="pinterest" size={22} />
          </Button>
          <Button onPress={() => Linking.openURL("mailto:admin@spicygreenbook.org")}>
            <Icon type="FontAwesome" style={styles.default} name="envelope" size={22} />
          </Button>
        </FooterTab>
      </Footer>
    </View>
  );
}

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
          <FontAwesome name={isCollapsed ? 'plus' : 'minus'} size={14} color={isCollapsed ? Theme.green : 'white'} style={{marginRight: 40}}/>
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
      <SocialLinks />
    </DrawerContentScrollView>
  );
}
