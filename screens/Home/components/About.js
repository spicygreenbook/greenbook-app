import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useStateValue } from "../../../components/State";
import { getStyles } from "../../../utils";
import { ResponsiveImage } from "../../../components/ResponsiveImage";
import Button from "../../../components/Button";

const About = ({ navigation }) => {
	const [{ isWeb, dimensions }] = useStateValue();

	return (
		<View style={[styles.section, { paddingTop: isWeb ? 20 : 60 }]}>
			<View
				style={[
					styles.content,
					dimensions.width < 700
						? {}
						: {
								flexDirection: "row",
								flexWrap: "wrap",
								justifyContent: "space-between",
								alignItems: "center",
						  },
				]}
			>
				<View style={dimensions.width < 700 ? { paddingLeft: 40, paddingRight: 40 } : { flex: 1, paddingLeft: 80, paddingRight: 80 }}>
					<ResponsiveImage
						style={{
							width: 804,
							resizeMode: "contain",
							aspectRatio: 1.37245,
						}}
						alt="Spicy Green Book"
						source={isWeb ? { uri: "/images/home_green_book.png" } : require("../../../public/images/home_green_book.png")}
					/>
				</View>
				<View style={dimensions.width < 700 ? { paddingTop: 40 } : { flex: 2, paddingLeft: 20 }}>
					<Text accessibilityRole="header" aria-level="3" style={[styles.text_header3, { marginBottom: 20 }]}>
						ABOUT SGB
					</Text>
					<Text style={[styles.text_body, { color: "#000" }, isWeb ? {} : { lineHeight: 23 }]}>
						Inspired by Victor Green, Spicy Green Book is a team of committed volunteers compiling a directory of Black owned businesses and performing
						marketing services for these businesses free of charge. We are establishing a space for people who seek to create change, and creating a platform
						for them to invest in Black business owners in their communities.
					</Text>
					<Button color="primary" href="/about" onPress={() => navigation.navigate("About")}>
						Learn More
					</Button>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create(getStyles("section, content, text_header3, text_body, button_green_text, button_green"));

export default About;
