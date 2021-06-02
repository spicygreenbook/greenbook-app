import React from "react";
import { View, Text, StyleSheet, Linking } from "react-native";
import { useStateValue } from "../components/State";
import { getStyles } from "../utils";
import { Link } from "../components/Link";

export const PayPalButton = () => {
	return (
		<>
			<link href="/paypal.css" rel="stylesheet" />

			<div style={{ display: "flex", justifyContent: "center" }}>
				<img src="/images/paypal.png" className="paypal-logo" alt="paypal-logo" />
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
					<img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
				</form>
			</div>
		</>
	);
};

export const CashAppButton = () => {
	const { isWeb } = useStateValue();

	const styles = StyleSheet.create(getStyles("section, button_green, button_green_text", { isWeb }));
	return (
		<Link href="https://cash.app/$spicygreenbook" contain onPress={() => Linking.openURL("https://cash.app/$spicygreenbook")}>
			<View style={[styles.button_green]}>
				<Text style={[styles.button_green_text]}>Donate with CashApp</Text>
			</View>
		</Link>
	);
};

export const DonateButtons = () => {
	const [{ dimensions }] = useStateValue();
	return (
		<div className="flex-container" style={{ right: dimensions.width < 900 ? 0 : 60, position: "relative" }}>
			<PayPalButton />
			<Text
				style={{
					transform: [{ rotate: "180deg" }],
					position: "relative",
					writingMode: "vertical-rl",
					color: "rgba(0, 0, 0, 0.5)",
					top: -5,
					left: dimensions.width < 900 ? -10 : -50,
					marginVertical: 10,
				}}
			>
				- OR -
			</Text>
			<CashAppButton />
		</div>
	);
};
