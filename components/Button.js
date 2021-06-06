import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { getStyles, Theme } from "../utils";
import { Link } from "./Link";

const colors = {
	primary: Theme.green_bg,
	default: "#fff",
};

const Button = ({ children, color = "default", href, onPress, ...props }) => {
	return (
		<Link href={href} contain onPress={() => onPress()} {...props}>
			<View style={[styles.button_green, { marginTop: 40, backgroundColor: colors[color] }]}>
				<Text style={[styles.button_green_text]}>{children}</Text>
			</View>
		</Link>
	);
};

const styles = StyleSheet.create(getStyles("section, content, text_header3, text_body, button_green_text, button_green"));

export default Button;
