import React, { useState, useRef } from "react";
import { useStateValue } from "./State";
import { StyleSheet, View } from "react-native";
import { getStyles } from "../utils";
import { Fontisto } from "@expo/vector-icons";
import { Video } from "expo-av";

const VideoPlayer = ({ source, posterSource }) => {
	const [{ isWeb, dimensions }] = useStateValue();
	const [isPLaying, setIsPlaying] = useState(false);
	const videoRef = useRef(null);

	return (
		<View style={[styles.section, { marginTop: isWeb ? 0 : 40 }]}>
			<View style={[styles.content, { justifyContent: "center", alignItems: "center" }]}>
				{!isPLaying && (
					<Fontisto
						name="play"
						size={34}
						color="white"
						style={{ padding: 20, backgroundColor: "rgba(0,0,0,0.6)", position: "absolute", zIndex: 1 }}
						onPress={() => {
							setIsPlaying(!isPLaying);
							videoRef.current.playAsync();
						}}
					/>
				)}
				<Video
					ref={videoRef}
					posterSource={posterSource}
					posterStyle={{ width: "100%", height: isWeb ? "100%" : 219 }}
					source={{ uri: source }}
					useNativeControls
					resizeMode="contain"
					isLooping
					usePoster={true}
					style={{ alignSelf: "center", width: "100%", height: isWeb ? (dimensions.width < 500 ? 219 : "100%") : 219 }}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create(getStyles("section, content"));

export default VideoPlayer;
