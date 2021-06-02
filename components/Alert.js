import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { getStyles } from "../utils";

const color = {
	error: "#F44336",
	warning: "#FF9800",
	success: "#4CAF50",
};

const Alert = ({ severity, message }) => {
	return (
		<View style={[styles.section]}>
			<Text style={[styles.text_header3, { color: color[severity] }]}>{message}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	...getStyles("text_header3, section"),
});

export default Alert;
