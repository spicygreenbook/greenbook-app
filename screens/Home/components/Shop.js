import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { getStyles, Theme } from "../../../utils";
import { ResponsiveImage } from "../../../components/ResponsiveImage";
import { useStateValue } from "../../../components/State";
import { Link } from "../../../components/Link";

const Shop = () => {
	const [{ isWeb, dimensions }] = useStateValue();

	return (
		<View style={[styles.section, { backgroundColor: Theme.green_bg, paddingTop: 80 }]}>
			<View style={styles.content}>
				<View
					style={
						dimensions.width < 700
							? {}
							: {
									flexDirection: "row",
									flexWrap: "wrap",
									justifyContent: "space-between",
									alignItems: "center",
							  }
					}
				>
					<View style={dimensions.width < 700 ? {} : { flex: 2 }}>
						<ResponsiveImage
							style={{
								width: 797,
								height: 381,
								resizeMode: "contain",
								aspectRatio: 0.4780426599749059,
							}}
							alt="Spicy Green Book"
							source={isWeb ? { uri: "/images/home_store_image_new.png" } : require("../../../public/images/home_store_image_new.png")}
						/>
					</View>
					<View
						style={
							dimensions.width < 700
								? {
										paddingTop: 40,
										justifyContent: "center",
										alignItems: "center",
								  }
								: { flex: 1, paddingLeft: 20 }
						}
					>
						<View style={{ flex: 1, maxWidth: 400, textAlign: "center" }}>
							<Text
								accessibilityRole="header"
								aria-level="1"
								style={[
									styles.text_hero,
									dimensions.width < 700 ? { fontSize: 42, lineHeight: 42 } : { fontSize: 56, lineHeight: 60 },
									{ textAlign: dimensions.width < 700 ? "center" : "left" },
								]}
							>
								Visit Our Store
							</Text>
						</View>
						<Link href="https://shop.spicygreenbook.org">
							<View style={{ width: 200, marginTop: 20 }}>
								<View
									style={[
										styles.button_green,
										{
											borderColor: "#fff",
											justifyContent: "center",
											alignItems: "center",
										},
									]}
								>
									<Text style={[styles.button_green_text, { textAlign: "center", color: "#fff" }]}>Shop Now</Text>
								</View>
							</View>
						</Link>
					</View>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create(getStyles("section, content, middle_all, text_hero, button_green, button_green_text"));

export default Shop;
