import React from "react";
import { Modal, ScrollView, StyleSheet, Text, View, Button } from "react-native";
import { useStateValue } from "../components/State";
import { Link } from "../components/Link";
import { getStyles, Theme } from "../utils";
import { FontAwesome } from "@expo/vector-icons";

export default function App(props) {
	const { open, close, data, isWeb } = props;
	const [{ dimensions }] = useStateValue();

	let _styles1 = getStyles("text_body2, text_header2, text_header3, button_green, button_green_text, text_header4, section, content", { isWeb });
	let _styles = {
		default: {
			color: "#B56230",
			fontSize: 22,
			marginRight: 10,
		},
		centeredView: {
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
		},
		overlay: {
			zIndex: 3,
			elevation: 3,
			opacity: open ? 1 : 0,
			pointerEvents: open ? "" : "none",
			position: "fixed",
			top: 0,
			bottom: 0,
			left: 0,
			right: 0,
			backgroundColor: "rgba(0,0,0,0.5)",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "row",
		},
		modal: {
			flex: 1,
			borderWidth: 0,
			width: "100%",
		},
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
			top: dimensions.width < 600 ? 292 : dimensions.width < 900 ? 392 : 592,
			height: isWeb ? "auto" : null,
			maxWidth: 375,
			marginRight: "auto",
			marginLeft: "auto",
		},
		content: {
			flex: 1,
			justifyContent: "center",
			flexDirection: "row",
		},
		linkContainer: {
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "center",
			alignContent: "center",
		},
		shareLink: {
			display: "flex",
			flexDirection: "row",
			marginRight: 10,
			alignItems: "center",
			justifyContent: "center",
		},
		icon: {
			display: "flex",
			flexDirection: "row",
			justifyContent: "center",
			width: dimensions.width < 375 ? 45 : 60,
			height: dimensions.width < 375 ? 45 : 60,
			borderRadius: isWeb ? "50%" : null,
			color: "#fff",
			alignItems: "center",
			backgroundColor: "#B56230",
		},
		linkTitle: {
			marginTop: "8px",
			fontSize: 13,
			alignSelf: "center",
		},
		iconContainer: {
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
		},
		buttonContainer: {
			position: "absolute",
			top: 0,
			right: 0,
			minWidth: 40,
			minHeight: 40,
		},
	};
	const styles = StyleSheet.create({ ..._styles1, ..._styles });

	function WebWrapper(props) {
		return isWeb ? (
			<View
				style={[styles.overlay]}
				onClick={(e) => {
					close();
				}}
			>
				<View
					style={{
						flex: 1,
						maxWidth: "100%",
						height: "100%",
						margin: "0 auto",
					}}
					onClick={(e) => {
						e.stopPropagation();
					}}
				>
					{props.children}
				</View>
			</View>
		) : (
			<React.Fragment>{props.children}</React.Fragment>
		);
	}

	return (
		<WebWrapper isWeb={isWeb}>
			<Modal
				animationType="slide"
				transparent={true}
				visible={open}
				presentationStyle="overFullScreen"
				onRequestClose={() => {
					close();
				}}
				style={styles.modal}
			>
				<ScrollView contentContainerStyle={[styles.modalView]}>
					<View
						style={{
							width: "100%",
							height: "100%",
						}}
					>
						<View
							style={{
								marginHorizontal: 10,
								display: "flex",
								flexDirection: "column",
							}}
						>
							<View>
								<Text style={[styles.text_header4]}>Share</Text>
							</View>
							<ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ width: "100%" }} style={{ marginTop: 15 }}>
								<View style={[styles.linkContainer]}>
									<View style={[styles.shareLink]}>
										<Link href={`https://www.facebook.com/sharer.php?u=https%3A%2F%2Fspicygreenbook.org%2Fbiz%2F${data.uid}`}>
											<View style={[styles.iconContainer]}>
												<FontAwesome name="facebook" size={24} color="#B56230" style={[styles.icon]} />
												<Text style={[styles.text_body2, styles.linkTitle]}>Facebook</Text>
											</View>
										</Link>
									</View>
									<View style={[styles.shareLink]}>
										<Link href={`https://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fspicygreenbook.org%2Fbiz%2F${data.uid}`}>
											<View style={[styles.iconContainer]}>
												<FontAwesome name="linkedin" size={24} color="#B56230" style={[styles.icon]} />
												<Text style={[styles.text_body2, styles.linkTitle]}>LinkedIn</Text>
											</View>
										</Link>
									</View>
									<View style={[styles.shareLink]}>
										<Link href={`mailto:%7Bemail_address%7D?subject=&body=https%3A%2F%2Fspicygreenbook.org%2Fbiz%2F${data.uid}`}>
											<View style={[styles.iconContainer]}>
												<FontAwesome name="envelope" size={24} color="#B56230" style={[styles.icon]} />
												<Text style={[styles.text_body2, styles.linkTitle]}>Email</Text>
											</View>
										</Link>
									</View>
									<View style={[styles.shareLink]}>
										<Link href={`https://twitter.com/intent/tweet?url=https%3A%2F%2Fspicygreenbook.org%2Fbiz%2F${data.uid}`}>
											<View style={[styles.iconContainer]}>
												<FontAwesome name="twitter" size={24} color="#B56230" style={[styles.icon]} />
												<Text style={[styles.text_body2, styles.linkTitle]}>Twitter</Text>
											</View>
										</Link>
									</View>
									<View style={[styles.shareLink]}>
										<Link href={`https://reddit.com/submit?url=https%3A%2F%2Fspicygreenbook.org%2Fbiz%2F${data.uid}`}>
											<View style={[styles.iconContainer]}>
												<FontAwesome name="reddit" size={24} color="#B56230" style={[styles.icon]} />
												<Text style={[styles.text_body2, styles.linkTitle]}>Reddit</Text>
											</View>
										</Link>
									</View>
								</View>
							</ScrollView>
						</View>
					</View>
					<View style={[styles.buttonContainer]}>
						<Button onPress={close} title="X" color={Theme.green} style={styles.button_green} />
					</View>
				</ScrollView>
			</Modal>
		</WebWrapper>
	);
}
