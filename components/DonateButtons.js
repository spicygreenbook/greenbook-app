import React from "react";
import { View, Text, StyleSheet, Linking } from "react-native";
import { useStateValue } from "../components/State";
import { getStyles } from "../utils";
import { Link } from "../components/Link";

export const PayPalButton = () => {
  return (
    <>
      <link href="/paypal.css" rel="stylesheet" />

      <div style={{display: 'flex', justifyContent: 'center'}}>
        <img src="/images/paypal.png" className="paypal-logo" />
        <form action="https://www.paypal.com/donate" method="post" target="top">
          <input type="hidden" name="hosted_button_id" value="54M2WUMT6FTDU" />
          <input
            type="image"
            src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif"
            border="0"
            name="submit"
            title="PayPal - The safer, easier way to pay online!"
            alt="Donate with PayPal button"
            className="paypal-img"
          />
          <img
            alt=""
            border="0"
            src="https://www.paypal.com/en_US/i/scr/pixel.gif"
            width="1"
            height="1"
          />
        </form>
      </div>
    </>
  );
};

export const CashAppButton = () => {
  const { isWeb } = useStateValue();

  const styles = StyleSheet.create(
    getStyles(
      "text_header2, text_header3, section, content, button_green, button_green_text, text_body",
      { isWeb }
    )
  );
  return (
    <View style={[styles.section]}>
      <Link
        href="https://cash.app/$spicygreenbook"
        contain
        onPress={() => Linking.openURL("https://cash.app/$spicygreenbook")}
      >
        <View style={[styles.button_green, { marginTop: 75 }]}>
          <Text style={[styles.button_green_text]}>Donate with CashApp</Text>
        </View>
      </Link>
    </View>
  );
};

export const DonateButtons = () => {
  return (
    <div className="flex-container">
      <PayPalButton />
      <CashAppButton />
    </div>
  );
};
