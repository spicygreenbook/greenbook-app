import React, { useRef } from "react";
import { StyleSheet, View, ActivityIndicator, FlatList, Text, TouchableOpacity } from "react-native";
import { useStateValue } from "../../../components/State";
import { getStyles, Theme } from "../../../utils";
import { parseAddress } from "../../../utils/cityState";
import HybridImageBackground from "../../../components/HybridImageBackground";
import Alert from "../../../components/Alert";
import { Entypo } from "@expo/vector-icons";
import Button from "../../../components/Button";

const viewableItemsChangedConfigListing = {
	itemVisiblePercentThreshold: 50,
};

const NewListings = ({ Listings, loadingListings, errorListings, navigation }) => {
	const [{ dimensions }, dispatch] = useStateValue();

	let newListingRef;
	const scrollToIndexListing = (obj, len) => {
		if (obj.index < 0) {
			obj.index = 0;
		}
		if (obj.index > len - 1) {
			obj.index = len - 1;
		}
		if (newListingRef) {
			newListingRef.scrollToIndex(obj);
		} else {
			console.log("no listing ref");
		}
	};

	let currentIndexListing = useRef(0);
	const viewableItemsChangedListing = useRef(({ viewableItems, changed }) => {
		//console.log("Visible items are", viewableItems);
		//console.log("Changed in this iteration", changed);
		currentIndexListing.current = viewableItems && viewableItems[0] && viewableItems[0].index;
	});

	return (
		<View style={{ backgroundColor: "#000", position: "relative" }}>
			{loadingListings ? (
				<ActivityIndicator color={Theme.green} size="large" />
			) : errorListings ? (
				<Alert severity="error" message={errorListings} />
			) : (
				<React.Fragment>
					<FlatList
						horizontal
						showsHorizontalScrollIndicator={false}
						data={Listings.sort((a, b) => b.updated - a.updated)
							.slice(0, 10)
							.sort((a, b) => a.time - b.time)
							.filter((item) => item.images && item.images[0] && item.images[0].image)
							.slice(0, 10)}
						ref={(ref) => {
							newListingRef = ref;
						}}
						onViewableItemsChanged={viewableItemsChangedListing.current}
						viewabilityConfig={viewableItemsChangedConfigListing}
						renderItem={({ item, index, separators }) => {
							const address = item.address && item.address[0];
							const parsedAddress = address ? parseAddress(address) : null;

							return (
								<>
									<HybridImageBackground source={{ uri: item.images[0].image.url }} style={{ width: dimensions.width, height: 700 }} />
									<View
										style={{
											position: "absolute",
											left: 0,
											top: 0,
											bottom: 0,
											right: 0,
											backgroundColor: "rgba(0,0,0,0.5)",
											paddingTop: 80,
											paddingBottom: 80,
											paddingLeft: 20,
											paddingRight: 20,
											flexDirection: "column",
											justifyContent: "space-between",
										}}
									>
										<View style={{ flex: 2 }}>
											<Text style={[styles.text_header3, { color: "#fff" }]}>NEW LISTING</Text>
										</View>
										<View style={{ flex: 1, height: 200 }}></View>
										<View style={{ flex: 2 }}>
											<Text accessibilityRole="header" aria-level="3" style={[styles.text_header2, { color: "#fff" }]}>
												{item.name}
											</Text>
											{parsedAddress ? (
												<Text style={[styles.text_header3, { color: "#fff" }]}>
													{parsedAddress.city}, {parsedAddress.state}
												</Text>
											) : null}
											<Button
												color="primary"
												href="/biz/[name]"
												as={`/biz/${item.uid}`}
												contain
												onPress={() => {
													dispatch({
														type: "setView",
														view: "/biz/" + item.uid,
													});
													navigation.navigate("Directory", {
														screen: "Listing",
														home: true,
													});
												}}
											>
												Learn more
											</Button>
										</View>
									</View>
								</>
							);
						}}
						keyExtractor={(item, index) => "listing" + index}
					/>
					<View
						style={{
							position: "absolute",
							top: "50%",
							marginTop: -100,
							left: 10,
							right: 10,
							height: 200,
							flex: 1,
						}}
					>
						<View style={{ justifyContent: "space-between", flexDirection: "row" }}>
							<View style={{ flex: 1 }}>
								<TouchableOpacity
									onPress={(e) =>
										scrollToIndexListing(
											{
												animated: true,
												index: currentIndexListing.current - 1,
											},
											10,
										)
									}
								>
									<Entypo name="chevron-thin-left" size={48} color="#fff" />
								</TouchableOpacity>
							</View>
							<View style={{ flex: 1, alignItems: "flex-end" }}>
								<TouchableOpacity
									onPress={(e) =>
										scrollToIndexListing(
											{
												animated: true,
												index: currentIndexListing.current + 1,
											},
											10,
										)
									}
								>
									<Entypo name="chevron-thin-right" size={48} color="#fff" />
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</React.Fragment>
			)}
		</View>
	);
};

const styles = StyleSheet.create(
	getStyles(
		"button_green, button_white, button_white_text, button_green_text, text_header, text_header2, text_header3, text_header4, text_body, text_body3, text_quote, section, content, footer",
	),
);

export default NewListings;
