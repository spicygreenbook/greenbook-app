import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { getStyles, Theme } from "../../../utils";
import { Fontisto } from "@expo/vector-icons";

const Quote = () => {
	return (
		<View style={[styles.section, { marginTop: 50 }]}>
			<View style={[styles.content, { flex: 1 }]}>
				<Fontisto name="quote-left" size={64} color={Theme.green} />
				<Text style={[styles.text_quote, { marginTop: 10 }]}>
					It is certain, in any case, that ignorance, allied with power, is the most ferocious enemy justice can have.
				</Text>
				<Text style={[styles.text_quote]}>- James Baldwin</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create(getStyles(" text_quote, section, content"));

export default Quote;
