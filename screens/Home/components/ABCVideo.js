import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { getStyles } from "../../../utils";
import { useStateValue } from "../../../components/State";
import { ResponsiveImage } from "../../../components/ResponsiveImage";
import { Entypo } from "@expo/vector-icons";

const ABCVideo = () => {
	const [{ isWeb, dimensions }] = useStateValue();
	const [abcVideoClicked, setAbcVideoClicked] = useState(false);

	return (
		// // ABC VIDEO HIDDEN TO PROMOTE OUR OWN VIDEO OP AT THE TOP OF THE PAGE
		<View style={[styles.section, { paddingTop: 80 }]}>
			{/* <View style={styles.content}>
				{isWeb ? (
					<div style={{ position: "relative", overflow: "hidden" }}>
						<div style={!abcVideoClicked ? {} : { paddingTop: (272 / 476) * 100 + "%" }} />
						{!abcVideoClicked ? (
							<View style={{ positoin: "relative" }}>
								<TouchableOpacity onPress={(e) => setAbcVideoClicked(true)}>
									<ResponsiveImage
										style={{ width: 1280, height: 720, resizeMode: "contain" }}
										alt="Spicy Green Book ABC Video"
										source={{ uri: "/images/abc_thumbnail.png" }}
									/>
									<View
										style={{
											position: "absolute",
											left: "50%",
											top: "50%",
											marginLeft: 0 - dimensions.width * 0.25 * 0.5,
											marginTop: 0 - dimensions.width * 0.25 * 0.5,
										}}
									>
										<Entypo name="controller-play" size={dimensions.width * 0.25} color="rgba(0,0,0,0.5)" />
									</View>
								</TouchableOpacity>
							</View>
						) : (
							<iframe
								title="abc-video"
								style={{
									overflow: "hidden",
									position: "absolute",
									top: 0,
									bottom: 0,
									right: 0,
									left: 0,
									border: 0,
									background: "#fff",
									frameborder: 0,
								}}
								src="https://abc7.com/video/embed/?pid=9623765"
								width="100%"
								height="100%"
								allowFullScreen
								autoplay
								scrolling="no"
							/>
						)}
					</div>
				) : (
					<WebView
						originWhitelist={["*"]}
						source={{
							html: `
                <div style="position:relative">
                    <div style="paddingTop: ${(272 / 476) * 100}%"></div>
                    <iframe style="
                        overflow: hidden,
                        position: absolute,
                        top: 0,
                        bottom: 0,
                        right: 0,
                        left: 0,
                        border: 0,
                        background: #fff,
                        frameborder:0
                    }} src="https://abc7.com/video/embed/?pid=9623765" width="100%" height="100%" allowFullScreen ></iframe>
                </div>
              `,
						}}
					/>
				)}
			</View> */}
		</View>
	);
};

const styles = StyleSheet.create(getStyles("section, content, middle_all, text_hero, button_green, button_green_text"));

export default ABCVideo;
