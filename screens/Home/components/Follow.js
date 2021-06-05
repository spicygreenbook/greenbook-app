import React from "react";
import { StyleSheet, View, FlatList, Text, Image, ActivityIndicator } from "react-native";
import { Link } from "../../../components/Link";
import { getStyles, Theme } from "../../../utils";
import { getInstagram } from "../../../utils/getData";
import useFetchData from "../../../hooks/useFetchData";
import Alert from "../../../components/Alert";

const Follow = () => {
	const [instagram, loadingInstagram, errorInstagram] = useFetchData(() => getInstagram());

	return (
		<View style={[styles.section]}>
			<View style={[styles.content, { flex: 1 }]}>
				<Link contain href="https://instagram.com/spicygreenbook">
					<Text accessibilityRole="header" aria-level="3" style={[styles.text_header3, { marginBottom: 20 }]}>
						FOLLOW @SPICYGREENBOOK
					</Text>
				</Link>
				{loadingInstagram ? (
					<ActivityIndicator color={Theme.green} size="large" />
				) : errorInstagram ? (
					<Alert severity="error" message={errorInstagram} />
				) : (
					<FlatList
						horizontal={true}
						data={instagram}
						showsHorizontalScrollIndicator={true}
						renderItem={({ item }) => (
							<View style={{ flex: 1, width: 180, margin: 10 }}>
								<Image source={{ uri: item.thumbnail }} style={{ width: 180, height: 180, resizeMode: "cover" }} />
							</View>
						)}
						keyExtractor={(item, index) => "instagram" + index}
					/>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create(getStyles("section, content, text_header3"));

export default Follow;
