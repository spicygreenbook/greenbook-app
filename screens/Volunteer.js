import React, { useState, useEffect, useRef } from "react";
import { useStateValue } from "../components/State";
import { View, Text, StyleSheet, Button, ActivityIndicator, FlatList, TouchableOpacity } from "react-native";
import { PageTitle } from "../components/PageTitle";
import { RichText } from "../components/RichText";
import { Link } from "../components/Link";
import { getStyles, Theme, getContent, getData } from "../utils";
import { ResponsiveImage } from "../components/ResponsiveImage";
import { Video } from "expo-av";
import { AntDesign } from "@expo/vector-icons";
import VolunteerFormLink from "./VolunteerFormLink";

function Page(props) {
	const [{ isWeb, dimensions }] = useStateValue();
	const styles = StyleSheet.create(
		getStyles("text_header2, text_header3, button_green, button_green_text, text_header4, section, container, content", { isWeb }),
	);

	const [pageLoading, setPageLoading] = useState(props.content ? false : true);
	const [content, setContent] = useState(props.content || {});
	const [selectedId, setSelectedId] = useState(null);

	const [loadingRoles, setLoadingRoles] = useState(!props.roles);
	const [setErrorRoles] = useState("");
	const [roles, setRoles] = useState(props.roles || []);
	const [play, setPlay] = useState(false);
	if (!props.content) {
		useEffect(() => {
			getContent({ type: "content", uid: "volunteer" })
				.then((_content) => {
					console.log("_content", _content);
					setContent(_content.content);
					setPageLoading(false);
				})
				.catch((err) => {
					console.error(err);
				});
		}, []);
	}
	useEffect(() => {
		if (!props.roles) {
			getData({
				type: "roles",
			})
				.then((_roles) => {
					setLoadingRoles(false);
					setRoles(_roles);
				})
				.catch((err) => {
					console.error(err);
					setLoadingRoles(false);
					setErrorRoles("Failed to load roles.");
				});
		}
	}, []);

	let state = {};
	roles.forEach((role, index) => {
		state[index] = false;
	});

	const [roleState, setRoleState] = useState({});
	console.log("STATE OF THE ROLE:", roleState);
	console.log("SELECTED ID: ", selectedId);

	let numColumns = dimensions.width < 800 ? 1 : 2;
	let _photo = { value: [] };
	let _use_content = content._body;
	if (isWeb && content._body) {
		_use_content = {
			value: content._body.value.filter((part) => {
				console.log("part", part);
				if (part.type === "image") {
					_photo = { value: [part] };
				}
				return part && part.type !== "image";
			}),
		};
	}
	console.log("photo", _photo);

	const myRef = useRef(null);
	const executeScroll = () => {
		window.scrollTo(0, myRef.current.offsetTop);
	};

	return (
		<React.Fragment>
			{pageLoading || loadingRoles ? (
				<View style={{ marginTop: 200, marginBottom: 200 }}>
					<ActivityIndicator color={Theme.green} size="large" />
				</View>
			) : (
				<React.Fragment>
					<PageTitle title={content.page_title} />

					<View style={styles.container}>
						<VolunteerFormLink text={"The biggest impact we can all have is by getting as many people as possible to patron a business that we have listed."} />
						<View style={styles.content}>
							<View style={{ position: "relative", marginBottom: 0 }}>
								<View style={{ paddingTop: (1080 / 1920) * 100 + "%" }} />
								<View
									style={{
										position: "absolute",
										left: 0,
										top: 0,
										bottom: 0,
										right: 0,
									}}
								>
									{isWeb ? (
										<video
											poster={require("../public/images/volunteer_video_thumbnail.png")}
											src={"/signUp.mp4"}
											style={{ width: "100%", height: "100%" }}
											controls
										/>
									) : (
										<>
											<Video
												shouldPlay={play}
												posterSource={require("../public/images/volunteer_video_thumbnail.png")}
												posterStyle={{ width: "100%", height: "100%" }}
												source={{ uri: "https://spicygreenbook.org/signUp.mp4" }}
												useNativeControls={true}
												// resizeMode="contain"
												isLooping
												usePoster={true}
												style={{ width: "100%", height: "100%" }}
											/>
											{!play ? (
												<TouchableOpacity style={{ position: "relative", bottom: "65%", left: "38%" }} onPress={() => setPlay(!play)}>
													<View style={{ backgroundColor: "rgba(0,0,0,0.3)", width: 70, height: 70, padding: 10, margin: 0 }}>
														<AntDesign name="caretright" size={50} color="white" style={{}} />
													</View>
												</TouchableOpacity>
											) : (
												<></>
											)}
										</>
									)}
								</View>
							</View>
						</View>
					</View>

					<View style={[styles.section, { paddingTop: dimensions.width < 900 ? 0 : 40, paddingBottom: 0 }]}>
						<View style={styles.content}>
							<View style={dimensions.width < 900 ? {} : { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start" }}>
								{/* infographics */}
								<View style={dimensions.width < 900 ? {} : { flex: 2 }}>
									{_photo && _photo.value && _photo.value[0] && (
										<ResponsiveImage
											style={{
												width: _photo.value[0].dimensions.width,
												resizeMode: "contain",
												aspectRatio: _photo.value[0].dimensions.height / _photo.value[0].dimensions.width,
											}}
											alt="Spicy Green Book"
											source={{ uri: _photo.value[0].url }}
										/>
									)}
								</View>

								{/* introduction */}
								<View style={dimensions.width < 900 ? { paddingTop: 0 } : { flex: 3, paddingLeft: 20, marginTop: -40 }}>
									<RichText render={_use_content} isWeb={isWeb} markupStyle={"fancy"} bullet={"check"} />
								</View>
							</View>
						</View>
					</View>

					<View style={[styles.section, { paddingTop: 0, paddingBottom: dimensions.width < 900 ? 0 : 80 }]}>
						<View style={styles.content}>
							{/* list of volunteer roles */}
							<View style={dimensions.width < 900 ? { paddingTop: 0 } : { flex: 2, paddingLeft: 20 }}>
								<FlatList
									nativeID="flatLIST"
									key={"cols" + numColumns}
									data={roles}
									extraData={selectedId}
									numColumns={1}
									renderItem={({ item, index, separators }) => (
										<View
											key={"press" + index}
											style={{
												flex: 1,
												borderBottomColor: "#006633",
												borderBottomWidth: 1,
												borderStyle: "solid",
												paddingTop: 20,
												paddingBottom: dimensions.width > 900 ? 0 : 20,
											}}
										>
											<TouchableOpacity
												onPress={(e) => {
													console.log("pressed");
													setRoleState((prevState) => {
														let newState = {};
														newState[index] = prevState[index] ? false : true;
														return { ...prevState, ...newState };
													});

													console.log("INDEX CURRENTLY AT:", index);
													console.log("PREVIOUS ID:", selectedId);
													if (selectedId === 1) {
														setSelectedId(0);
													} else {
														setSelectedId(1);
													}

													// console.log("SET SELECTED INDEX TO:", selectedId)
												}}
											>
												<Text accessibilityRole="header" aria-level={3} style={[styles.text_header3, { marginTop: dimensions.width < 900 ? 0 : 40 }]}>
													{roleState[index] ? "-" : "+"} {item.title}
												</Text>
											</TouchableOpacity>
											{!!roleState[index] && (
												<View>
													<Text style={[styles.text_body, { marginTop: 10, fontStyle: "italic" }]}>{item.location}</Text>
													<RichText render={item._description} isWeb={isWeb} markupStyle={"fancy"} bullet={"check"} />
													<View style={{ flex: 1, alignSelf: "center", padding: 20 }}>
														<Link contain href="https://forms.gle/vJ114r7J3JkE8jrs9" title="Volunteer">
															<View style={[styles.button_green, { height: 40, marginBottom: 16 }]}>
																<Text style={[styles.button_green_text]}>Volunteer</Text>
															</View>
														</Link>
													</View>
												</View>
											)}
										</View>
									)}
									keyExtractor={(item, index) => "press" + index}
								/>
							</View>
						</View>
					</View>

					<VolunteerFormLink style={{ maxHeight: 144, paddingTop: 40 }} text={"Are you ready to be part of this awesome team?"} />
				</React.Fragment>
			)}
		</React.Fragment>
	);
}

export default Page;
