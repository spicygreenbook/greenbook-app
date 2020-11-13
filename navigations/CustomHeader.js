import React from "react";
import { View, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Theme } from '../utils';
import LightNav from "../public/images/logo_nav_light.png"
// import DarkNav from "../public/images/logo_nav_dark.png"

const CustomHeader = ({ navigation, backgroundColor, dark = false }) => {
  // const insets = useSafeAreaInsets();

  return (
    <SafeAreaView>
      <View style={{
        // top: backgroundColor ? -insets.top: 0,
        // paddingTop: backgroundColor ? insets.top : 0,
        // marginBottom: backgroundColor ? -insets.top : 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingLeft: 20,
        paddingRight: 20,
        borderBottomWidth: 2,
        borderColor: Theme.green,
        // backgroundColor: backgroundColor && backgroundColor
      }}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Image style={{ width: 110, height: 110, resizeMode: 'contain' }} alt="Spicy Green Book" source={LightNav} />
        </TouchableOpacity>
        {/* <Text style={{ fontWeight: '800', fontSize: 16, color: Theme.green }}>{route.name}</Text> */}
        <MaterialCommunityIcons color={dark ? Theme.green : 'white'} name="menu" size={34} onPress={() => navigation.openDrawer()} />
      </View>
    </SafeAreaView>
  )
};

export default CustomHeader;