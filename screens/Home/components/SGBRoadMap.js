import React from "react";
import { StyleSheet, View, Text, Platform } from "react-native";
import { getStyles, getListingsByState } from "../../../utils";
import { useStateValue } from "../../../components/State";
import SGBMap from "../../../components/SGBMap";
import useFetchData from "../../../hooks/useFetchData";

import NewListings from "./NewListings";

const SGBRoadMap = ({ list, navigation }) => {
	const [{ isWeb, dimensions }] = useStateValue();
	const [Listings, loadingListings, errorListings] = useFetchData("listing", list);

	return (
		<>
			<NewListings Listings={Listings} loadingListings={loadingListings} errorListings={errorListings} navigation={navigation} />
			<View
				style={[
					styles.section,
					{
						flex: 1,
						paddingBottom: 0,
						paddingTop: isWeb ? (dimensions.width < 500 ? 60 : 86) : 80,
						marginBottom: 60,
					},
				]}
			>
				<View style={[styles.content, { flex: 1 }]}>
					<Text accessibilityRole="header" aria-level="3" style={[styles.text_header3, { marginBottom: 30 }]}>
						WHERE WE'RE AT
					</Text>

					<View style={{ alignSelf: "flex-start" }}>
						<Text style={[styles.text_body3, { fontSize: 18, fontWeight: "bold" }, isWeb && { lineHeight: 36 }]}>We are a growing community of</Text>
						<Text style={[styles.text_body3, { fontSize: 18, fontWeight: "bold" }]}>
							<Text style={[styles.text_header, { fontSize: 26, fontWeight: "normal" }, { lineHeight: isWeb ? 1 : Platform.OS === "ios" ? 0 : 30 }]}>
								{Listings.length}
							</Text>{" "}
							black-owned business nationwide,
						</Text>
						<Text style={[styles.text_body3, { fontSize: 18, fontWeight: "bold" }, isWeb && { lineHeight: 36 }]}>
							and across{" "}
							<Text style={[styles.text_header, { fontSize: 26, fontWeight: "normal" }, { lineHeight: isWeb ? 1 : Platform.OS === "ios" ? 0 : 30 }]}>
								{Listings.length > 0 ? Object.keys(getListingsByState(Listings)).length : 0}
							</Text>{" "}
							states.
						</Text>
					</View>
					<SGBMap
						style={{
							marginTop: dimensions.width < 700 ? -40 : dimensions.width * -0.11,
						}}
						listings={Listings}
						loadinglistings={loadingListings}
					/>
				</View>
			</View>
		</>
	);
};

const styles = StyleSheet.create(getStyles("section, content, text_header3, text_header, text_body3"));

export default SGBRoadMap;
