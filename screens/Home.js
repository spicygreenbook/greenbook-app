import React, { useState, useRef } from "react";
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
  Linking,
  Platform
} from "react-native";
import { Link } from "../components/Link";
import HybridImageBackground from "../components/HybridImageBackground";
import HybridImage from "../components/HybridImage";
import { ResponsiveImage } from "../components/ResponsiveImage";
import {
  getStyles,
  Theme,
  getData,
  getListingsByState,
  GridWidth
} from "../utils";
import { parseAddress } from "../utils/cityState";
import { Entypo } from "@expo/vector-icons";
import Search from "../components/Search";
import SGBMap from "../components/SGBMap";
import { getInstagram } from "../utils/getData";
import { handleRootClick } from "../utils/rootClickHandler";
import { Fontisto } from "@expo/vector-icons";
import AppStoreIconBadge from "../public/app-store.svg";
import GooglePlayIconBadge from "../public/google-play.svg";
import CallToAction from "./Home/CallToAction";
import Testimonial from "./Home/Testimonial";
import useFetchData from "../hooks/useFetchData";
import { WebView } from "react-native-webview";
import SubscribeSection from "../components/SubscribeSection";
import { Video } from "expo-av";

const viewableItemsChangedConfigListing = {
  itemVisiblePercentThreshold: 50
};

function Page(props) {
  const [{ isWeb, dimensions }, dispatch] = useStateValue();

  const [instagram, loadingInstagram, errorInstagram] = useFetchData(() =>
    getInstagram()
  );
  const [updates, loadingUpdates, errorUpdates] = useFetchData(
    "updates",
    props.updates
  );
  const [press, loadingPress, errorPress] = useFetchData("press", props.press);
  const [Listings, loadingListings, errorListings] = useFetchData(
    "listing",
    props.listings
  );
  const [testimonials, loadingTestimonial, errorTestimonials] = useFetchData(
    "testimonial",
    props.testimonials
  );
  const [abcVideoClicked, setAbcVideoClicked] = useState(false);
  const [
    isMobileHomePageVideoPlaying,
    setisMobileHomePageVideoPlaying
  ] = useState(false);

  const responsiveStyles = StyleSheet.create(
    getStyles("middle_all, text_hero")
  );

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
    currentIndexListing.current =
      viewableItems && viewableItems[0] && viewableItems[0].index;
  });

  return (
    <>
      <View style={{ height: 700, backgroundColor: "#000" }}>
        <HybridImageBackground
          source={require("../public/images/home_hero_crop.png")}
          src={"/images/home_hero_crop.png"}
          style={{ height: 700 }}
        >
        <View
          style={{backgroundColor: 'rgba(0, 0, 0, 0.48)', height: 700}}
        >
          <View
            style={[
              responsiveStyles.middle_all,
              { flex: 1, alignItems: "stretch", padding: 20 }
            ]}
          >
            <Text
              accessibilityRole="header"
              aria-level="1"
              style={responsiveStyles.text_hero}
            >
              Support{"\n"}
              Black-Owned{"\n"}
              Businesses
            </Text>
            <View style={{ marginTop: 40 }}>
              <Search includeUseLocationOption />
            </View>
          </View>
        </View>
        </HybridImageBackground>
      </View>

      {isWeb && (
        <View
          style={{
            flexDirection: dimensions.width > 624 ? "row" : "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 10
          }}
        >
          <Text
            accessibilityRole="header"
            aria-level="3"
            style={[
              styles.text_header3,
              { fontSize: 36, marginBottom: dimensions.width > 624 ? 0 : 10 }
            ]}
          >
            DOWNLOAD OUR APP
          </Text>
          <View
            style={{
              marginLeft: 32,
              marginRight: 32,
              display: dimensions.width > 624 ? "flex" : "none"
            }}
          >
            <Fontisto name="arrow-right-l" size={46} color={Theme.green} />
          </View>
          <Link href="https://apps.apple.com/us/app/spicy-green-book/id1538472288">
            <img
              id="download-app"
              style={{ height: 45 }}
              src={AppStoreIconBadge}
            />
          </Link>
          <Link href="https://play.google.com/store/apps/details?id=com.spicygreenbook.app">
            <img style={{ height: 66 }} src={GooglePlayIconBadge} />
          </Link>
        </View>
      )}

      <View style={[styles.section, { paddingTop: isWeb ? 20 : 60 }]}>
        <View style={styles.content}>
          <View style={{ position: "relative", marginBottom: 40 }}>
            <View style={{ paddingTop: (1080 / 1920) * 100 + "%" }} />
            <View
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                right: 0
              }}
            >
              {isWeb ? (
                <video
                  poster={require("../public/images/home_page_video_thumbnail.jpg")}
                  src={"/intro.mp4"}
                  style={{ width: "100%", height: "100%" }}
                  controls
                />
              ) : (
                <>
                  {!isMobileHomePageVideoPlaying && (
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
                        alignItems: "center"
                      }}
                    >
                      <Fontisto
                        name="play"
                        size={46}
                        color="white"
                        style={{
                          padding: 20,
                          backgroundColor: "rgba(0,0,0,0.6)"
                        }}
                      />
                    </TouchableOpacity>
                  )}
                  <Video
                    shouldPlay={isMobileHomePageVideoPlaying}
                    posterSource={require("../public/images/home_page_video_thumbnail.jpg")}
                    posterStyle={{ width: "100%", height: "100%" }}
                    source={{ uri: "https://spicygreenbook.org/intro.mp4" }}
                    useNativeControls
                    resizeMode="contain"
                    isLooping
                    usePoster={true}
                    style={{ flex: 1 }}
                  />
                </>
              )}
            </View>
          </View>

          <View
            style={
              dimensions.width < 700
                ? {}
                : {
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    alignItems: "center"
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
                style={{
                  width: 804,
                  resizeMode: "contain",
                  aspectRatio: 1.37245
                }}
                alt="Spicy Green Book"
                source={
                  isWeb
                    ? { uri: "/images/home_green_book.png" }
                    : require("../public/images/home_green_book.png")
                }
              />
            </View>
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
                ABOUT SGB
              </Text>
              <Text style={[styles.text_body, { color: "#000" }]}>
                Inspired by Victor Green, Spicy Green Book is a team of
                committed volunteers compiling a directory of Black owned
                businesses and performing marketing services for these
                businesses free of charge. We are establishing a space for
                people who seek to create change, and creating a platform for
                them to invest in Black business owners in their communities.
              </Text>
              <Link
                href="/about"
                contain
                onPress={() => props.navigation.navigate("About")}
              >
                <View style={[styles.button_green, { marginTop: 40 }]}>
                  <Text style={[styles.button_green_text]}>Learn More</Text>
                </View>
              </Link>
            </View>
          </View>
        </View>
      </View>

      <View
        style={{
          backgroundColor: Theme.green_bg,
          padding: 20,
          paddingTop: 60,
          paddingBottom: 60
        }}
      >
        <View
          style={{
            justifyContent: "center",
            flexDirection: "row",
            flexWrap: "wrap"
          }}
        >
          {loadingPress ? (
            <ActivityIndicator color={Theme.green} size="large" />
          ) : errorPress ? (
            <Text>{errorPress}</Text>
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
                  <View
                    style={{
                      width: GridWidth({ minWidth: 140 }),
                      margin: 20,
                      height: 40
                    }}
                    key={"press" + p}
                  >
                    <Link href={pressRow.link}>
                      <HybridImage
                        source={{
                          uri: pressRow.press_site_logo_white.url + "&w=300"
                        }}
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

      {/* Divider */}
      <View style={{ height: 5, backgroundColor: "#000" }} />

      <View style={{ backgroundColor: "#000", position: "relative" }}>
        {loadingListings ? (
          <ActivityIndicator color={Theme.green} size="large" />
        ) : errorListings ? (
          <Text style={{ color: "#fff" }}>{errorListings}</Text>
        ) : (
          <React.Fragment>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={Listings.sort((a, b) => b.updated - a.updated)
                .slice(0, 10)
                .sort((a, b) => a.time - b.time)
                .filter(
                  (item) =>
                    item.images && item.images[0] && item.images[0].image
                )
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
                  <View>
                    <HybridImageBackground
                      source={{ uri: item.images[0].image.url }}
                      style={{ width: dimensions.width, height: 700 }}
                    />
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
                        justifyContent: "space-between"
                      }}
                    >
                      <View style={{ flex: 2 }}>
                        <Text style={[styles.text_header3, { color: "#fff" }]}>
                          NEW LISTING
                        </Text>
                      </View>
                      <View style={{ flex: 1, height: 200 }}></View>
                      <View style={{ flex: 2 }}>
                        <Text
                          accessibilityRole="header"
                          aria-level="3"
                          style={[styles.text_header2, { color: "#fff" }]}
                        >
                          {item.name}
                        </Text>
                        {parsedAddress ? (
                          <Text
                            style={[styles.text_header3, { color: "#fff" }]}
                          >
                            {parsedAddress.city}, {parsedAddress.state}
                          </Text>
                        ) : null}
                        <Link
                          href="/biz/[name]"
                          as={`/biz/${item.uid}`}
                          contain
                          onPress={() => {
                            dispatch({
                              type: "setView",
                              view: "/biz/" + item.uid
                            });
                            props.navigation.navigate("Directory", {
                              screen: "Listing",
                              home: true
                            });
                          }}
                        >
                          <View
                            style={[styles.button_white, { marginTop: 40, maxWidth: 200, justifyContent: "center" }]}
                          >
                            <Text style={styles.button_white_text}>
                              Learn More
                            </Text>
                          </View>
                        </Link>
                      </View>
                    </View>
                  </View>
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
                flex: 1
              }}
            >
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row"
                }}
              >
                <View style={{ flex: 1 }}>
                  <TouchableOpacity
                    onPress={(e) =>
                      scrollToIndexListing(
                        {
                          animated: true,
                          index: currentIndexListing.current - 1
                        },
                        10
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
                          index: currentIndexListing.current + 1
                        },
                        10
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

      {/* Map */}
      <View
        style={[
          styles.section,
          {
            flex: 1,
            paddingBottom: 0,
            paddingTop: isWeb ? (dimensions.width < 500 ? 60 : 86) : 80,
            marginBottom: 60
          }
        ]}
      >
        <View style={[styles.content, { flex: 1 }]}>
          <Text
            accessibilityRole="header"
            aria-level="3"
            style={[styles.text_header3, { marginBottom: 30 }]}
          >
            WHERE WE'RE AT
          </Text>

          <View style={{ alignSelf: "flex-start" }}>
            <Text
              style={[
                styles.text_body3,
                { fontSize: 18, fontWeight: "bold" },
                isWeb && { lineHeight: 36 }
              ]}
            >
              We are a growing community of
            </Text>
            <Text
              style={[styles.text_body3, { fontSize: 18, fontWeight: "bold" }]}
            >
              <Text
                style={[
                  styles.text_header,
                  { fontSize: 26, fontWeight: "normal" },
                  { lineHeight: isWeb ? 1 : Platform.OS === "ios" ? 0 : 30 }
                ]}
              >
                {Listings.length}
              </Text>{" "}
              black-owned business nationwide,
            </Text>
            <Text
              style={[
                styles.text_body3,
                { fontSize: 18, fontWeight: "bold" },
                isWeb && { lineHeight: 36 }
              ]}
            >
              and across{" "}
              <Text
                style={[
                  styles.text_header,
                  { fontSize: 26, fontWeight: "normal" },
                  { lineHeight: isWeb ? 1 : Platform.OS === "ios" ? 0 : 30 }
                ]}
              >
                {Listings.length > 0
                  ? Object.keys(getListingsByState(Listings)).length
                  : 0}
              </Text>{" "}
              states.
            </Text>
          </View>
          <SGBMap
            style={{
              marginTop: dimensions.width < 700 ? -40 : dimensions.width * -0.11
            }}
            listings={Listings}
            loadingListings={loadingListings}
          />
        </View>
      </View>

      <View
        style={[
          styles.section,
          { backgroundColor: Theme.green_bg, paddingTop: 80 }
        ]}
      >
        <View style={styles.content}>
          <View
            style={
              dimensions.width < 700
                ? {}
                : {
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }
            }
          >
            <View style={dimensions.width < 700 ? {} : { flex: 2 }}>
              <ResponsiveImage
                style={{
                  width: 797,
                  height: 381,
                  resizeMode: "contain",
                  aspectRatio: 0.4780426599749059
                }}
                alt="Spicy Green Book"
                source={
                  isWeb
                    ? { uri: "/images/home_store_image_new.png" }
                    : require("../public/images/home_store_image_new.png")
                }
              />
            </View>
            <View
              style={
                dimensions.width < 700
                  ? {
                      paddingTop: 40,
                      justifyContent: "center",
                      alignItems: "center"
                    }
                  : { flex: 1, paddingLeft: 20 }
              }
            >
              <View style={{ flex: 1, maxWidth: 400, textAlign: "center" }}>
                <Text
                  accessibilityRole="header"
                  aria-level="1"
                  style={[
                    responsiveStyles.text_hero,
                    dimensions.width < 700
                      ? { fontSize: 42, lineHeight: 42 }
                      : { fontSize: 56, lineHeight: 60 },
                    { textAlign: dimensions.width < 700 ? "center" : "left" }
                  ]}
                >
                  Visit Our Store
                </Text>
              </View>
              <Link href="https://shop.spicygreenbook.org">
                <View style={{ width: 200, marginTop: 20 }}>
                  <View
                    style={[
                      styles.button_green,
                      {
                        borderColor: "#fff",
                        justifyContent: "center",
                        alignItems: "center"
                      }
                    ]}
                  >
                    <Text
                      style={[
                        styles.button_green_text,
                        { textAlign: "center", color: "#fff" }
                      ]}
                    >
                      Shop Now
                    </Text>
                  </View>
                </View>
              </Link>
            </View>
          </View>
        </View>
      </View>

      {/* ABC VIDEO HIDDEN TO PROMOTE OUR OWN VIDEO OP AT THE TOP OF THE PAGE
            <View style={[styles.section, { paddingTop: 80 }]}>
                <View style={styles.content}>
                    {isWeb ? (
                        <div style={{position: 'relative', overflow: 'hidden'}}>
                            <div style={!abcVideoClicked ? {} : {paddingTop: ((272/476)*100) + '%'}} />
                                {!abcVideoClicked ? (
                                    <View style={{positoin: 'relative'}}>
                                        <TouchableOpacity onPress={e => setAbcVideoClicked(true)}>
                                            <ResponsiveImage
                                                style={{width: 1280, height: 720, resizeMode: 'contain'}}
                                                alt="Spicy Green Book ABC Video"
                                                source={{uri: '/images/abc_thumbnail.png'}}
                                            />
                                            <View style={{
                                                position: 'absolute',
                                                left: '50%',
                                                top: '50%',
                                                marginLeft: 0 - ((dimensions.width * 0.25) * 0.5),
                                                marginTop: 0 - ((dimensions.width * 0.25) * 0.5)
                                            }}><Entypo name="controller-play" size={dimensions.width * 0.25} color="rgba(0,0,0,0.5)" /></View>
                                        </TouchableOpacity>
                                    </View>
                                ) : (
                                    <iframe style={{
                                        overflow: 'hidden',
                                        position: 'absolute',
                                        top: 0,
                                        bottom: 0,
                                        right: 0,
                                        left: 0,
                                        border: 0,
                                        background: '#fff',
                                        frameborder: 0
                                    }} src="https://abc7.com/video/embed/?pid=9623765" width="100%" height="100%" allowFullScreen autoplay scrolling="no"/>
                                )}
                            </div>
                        ) : (
                            <WebView 
                                originWhitelist={['*']}
                                source={{html: `
                                   <div style="position:relative">
                                        <div style="paddingTop: ${((272/476)*100)}%"></div>
                                        <iframe style="
                                            overflow: hidden,
                                            position: absolute,
                                            top: 0,
                                            bottom: 0,
                                            right: 0,
                                            left: 0,
                                            border: 0,
                                            background: #fff,
                                            frameborder:0
                                        }} src="https://abc7.com/video/embed/?pid=9623765" width="100%" height="100%" allowFullScreen ></iframe>
                                    </div>
                                `}}
                            />
                        )}
                    </View>
                </View>
            /*}}

      {/* Call to Action Section: "BECOME A ..." */}
      <CallToAction />


            {/* Testimonials */}
      {loadingTestimonial ? (
        <ActivityIndicator color={Theme.green} size="large" />
      ) : errorTestimonials ? (
        <Text>{errorTestimonials}</Text>
      ) : (
        <Testimonial
          testimonials={testimonials.filter((x) => x.type !== "Volunteer")}
        />
      )}

      {/* Updates */}
      <View style={[styles.section, { paddingTop: 0 }]}>
        <View style={[styles.content]}>
          <Text
            accessibilityRole="header"
            aria-level="3"
            style={[styles.text_header3, { marginBottom: 20 }]}
          >
            UPDATES
          </Text>
          {loadingUpdates ? (
            <ActivityIndicator color={Theme.green} size="large" />
          ) : errorUpdates ? (
            <Text>{errorUpdates}</Text>
          ) : (
            <FlatList
              horizontal={true}
              data={updates.filter((item) => item.image)}
              renderItem={({ item, index, separators }) => {
                function Item() {
                  return (
                    <React.Fragment>
                      <View>
                        <HybridImage
                          source={{ uri: item.image.url + "&w=600" }}
                          style={{
                            width: 300,
                            height: 300,
                            resizeMode: "cover"
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
                  <View
                    style={{ marginRight: 10, maxWidth: 300 }}
                    key={"update" + index}
                  >
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

      <View style={[styles.section]}>
        <View style={[styles.content, { flex: 1 }]}>
          <Link contain href="https://instagram.com/spicygreenbook">
            <Text
              accessibilityRole="header"
              aria-level="3"
              style={[styles.text_header3, { marginBottom: 20 }]}
            >
              FOLLOW @SPICYGREENBOOK
            </Text>
          </Link>
          {loadingInstagram ? (
            <ActivityIndicator color={Theme.green} size="large" />
          ) : errorInstagram ? (
            <Text>{errorInstagram}</Text>
          ) : (
            <FlatList
              horizontal={true}
              data={instagram}
              showsHorizontalScrollIndicator={true}
              renderItem={({ item, index, separators }) => (
                <View style={{ flex: 1, width: 180, margin: 10 }}>
                  <Image
                    source={{ uri: item.thumbnail }}
                    style={{ width: 180, height: 180, resizeMode: "cover" }}
                  />
                </View>
              )}
              keyExtractor={(item, index) => "instagram" + index}
            />
          )}
        </View>
      </View>

      {/* Subscribe to Newsletter section */}
      <SubscribeSection />

      {/* Quote section */}
      <View style={[styles.section]}>
        <View style={[styles.content, { flex: 1 }]}>
          <View>
            <Fontisto name="quote-left" size={64} color={Theme.green} />
            <Text style={[styles.text_quote, { marginTop: 10 }]}>
              It is certain, in any case, that ignorance, allied with power, is
              the most ferocious enemy justice can have.
            </Text>
            <Text style={[styles.text_quote]}>- James Baldwin</Text>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create(
  getStyles(
    "button_green, button_white, button_white_text, button_green_text, text_header, text_header2, text_header3, text_header4, text_body, text_body3, text_quote, section, content, footer"
  )
);

export default Page;
