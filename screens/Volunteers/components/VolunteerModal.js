import React from "react";
import { Modal, ScrollView, StyleSheet, Text, View, Button } from "react-native";
import { useStateValue } from "../../../components/State";
import { ResponsiveImage } from "../../../components/ResponsiveImage";
import { Link } from "../../../components/Link";
import { FontAwesome } from "@expo/vector-icons";
import { getStyles, Theme } from "../../../utils";

const VolunteerModal = ({ open, data, onClose }) => {
	const [{ isWeb, dimensions }] = useStateValue();

	const Wrapper = (props) => {
		return isWeb ? (
			<View
				style={{
					borderColor: "red",
					display: open ? "flex" : "none",
					pointerEvents: open ? "" : "none",
					position: "fixed",
					alignItems: "center",
					alignSelf: "center",
					justifyContent: "center",
					backgroundColor: "rgba(0,0,0,0.2)",
					left: 0,
					right: 0,
					borderWidth: 0,
					height: dimensions.height,
				}}
				onClick={(e) => close()}
			>
				<View
					style={{ width: isWeb ? 500 : "100%", maxWidth: "100%", height: "100%", margin: "0 auto" }}
					onClick={(e) => {
						e.stopPropagation();
					}}
				>
					{props.children}
				</View>
			</View>
		) : (
			props.children
		);
	};

	const VolunteerIconLink = (link) => {
		let l = link.toLowerCase();

		if (l === "upwork") return null; // No icon listed
		if (l === "portfolio" || l === "website") l = "link";
		return <FontAwesome name={l} size={16} color={Theme.green_bg} style={{ marginRight: isWeb ? 5 : 20 }} />;
	};

	return (
		<Wrapper>
			<Modal
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					borderWidth: 0,
					top: 120,
				}}
				animationType="slide"
				transparent={true}
				visible={open}
				onRequestClose={() => onClose()}
			>
				<ScrollView
					contentContainerStyle={[
						styles.modalView,
						{
							display: "flex",
							backgroundColor: "rgba(248,255,251, 1.0)",
							alignItems: "center",
							top: isWeb ? 120 : 40,
							width: "100%",
							height: isWeb ? "100%" : null,
							maxWidth: 500,
							marginLeft: "auto",
							marginRight: "auto",
						},
					]}
				>
					<View
						style={{
							margin: 20,
							boxShadow: "8px 8px 6px 0px rgba(0, 0, 0, .8)",
							width: "100%",
							maxWidth: 500,
						}}
					>
						{data.image && data.image.url && <ResponsiveImage style={{ width: dimensions.width }} source={{ uri: data.image.url + "&w=600" }} />}
					</View>
					<View style={{ padding: 20 }}>
						<Text style={styles.text_header3}>{data.name}</Text>
						<Text style={styles.text_header4}>{data.role}</Text>
						<Text style={[styles.text_body2, { lineHeight: 20, color: "rgba(0,0,0,0.7)", paddingVertical: 15 }]}>{data.description}</Text>
						{!!data._date_started && (
							<View style={styles.volunteerDetailItem}>
								{!!isWeb ? (
									<Text style={styles.text_body2}> Started on: {" " + new Date(data._date_started.value).toLocaleDateString()} </Text>
								) : (
									<Text style={styles.text_body2}> Started on: {" " + new Date(data._date_started.value.split("T")[0]).toDateString()} </Text>
								)}
							</View>
						)}
						{!!data.amount && <Text style={(styles.text_body2, { color: "black" })}>${data.amount} in time volunteered </Text>}
						{data.links && data.links.length > 0 && (
							<View style={{ flexDirection: "row", flexWrap: "wrap", color: "rgba(0,0,0,0.7)", marginTop: 20 }}>
								{data.links.map((link, index) => (
									<Link key={"Link" + index} href={link.link}>
										<Text key={"Text" + index} style={[styles.text_body2, { marginRight: 20 }]}>
											{link && link.link_title && VolunteerIconLink(link.link_title)}
											{isWeb ? link.link_title : " " + link.link_title}
										</Text>
									</Link>
								))}
							</View>
						)}
						{!!data.talents_donated && (
							<View style={{ flex: 1, borderTopWidth: 1, borderTopColor: "#999", marginTop: 20, marginBottom: 10, paddingTop: 20, paddingbottom: 20 }}>
								<Text style={[styles.text_body2, { fontWeight: "bold", color: "#000" }]}>SKILLS</Text>
								<View style={{ marginTop: 10, flexDirection: "row", flexWrap: "wrap" }}>
									{data.talents_donated.map((talent, i, ar) => (
										<Text key={i} style={[styles.text_body2, { fontSize: 16 }]}>
											{talent.talent}
											{i < ar.length - 1 && ", "}
										</Text>
									))}
								</View>
							</View>
						)}
						<View style={{ alignSelf: "center", padding: 30, minWidth: 200, minHeight: "100%", marginTop: isWeb ? 50 : 0 }}>
							<Button
								onPress={() => onClose()}
								title="Close"
								color={Theme.green}
								style={[styles.button_green, { fontSize: 30 }]}
								accessibilityLabel="Close the pop-up screen with volunteer details"
							/>
						</View>
					</View>

					<View style={{ position: "absolute", top: 0, right: 0, minWidth: 40, minHeight: 40, marginTop: 10, marginRight: 10 }}>
						<Button onPress={() => onClose()} title="X" color={Theme.green} style={styles.button_green} />
					</View>
				</ScrollView>
			</Modal>
		</Wrapper>
	);
};

let _styles = {
	modalView: {
		backgroundColor: "white",
		alignItems: "flex-start",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
};

const styles = StyleSheet.create({
	...getStyles("text_body2, text_header2, text_header3, button_green, button_green_text, text_header4, section, content"),
	..._styles,
});

export default VolunteerModal;
