import React, { useState, useEffect } from "react";
import { useStateValue } from "../components/State";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Image,
  ImageBackground,
  ActivityIndicator,
  TouchableOpacity,
  Button,
} from "react-native";
import { Link } from "../components/Link";
import { ResponsiveImage } from "../components/ResponsiveImage";
import { getStyles, Theme, getData, GridWidth } from "../utils";
import { parseAddress } from "../utils/cityState";
import { Entypo } from "@expo/vector-icons";
import Search from "../components/Search";
import SGBMap from "../components/SGBMap";
import { getInstagram } from "../utils/getData";
//import { handleRootClick } from '../utils/rootClickHandler';
import { Fontisto } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { WebView } from "react-native-webview";

import { Video } from "expo-av";

let currentIndexListing = 0;
const viewableItemsChangedListing = ({ viewableItems, changed }) => {
  //console.log("Visible items are", viewableItems);
  //console.log("Changed in this iteration", changed);
  currentIndexListing = viewableItems && viewableItems[0] && viewableItems[0].index;
};
const viewableItemsChangedConfigListing = {
  itemVisiblePercentThreshold: 50,
};

function getOffset(el) {
  var _x = 0;
  var _y = 0;
  while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
    _x += el.offsetLeft - el.scrollLeft;
    _y += el.offsetTop - el.scrollTop;
    el = el.offsetParent;
  }
  return { top: _y, left: _x };
}

function Page(props) {
  const [{ isWeb, dimensions }, dispatch] = useStateValue();

  const [loadingPress, setLoadingPress] = useState(!props.press);
  const [errorPress, setErrorPress] = useState("");
  const [press, setPress] = useState(props.press || []);

  const [loadingUpdates, setLoadingUpdates] = useState(!props.updates);
  const [errorUpdates, setErrorUpdates] = useState("");
  const [updates, setUpdates] = useState(props.updates || []);

  const [loadingInstagram, setLoadingInstagram] = useState(true);
  const [instagram, setInstagram] = useState([]);

  const [loadingListings, setLoadingListings] = useState(!props.listings);
  const [errorListings, setErrorListings] = useState("");
  const [Listings, setListings] = useState(props.listings || []);

  const responsiveStyles = StyleSheet.create(getStyles("middle_all, text_header2"));

  useEffect(() => {
    if (!props.press) {
      getData({
        type: "press",
      })
        .then((press) => {
          setLoadingPress(false);
          setPress(press);
        })
        .catch((err) => {
          console.error(err);
          setLoadingPress(false);
          setErrorPress("Failed to load latest press updates.");
        });
    } else {
      console.log("press static is", props.press);
    }

    if (!props.updates) {
      getData({
        type: "updates",
      })
        .then((updates) => {
          setLoadingUpdates(false);
          setUpdates(updates);
        })
        .catch((err) => {
          console.error(err);
          setLoadingUpdates(false);
          setErrorUpdates("Failed to load latest updates.");
        });
    }

    getInstagram().then((instagram) => {
      setLoadingInstagram(false);
      setInstagram(instagram);
    });

    if (!props.listings) {
      getData({
        type: "listing",
      })
        .then((listings) => {
          setLoadingListings(false);
          setListings(listings);
        })
        .catch((err) => {
          console.error(err);
          setLoadingListings(false);
          setErrorListings("Failed to load latest listings.");
        });
    }
  }, []);

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

  return (
    <View>
      <View
        style={{
          height: 80,
          flexDirection: "row",
          backgroundColor: Theme.green_bg,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          accessibilityRole="header"
          fontSize="1"
          aria-level="1"
          style={{ ...responsiveStyles.text_header2, color: 'white' }}

        >
          ABOUT US
        </Text>
      </View>

      <View style={[styles.section, { paddingTop: isWeb ? 20 : 60, paddingBottom: 40 }]}>
        <View style={styles.content}>
          <View style={{ position: "relative", marginBottom: 0 }}>
            <View style={{ paddingTop: (1920 / 1920) * 100 + "%" }} />
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
                  src={"/about.mp4"}
                  style={{ width: "100%", height: "100%" }}
                  controls
                />
              ) : (
                <>
                  {/*!isMobileHomePageVideoPlaying && (
                            <TouchableOpacity
                            onPress={() => {
                                setisMobileHomePageVideoPlaying(true);
                            }}
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                zIndex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                            >
                            <Fontisto
                                name="play"
                                size={46}
                                color="white"
                                style={{
                                padding: 20,
                                backgroundColor: "rgba(0,0,0,0.6)",
                                }}
                            />
                            </TouchableOpacity>
                        )*/}
                  <Video
                    shouldPlay={false /*isMobileHomePageVideoPlaying*/}
                    //posterSource={require("../public/images/home_page_video_thumbnail.jpg")}
                    posterStyle={{ width: "100%", height: "100%" }}
                    source={{ uri: "https://spicygreenbook.org/about.mp4" }}
                    useNativeControls
                    resizeMode="contain"
                    isLooping
                    style={{ flex: 1 }}
                  />
                </>
              )}
            </View>
          </View>
        </View>
      </View>

      <View style={[styles.section, { fontSize: 24, paddingTop: 40, paddingBottom: 40 }]}>
        <View style={styles.content}>
          <View
            style={
              dimensions.width < 700
                ? {}
                : {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingRight: 50,
                  }
            }
          >
            <View style={{ flex: 1 }}>
              <View
                style={
                  dimensions.width < 700
                    ? {}
                    : {
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }
                }
              >
                <View
                  style={
                    dimensions.width < 700
                      ? { paddingTop: 10 }
                      : { flex: 2, paddingLeft: 20 }
                  }
                >
                  <Text
                    accessibilityRole="header"
                    aria-level="3"
                    style={[styles.text_header3, { marginBottom: 20 }]}
                  >
                    WHO WE ARE
                  </Text>
                  <Text style={styles.text_body}>
                    We are Spicy Green Book – a virtual directory for Black-owned food and
                    beverage businesses throughout the US and Canada.
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={[styles.section, { fontSize: 24, paddingTop: 40, paddingBottom: 40 }]}>
        <View style={styles.content}>
          <View
            style={
              dimensions.width < 700
                ? {}
                : {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingRight: 50,
                  }
            }
          >
            <View style={{ flex: 1 }}>
              <View
                style={
                  dimensions.width < 700
                    ? {}
                    : {
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }
                }
              >
                <View
                  style={
                    dimensions.width < 700
                      ? { paddingTop: 40 }
                      : { flex: 2, paddingLeft: 20 }
                  }
                >
                  <Text
                    accessibilityRole="header"
                    aria-level="3"
                    style={[styles.text_header3, { marginBottom: 20 }]}
                  >
                    OUR MISSION
                  </Text>
                  <Text style={styles.text_body}>
                    Our mission is to empower Black-owned food and drink businesses to
                    compete and thrive in the marketplace. We connect customers with these
                    businesses, making it easy for them to participate in what we like to
                    call the ‘Intentional Economy’. Our work enables people to enjoy
                    fantastic food while using their buying power to create a more
                    equitable society.{"\n"}
                    {"\n"}
                    By providing professional creative services free of charge through a
                    legion of passionate volunteers, we get these businesses online and in
                    front of customers. In doing so, we are building substantive
                    relationships and social trust within communities and creating a more
                    equitable society.
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={[styles.section, { fontSize: 24, paddingTop: 40 }]}>
        <View style={styles.content}>
          <View
            style={
              dimensions.width < 700
                ? {}
                : {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingRight: 50,
                  }
            }
          >
            <View style={{ flex: 1 }}>
              <View
                style={
                  dimensions.width < 700
                    ? {}
                    : {
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }
                }
              >
                <View
                  style={
                    dimensions.width < 700
                      ? { paddingTop: 10 }
                      : { flex: 2, paddingLeft: 20 }
                  }
                >
                  <Text
                    accessibilityRole="header"
                    aria-level="3"
                    style={[styles.text_header3, { marginBottom: 20 }]}
                  >
                    WHAT WE DO
                  </Text>
                  <Text style={styles.text_body}>
                    Spicy Green Book provides a wide variety of professional services to
                    Black-owned food and drink business owners. These include online
                    marketing and advertising, content creation, photography and
                    videography, business development education, and more.{"\n"}
                    {"\n"}
                    We do this by getting to know these business owners, understanding
                    their most pressing needs, and fulfilling those needs by pairing them
                    with qualified professional volunteers. Our growing group of
                    volunteers welcomes everyone who wants to spark positive change.
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View
        style={{
          flexDirection: dimensions.width < 800 ? "column" : "row",
          backgroundColor: Theme.green_bg,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "flex-end",
            paddingRight: dimensions.width < 800 ? 0 : 100,
            flex: 1,
          }}
        >
          <View
            style={{
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              flexGrow: 1,
              maxWidth: dimensions.width < 800 ? 1000 : 400,
              paddingLeft: 20,
              paddingRight: 20,
            }}
          >
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                paddingBottom: 10,
              }}
            >
              <Text style={{ fontSize: 24, paddingTop: 40, color: "#ffffff" }}>
                Support for these businesses will:
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "space-between",
                paddingBottom: 10,
              }}
            >
              <FontAwesome
                name="check"
                size={25}
                style={{ color: "white", marginRight: 10 }}
              />
              <Text
                style={{ fontSize: 24, alignSelf: "flex-end", color: "#ffffff", flex: 1 }}
              >
                Decrease the wealth gap
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "space-between",
                paddingBottom: 10,
              }}
            >
              <FontAwesome
                name="check"
                size={25}
                style={{ color: "white", marginRight: 10 }}
              />
              <Text
                style={{ fontSize: 24, alignSelf: "flex-end", color: "#ffffff", flex: 1 }}
              >
                Create more job opportunities
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "space-between",
                paddingBottom: 10,
              }}
            >
              <FontAwesome
                name="check"
                size={25}
                style={{ color: "white", marginRight: 10 }}
              />
              <Text
                style={{ fontSize: 24, alignSelf: "flex-end", color: "#ffffff", flex: 1 }}
              >
                Prevent further injustices
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "space-between",
                paddingBottom: 10,
              }}
            >
              <FontAwesome
                name="check"
                size={25}
                style={{ color: "white", marginRight: 10 }}
              />
              <Text
                style={{ fontSize: 24, alignSelf: "flex-end", color: "#ffffff", flex: 1 }}
              >
                Implement needed reform
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "space-between",
                paddingBottom: 80,
              }}
            >
              <FontAwesome
                name="check"
                size={25}
                style={{ color: "white", marginRight: 10 }}
              />
              <Text
                style={{ fontSize: 24, alignSelf: "flex-end", color: "#ffffff", flex: 1 }}
              >
                Ensure marginalized people will receive the representation they deserve.
              </Text>
            </View>
          </View>
        </View>
        {dimensions.width >= 800 && (
          <View style={{ flex: 1, backgroundColor: "#ffffff", position: "relative" }}>
            <View style={{ position: "absolute", left: -20, top: 20, maxHeight: 550, width: "100%" }}>
              <ResponsiveImage
                style={{ position: "relative", top: 50, width: 400, aspectRatio: 1 }}
                alt="Spicy Green Book"
                source={
                  isWeb
                    ? { uri: "/images/SpicyBookAboutUs.png" }
                    : require("../public/images/SpicyBookAboutUs.png")
                }
                layerColor={"rgba(0,0,0,0.5)"}
              />
            </View>
          </View>
        )}
      </View>

      <View style={{ marginTop: -20, flexDirection: "row", justifyContent: "center" }}>
        <View
          style={{
            flex: 1,
            width: 400,
            shadowOpacity: 0.4,
            shadowRadius: 10,
            backgroundColor: "#fff",
            maxWidth: "80%",
          }}
        >
          <View
            style={{
              flexDirection: "column",
              paddingBottom: 50,
              paddingTop: 50,
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Text
              style={[
                styles.text_body,
                {
                  fontSize: 24,
                  paddingRight: 50,
                  paddingLeft: 50,
                  alignSelf: "center",
                  textAlign: "center",
                  color: "#000",
                },
              ]}
            >
              We help Black-owned food and drink business owners tell their story, sowing
              the seeds of trust, support, and positive change within local communities.
            </Text>
          </View>
        </View>
      </View>

      <View style={[styles.section, { paddingTop: 80, paddingBottom: 40 }]}>
        <View style={styles.content}>
          <View
            style={
              dimensions.width < 700
                ? {}
                : {
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }
            }
          >
            <View
              style={
                dimensions.width < 700 ? { paddingTop: 40 } : { flex: 2, paddingLeft: 20 }
              }
            >
              <Text
                accessibilityRole="header"
                aria-level="3"
                style={[styles.text_header3, { marginBottom: 20 }]}
              >
                OUR INSPIRATION
              </Text>
              <Text style={styles.text_body}>
                From 1936 to 1964, during the Jim Crow era, Black men and women were under
                the persistent threat of violence in the form of lynchings and other hate
                crimes. To help them escape this violence, Victor Green created The Negro
                Motorist Green Book. Our name is an homage to his original creation, a
                guide that led Black travelers to a community of businesses throughout the
                US where they could eat, sleep, and be safe. Spicy Green Book builds on
                Green’s idea, empowering everyone to create and participate in a fairer,
                safer, more just society.
              </Text>
            </View>
            <View
              style={
                dimensions.width < 700
                  ? { paddingLeft: 40, paddingRight: 40 }
                  : { flex: 1, paddingLeft: 80, paddingRight: 80 }
              }
            >
              <ResponsiveImage
                style={{ width: 804, resizeMode: "contain", aspectRatio: 1.37245 }}
                alt="Spicy Green Book"
                source={
                  isWeb
                    ? { uri: "/images/Capture Spicy Green Book dos.png" }
                    : require("../public/images/Capture Spicy Green Book dos.png")
                }
              />
            </View>
          </View>
        </View>
      </View>

      <View style={[styles.section, { paddingTop: 60, paddingBottom: 40 }]}>
        <View style={styles.content}>
          <View
            style={
              dimensions.width < 700
                ? {}
                : {
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }
            }
          >
            <View
              style={
                dimensions.width < 700
                  ? { paddingLeft: 40, paddingRight: 40 }
                  : { flex: 1, paddingLeft: 80, paddingRight: 80 }
              }
            >
              <ResponsiveImage
                style={{ width: 804, resizeMode: "contain", aspectRatio: 1.37245 }}
                alt="Spicy Green Book"
                source={
                  isWeb
                    ? { uri: "/images/spicygreenbookphotorowdos.png" }
                    : require("../public/images/spicygreenbookphotorowdos.png")
                }
              />
            </View>
            <View
              style={
                dimensions.width < 700 ? { paddingTop: 40 } : { flex: 2, paddingLeft: 20 }
              }
            >
              <Text
                accessibilityRole="header"
                aria-level="3"
                style={[styles.text_header3, { marginBottom: 20 }]}
              >
                WHAT EXACTLY IS THE STORY?
              </Text>
              <Text style={styles.text_body}>
                At Spicy Green Book we want to share the stories behind the businesses. We
                want local communities – and the world – to hear the stories of the people
                and cultures that inspired these businesses to open their doors.{"\n"}
                {"\n"}
                We believe that telling these stories will enable people of varying
                backgrounds to get to know the people, cultures, hard work, and love that
                brought these Black-owned businesses to fruition. Through this
                storytelling, we hope to humanize the Black community and change the
                taught perspectives which far too often lead to unnecessary violence and
                systematic oppression.{"\n"}
                {"\n"}
                As people’s understanding changes, we believe more people will see the
                value in Black lives and livelihoods and, as a result, fewer people will
                engage in acts of violence and hatred toward the Black community. We want
                to start a ripple effect of positive change throughout local communities
                and across the country.
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={[styles.section, { paddingTop: 60, paddingBottom: 40 }]}>
        <View style={styles.content}>
          <View
            style={
              dimensions.width < 700
                ? {}
                : {
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }
            }
          >
            <View
              style={
                dimensions.width < 700 ? { paddingTop: 40 } : { flex: 2, paddingLeft: 20 }
              }
            >
              <Text
                accessibilityRole="header"
                aria-level="3"
                style={[styles.text_header3, { marginBottom: 20 }]}
              >
                HOW IS SGB DIFFERENT?
              </Text>
              <Text style={styles.text_body}>
                Spicy Green Book is a space that enables Black-owned businesses to amplify
                their voices. We work closely with each business to make sure that our
                work fits with the owners’ vision and mission. All work is approved by the
                owner before publication.{"\n"}
                {"\n"}
                We are a nonprofit organization, so all contributions received go toward
                the upkeep and growth of the online directory, new SGB projects, and other
                causes which benefit the Black community.
              </Text>
            </View>
            <View
              style={
                dimensions.width < 700
                  ? { paddingLeft: 40, paddingRight: 40 }
                  : { flex: 1, paddingLeft: 80, paddingRight: 80 }
              }
            >
              <ResponsiveImage
                style={{ width: 804, resizeMode: "contain", aspectRatio: 1.37245 }}
                alt="Spicy Green Book"
                source={
                  isWeb
                    ? { uri: "/images/spicygreenbookphotorowtres.png" }
                    : require("../public/images/spicygreenbookphotorowtres.png")
                }
              />
            </View>
          </View>
        </View>
      </View>

      <View style={[styles.section, { paddingTop: 80 }]}>
        <View style={styles.content}>
          {isWeb ? (
            <div style={{ position: "relative" }}>
              <div style={{ paddingTop: (272 / 476) * 100 + "%" }} />
              <iframe
                style={{
                  overflow: "hidden",
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  right: 0,
                  left: 0,
                  border: 0,
                  background: "#fff",
                }}
                src="https://abc7.com/video/embed/?pid=9623765"
                width="100%"
                height="100%"
              />
            </div>
          ) : (
            <WebView
              originWhitelist={["*"]}
              source={{
                html: `
                        <div style="position:relative">
                          <div style="paddingTop: ${(272 / 476) * 100}%"></div>
                          <iframe style={{
                                overflow: hidden,
                                position: absolute,
                                top: 0,
                                bottom: 0,
                                right: 0,
                                left: 0,
                                border: 0,
                                background: #fff
                          }} src="https://abc7.com/video/embed/?pid=9623765" width="100%" height="100%"></iframe>
                        </div>
                    `,
              }}
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create(
  getStyles(
    "button_green, button_white, button_white_text, button_green_text, text_header, text_header2, text_header3, text_header4, text_body, text_quote, section, content, footer"
  )
);

const custom_styles = StyleSheet.create({
  white_default: {
    color: "white",
  },
});

export default Page;
