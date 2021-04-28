import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity
} from "react-native";

import { getStyles, Theme } from "../utils";
import { useStateValue } from "../components/State";
import { Link, Click } from "../components/Link";
import { EvilIcons } from "@expo/vector-icons";
import { useRouter } from "next/router";
import { CustomDrawerContent } from "../navigations/MenuItems"

export default function (props) {
  const [
    { view, isWeb, theme, dimensions, menuOpen },
    dispatch
  ] = useStateValue();
  const styles = StyleSheet.create(getStyles("text_menu", { isWeb, theme }));
  const router = useRouter();

  return (
    <View
      style={{
        flexDirection: "column",
        position: "absolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        height: "100%",
        zIndex: 10,
        paddingTop: isWeb ? 0 : 40,
        //backgroundColor: Theme.green_bg
      }}
    >
      <View
        style={{
          position: "absolute",
          right: 10,
          top: isWeb ? 0 : 60,
          zIndex: 10
        }}
      >
        <TouchableOpacity
          onPress={(e) => {
            dispatch({ type: "menuOpen", value: false });
          }}
        >
          <EvilIcons name="close" size={48} color={Theme.green} />
        </TouchableOpacity>
      </View>
      <CustomDrawerContent isWeb={true} />
    </View>
  );
}
