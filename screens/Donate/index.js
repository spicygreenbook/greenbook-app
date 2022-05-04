import React from "react";
import { View, Text, StyleSheet, ActivityIndicator, Linking, Image } from "react-native";
import { getStyles, Theme } from "../../utils";
import { useFetchContent } from "../../hooks/useFetchData";
import { useStateValue } from "../../components/State";
import { Link } from "../../components/Link";
import { PageTitle } from "../../components/PageTitle";
import Stripe from "../../components/Stripe";
import { DonateButtons } from "../../components/DonateButtons";
import Alert from "../../components/Alert";

function Page(props) {
	const [{ isWeb, dimensions }] = useStateValue();
	const [content, pageLoading, error] = useFetchContent("donate", props.content);

	const Part = ({ children, title, imgSrc, containerStyle }) => (
		<View style={dimensions.width < 900 ? { paddingTop: 40 } : { paddingTop: 0, marginBottom: 80 }}>
			<View style={isWeb ? (dimensions.width < 900 ? {} : containerStyle ? containerStyle : { flexDirection: "row" }) : {}}>
				<View style={{ flexDirection: "column", flex: 1 }}>
					<Text style={[styles.text_header3, { marginBottom: 20 }]}>{title}</Text>
					<Text style={[styles.text_body, { lineHeight: isWeb ? 27 : 23 }]}>{children}</Text>
				</View>

				{isWeb && imgSrc && (
					<Image style={{ width: dimensions.width < 900 ? "100%" : 300, resizeMode: "contain", marginHorizontal: 20 }} alt="Spicy Green Book" source={imgSrc} />
				)}
			</View>
		</View>
	);

	return (
		<React.Fragment>
			{pageLoading ? (
				<View style={{ marginTop: 200, marginBottom: 200 }}>
					<ActivityIndicator color={Theme.green} size="large" />
				</View>
			) : (
				<React.Fragment>
					<PageTitle title={content.page_title} />
					{error ? (
						<Alert severity="error" message={error} />
					) : (
						<View style={[styles.section]}>
							<View style={styles.content}>
								<Part title="Why Donate?">
									As a donor and active volunteer, your role cannot be overstated. Spicy Green Book is a nonprofit organization that relies on volunteers and
									donations to continuously spark change in Black communities. More than just a donation, we welcome you to make an{" "}
									<Text style={{ color: "#01717C" }}>investment</Text>. An investment that will work to help a marginalized people. All contributions are put
									directly towards the upkeep and expansion of Spicy Green Book. Your contribution is will be used to directly aid our mission in abolishing
									social injustice, by providing promotional services to small businesses, or by aiding expansion into Black communities around the nation.
									Encourage your networks to also support the mission of Spicy Green Book.
								</Part>

								<Part title="Transparency" imgSrc={isWeb ? { uri: "/images/search.png" } : require("../../public/images/search.png")}>
									Transparency is fundamental to our organization's purpose and success. It is important to us that our donors know exactly how we work to
									create change within their communities. We do not charge the businesses to be listed on Spicy Green Book. We are grateful for the support of
									our dedicated donors. Our work would not be possible without you. Your contributions will go to the upkeep of the site, and addition of new
									resources and events. Spicy Green Book is a 501(c)(3) nonprofit organization, EIN 85-1876971.
								</Part>

								<Part
									title="How Do I Donate?"
									imgSrc={isWeb ? { uri: "/images/donate.png" } : require("../../public/images/donate.png")}
									containerStyle={{ flexDirection: "row-reverse" }}
								>
									That is great news! For just as little as $5.00/month you can help sponsor the growth of Spicy Green Book. Spicy Green Book combines your
									monthly support with the support of other sponsors — creating a "ripple effect" of positive change and funding long term community
									development. Hit the donate button below where you can pick the recurring donation of your choice.
									{isWeb && (
										<Text style={{ color: "#01717C" }}>
											{"\n"}
											{"\n"}1. Fill out the form at the bottom of the page
											{"\n"}2. Donate via PayPal with the donate button below
											{"\n"}3. Donate via Cash App with the button below
										</Text>
									)}
								</Part>

								<Part title="I Want to Continue to Support the Growth of Spicy Green Book">
									That is great news! For just as little as $5.00/month you can help sponsor the growth of Spicy Green Book. Spicy Green Book combines your
									monthly support with the support of other sponsors — creating a "ripple effect" of positive change and funding long term community
									development. Hit the donate button below where you can pick the recurring donation of your choice.
								</Part>

								{isWeb ? (
									<View style={[styles.content]}>
										<DonateButtons />
									</View>
								) : (
									<View style={[styles.section, { alignSelf: "center" }]}>
										<Link href="https://spicygreenbook.org/donate" contain onPress={() => Linking.openURL("https://spicygreenbook.org/donate")}>
											<View style={[styles.button_green, { marginTop: 65 }]}>
												<Text style={[styles.button_green_text]}>Go To Online Donation Form</Text>
											</View>
										</Link>
									</View>
								)}

								{isWeb && (
									<View style={[styles.content, { alignItems: "center" }]}>
										<Stripe form="donate" />
									</View>
								)}
							</View>
						</View>
					)}
				</React.Fragment>
			)}
		</React.Fragment>
	);
}

const styles = StyleSheet.create({
	...getStyles("text_header3, section, content, button_green, button_green_text, text_body"),
});

export default Page;
