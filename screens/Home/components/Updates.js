import React from "react";
import { StyleSheet, View, Text, ActivityIndicator, FlatList } from "react-native";
import { getStyles, Theme } from "../../../utils";
import useFetchData from "../../../hooks/useFetchData";
import { Link } from "../../../components/Link";
import HybridImage from "../../../components/HybridImage";
import Alert from "../../../components/Alert";

const Hero = ({ list }) => {
	const [updates, loadingUpdates, errorUpdates] = useFetchData("updates", list);
	return (
		<View style={[styles.section, { paddingTop: 0 }]}>
			<View style={[styles.content]}>
				<Text accessibilityRole="header" aria-level="3" style={[styles.text_header3, { marginBottom: 20 }]}>
					UPDATES
				</Text>
				{loadingUpdates ? (
					<ActivityIndicator color={Theme.green} size="large" />
				) : errorUpdates ? (
					<Alert severity="error" message={errorUpdates} />
				) : (
					<FlatList
						horizontal={true}
						data={updates.filter((item) => item.image)}
						renderItem={({ item, index }) => {
							function Item() {
								return (
									<React.Fragment>
										<View>
											<HybridImage
												lists={true}
												source={{ uri: item.image.url + "&w=600" }}
												style={{
													width: 300,
													height: 300,
													resizeMode: "cover",
												}}
											/>
										</View>
										<View>
											<Text style={styles.text_header4}>{item.title}</Text>
										</View>
										<View>
											<Text>{item.date}</Text>
										</View>
									</React.Fragment>
								);
							}
							return (
								<View style={{ marginRight: 10, maxWidth: 300 }} key={"update" + index}>
									{item.link ? (
										<Link href={item.link}>
											<Item />
										</Link>
									) : (
										<Item />
									)}
								</View>
							);
						}}
						keyExtractor={(item, index) => "update" + index}
					/>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create(getStyles("content, section, text_header3, text_header4"));

export default Hero;
