import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { getStyles, Theme } from "../utils";
import { useStateValue } from "./State";
import { Fontisto } from "@expo/vector-icons";
import { Link } from "../components/Link";
import AppStoreIconBadge from "../public/app-store.svg";
import GooglePlayIconBadge from "../public/google-play.svg";

const DownloadApp = () => {
	const [{ isWeb, dimensions }] = useStateValue();

	return (
		isWeb && (
			<View style={[styles.section, { flexDirection: dimensions.width > 670 ? "row" : "column", paddingVertical: 24 }]}>
				<Text accessibilityRole="header" aria-level="3" style={[styles.text_header3, { fontSize: 36 }]}>
					DOWNLOAD OUR APP
				</Text>

				<Fontisto
					style={{ marginLeft: 32, marginRight: 32, display: dimensions.width > 670 ? "flex" : "none" }}
					name="arrow-right-l"
					size={46}
					color={Theme.green}
				/>

				<Link href="https://apps.apple.com/us/app/spicy-green-book/id1538472288">
					<img id="download-app" style={{ height: 45 }} src={AppStoreIconBadge} alt="Apple Store" />
				</Link>
				<Link href="https://play.google.com/store/apps/details?id=com.spicygreenbook.app">
					<img style={{ height: 66 }} src={GooglePlayIconBadge} alt="Google Store" />
				</Link>
			</View>
		)
	);
};

const styles = StyleSheet.create(getStyles("section, text_header3"));

export default DownloadApp;
