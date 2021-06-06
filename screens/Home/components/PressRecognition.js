import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { getStyles, Theme, GridWidth } from "../../../utils";
import { Link } from "../../../components/Link";
import useFetchData from "../../../hooks/useFetchData";
import HybridImage from "../../../components/HybridImage";
import Alert from "../../../components/Alert";

const PressRecognition = ({ list }) => {
	const [press, loadingPress, errorPress] = useFetchData("press", list);

	return (
		<View
			style={{
				backgroundColor: Theme.green_bg,
				padding: 20,
				paddingTop: 60,
				paddingBottom: 60,
			}}
		>
			<View
				style={{
					justifyContent: "center",
					flexDirection: "row",
					flexWrap: "wrap",
				}}
			>
				{loadingPress ? (
					<ActivityIndicator color={Theme.green} size="large" />
				) : errorPress ? (
					<Alert severity="error" message={errorPress} />
				) : (
					<React.Fragment>
						{press
							.filter((pressRow) => pressRow.press_site_logo_white)
							.sort((a, b) => {
								if (a.name && a.name.indexOf("ABC") > -1) {
									return -1;
								}
								return 0;
							})
							.map((pressRow, p) => (
								<View style={{ width: GridWidth({ minWidth: 140 }), margin: 20, height: 40 }} key={"press" + p}>
									<Link href={pressRow.link}>
										<HybridImage
											source={{ uri: pressRow.press_site_logo_white.url + "&w=300" }}
											style={{ height: "100%", resizeMode: "contain" }}
											objectFit="contain"
										/>
									</Link>
								</View>
							))}
					</React.Fragment>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create(getStyles("section, content"));

export default PressRecognition;
