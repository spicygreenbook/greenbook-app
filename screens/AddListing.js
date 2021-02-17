import React, { useState, useEffect } from "react";
import { useStateValue } from "../components/State";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Linking,
  ActivityIndicator,
  Image
} from "react-native";
import { Link } from "../components/Link";
import { PageTitle } from "../components/PageTitle";
import { RichText } from "../components/RichText";
import { getStyles, Theme, getContent } from "../utils";
import { ResponsiveImage } from "../components/ResponsiveImage";

function Page(props) {
  const [{ isWeb, dimensions }] = useStateValue();
  const styles = StyleSheet.create(
    getStyles(
      "button_link_text, text_body, text_header2, button_green, button_green_text, button_white, button_white_text, section, content",
      { isWeb }
    )
  );

  const [pageLoading, setPageLoading] = useState(props.content ? false : true);
  const [content, setContent] = useState(props.content || {});

  if (!props.content) {
    useEffect(() => {
      getContent({ type: "content", uid: "add" })
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

  const CustomLink = ({ style, href, text, label, buttonStyle, textStyle }) => (
    <View
      style={[
        {
          flexDirection: dimensions.width > 1015 ? "row" : "column",
          justifyContent: "flex-end",
          alignItems: "center"
        },
        { ...style }
      ]}
    >
      <Text
        style={[
          styles.text_body,
          { fontSize: 18 },
          dimensions.width > 1015
            ? { marginRight: 60 }
            : { marginRight: 0, marginBottom: 10 }
        ]}
      >
        {text}
      </Text>
      <Link href={href} contain>
        <View style={[styles.button_green, { ...buttonStyle }]}>
          <Text style={[styles.button_green_text, { ...textStyle }]}>
            {label}
          </Text>
        </View>
      </Link>
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
          <View style={[styles.section, { paddingBottom: isWeb ? 0 : 80 }]}>
            <View style={styles.content}>
              <RichText render={content._body} isWeb={isWeb} />
              {!isWeb ? (
                <TouchableOpacity
                  activeOpacity={1}
                  style={[
                    styles.button_green,
                    {
                      alignSelf: "center",
                      marginTop: 50
                    }
                  ]}
                  onPress={() => {
                    Linking.openURL(
                      "https://prismic-io.s3.amazonaws.com/spicygreenbook/04cb42ed-a40b-4199-835a-ee1b5f5f6982_SGB+Flyer.pdf"
                    );
                  }}
                >
                  <Text style={styles.button_green_text}>
                    {`Download Our Flyer`.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
          {isWeb && (
            <View style={[styles.section]}>
              <View style={styles.content}>
                <View
                  style={
                    dimensions.width < 800
                      ? {}
                      : {
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center"
                        }
                  }
                >
                  <View
                    style={{
                      flex: 1,
                      paddingLeft: dimensions.width < 800 ? 0 : 20,
                      paddingBottom: dimensions.width < 800 ? 40 : 0
                    }}
                  >
                    <ResponsiveImage
                      style={{
                        width: 1338,
                        resizeMode: "contain",
                        aspectRatio: 873 / 1338
                      }}
                      alt="Spicy Green Book"
                      source={{
                        uri:
                          "https://res.cloudinary.com/honeybook/image/upload/c_crop,f_auto,fl_lossy,h_1305,q_auto,w_2003,x_0,y_608/v1/companies/5f0282afa1f62a61eedd082a/cover/EETeaCo_MorganWhitneyPhotography-112_sh58eu"
                      }}
                    />
                  </View>
                  <View style={{ flex: 2, marginLeft: 20, flexWrap: "wrap" }}>
                    <CustomLink
                      href="https://www.honeybook.com/widget/spicy_green_book_159485/cf_id/5f6bf5318be9f533980593fa"
                      label="FILL OUT FORM"
                      text="Are you ready? Let's fill out the request form!"
                    />
                    <CustomLink
                      href="/donate"
                      label="Donate"
                      style={{ marginTop: 30 }}
                      buttonStyle={{
                        width: 173,
                        borderWidth: 2,
                        backgroundColor: "#fff",
                        justifyContent: "center"
                      }}
                      textStyle={{ color: Theme.green, textAlign: "center" }}
                      text="If you want to make a donation please click"
                    />
                    <CustomLink
                      href="https://prismic-io.s3.amazonaws.com/spicygreenbook/04cb42ed-a40b-4199-835a-ee1b5f5f6982_SGB+Flyer.pdf"
                      label="Download Our Flyer"
                      style={{ marginTop: 30 }}
                      buttonStyle={{
                        width: 173,
                        borderWidth: 2,
                        backgroundColor: "#fff",
                        justifyContent: "center"
                      }}
                      textStyle={{ color: Theme.green, textAlign: "center" }}
                      text={`Help spread the word about us by \n downloading and sharing our flyer`}
                    />
                  </View>
                </View>
              </View>
            </View>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default Page;
