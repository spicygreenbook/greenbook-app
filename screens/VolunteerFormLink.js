import React, { useRef } from "react";
import { useStateValue } from "../components/State";
import { View, Text, StyleSheet } from "react-native";
import { Link } from "../components/Link";
import { getStyles } from "../utils";

const VolunteerFormLink = ({ text }) => {
	const [{ isWeb, dimensions }] = useStateValue();
	const styles = StyleSheet.create(getStyles("text_header2, text_header3, button_white, button_white_text, text_header4, section, content", { isWeb }));
	const myRef = useRef(null);

	return (
		<View ref={myRef} nativeID="formBelow" style={([styles.section], { paddingBottom: dimensions.width < 900 ? 40 : 80 })}>
			<View style={[styles.content, { width: dimensions.width < 900 ? 343 : 1024, alignSelf: "center" }]}>
				<View
					style={[
						{
							flex: 1,
							backgroundColor: "#000",
							width: "100%",
							maxHeight: isWeb && dimensions.width < 900 ? 168 : "auto",
							flexDirection: dimensions.width < 900 ? "column" : "row",
							justifyContent: "space-between",
							alignItems: "center",
						},
					]}
				>
					<View style={{ flex: isWeb ? 3 : 1, padding: 20, flexBasis: isWeb ? {} : 0, flexGrow: isWeb ? {} : 1 }}>
						<Text style={[styles.text_header4, { color: "#fff", padding: 10, alignSelf: "center" }]}> {text} </Text>
					</View>
					<View style={{ flex: 1, padding: isWeb ? 34 : 0, justifyContent: "flex-end", alignItems: "flex-end", flexGrow: isWeb ? {} : 0 }}>
						<View style={{ flex: 1 }}>
							<Link contain href="https://forms.gle/vJ114r7J3JkE8jrs9" title="Volunteer">
								<View style={[styles.button_white, { borderRadius: 8, height: 40, marginBottom: 16 }]}>
									<Text style={[styles.button_white_text, { fontWeight: "bold" }]}>Volunteer</Text>
								</View>
							</Link>
						</View>
					</View>
				</View>
			</View>
		</View>
	);
};

export default VolunteerFormLink;
