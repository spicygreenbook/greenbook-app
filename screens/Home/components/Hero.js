import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { getStyles } from "../../../utils";
import HybridImageBackground from "../../../components/HybridImageBackground";
import Search from "../../../components/Search";

const Hero = () => (
	<View style={{ height: 700, backgroundColor: "#000" }}>
		<HybridImageBackground source={require("../../../public/images/home_hero_crop.png")} src={"/images/home_hero_crop.png"} style={{ height: 700 }}>
			<View style={{ backgroundColor: "rgba(0, 0, 0, 0.48)", height: 700 }}>
				<View style={[responsiveStyles.middle_all, { flex: 1, alignItems: "stretch", padding: 20 }]}>
					<Text accessibilityRole="header" aria-level="1" style={responsiveStyles.text_hero}>
						Support{"\n"}
						Black-Owned{"\n"}
						Businesses
					</Text>
					<View style={{ marginTop: 40 }}>
						<Search includeUseLocationOption />
					</View>
				</View>
			</View>
		</HybridImageBackground>
	</View>
);

const responsiveStyles = StyleSheet.create(getStyles("middle_all, text_hero"));

export default Hero;
