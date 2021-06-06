import React from "react";
import { Platform, Image } from "react-native";
import NextImage from "next/image";
const isWeb = Platform.OS === "web";

//<HybridImageBackground source={} require is needed for native, src needed for web.

export default function HybridImage(props) {
	let src = props.src || (props.source && props.source.uri);
	//console.log('props', props);
	//console.log('source', src)
	return isWeb ? (
		props.lists ? (
			// quick fix updates images not showing on web
			<NextImage src={src} width={300} height={300} objectFit="contain" objectPosition="left top" />
		) : (
			<NextImage {...props} src={src} layout="fill" objectFit="contain" objectPosition="left top" />
		)
	) : (
		<Image {...props} />
	);
}
