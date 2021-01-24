import React, { useState, useEffect } from "react";
import { useStateValue } from "../components/State";
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Image } from "react-native";

import { Link } from "../components/Link";
import { PageTitle } from "../components/PageTitle";
import { RichText } from "../components/RichText";
import { getStyles, Theme, getContent, getData } from "../utils";

function Page(props) {
  const [{ view, isWeb, dimensions }, dispatch] = useStateValue();
  let numColumns = dimensions.width < 600 ? 1 : dimensions.width < 1000 ? 2 : 3;

  const styles = StyleSheet.create(
    getStyles("text_header3, text_header4, text_header6, text_body2, section, content", {
      isWeb,
    })
  );

  const testimonialStyles = StyleSheet.create({
    testimonialsHeaderContainer: {
      //paddingTop: "4rem",
      //width: "70%",
      //margin: "auto",
    },
    testimonialsHeader: {
      //fontSize: "2.5rem",
      textAlign: "center",
      margin: 0,
      lineHeight: 50,
    },
    testimonialCard: {
      flex: 1 / numColumns,
      margin: 10,
      padding: 40,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3.5,
      },
      shadowOpacity: 0.175,
      shadowRadius: 14,
      elevation: 6,
    },
    testimonialCardHeader: {
      flex: 1,
      justifyContent: "center",
    },
    testimonialAvatar: {
      width: 60,
      height: 60,
      //borderRadius: "50%",
      //objectFit: "cover",
      //marginRight: "1rem",
    },
    testimonialAuthor: {
      //fontSize: "1.1rem",
      fontWeight: "bold",
      lineHeight: 22,
    },
    testimonialSubtitle: {
      //fontSize: "1rem",
      lineHeight: 22,
    },
    testimonialTextContainer: {
      marginTop: 20,
    },
    testimonialText: {
      lineHeight: 25,
      //fontSize: "1rem",
    },
    testimonialLink: {
      paddingTop: 20,
    },
  });

  const [pageLoading, setPageLoading] = useState(props.content ? false : true);
  const [content, setContent] = useState(props.content || {});

  const [loadingTestimonials, setLoadingTestimonials] = useState(!props.testimonials);
  const [errorTestimonials, setErrorTestimonials] = useState("");
  const [testimonials, setTestimonials] = useState(props.testimonials || []);

  if (!props.content) {
    useEffect(() => {
      getContent({ type: "content", uid: "testimonials" })
        .then((_content) => {
          setContent(_content.content);
          setPageLoading(false);
        })
        .catch((err) => {
          console.error(err);
        });
    }, []);
  }

  let hasBody = content.body && content.body.join("");

  useEffect(() => {
    if (!props.testimonials) {
      getData({
        type: "testimonial",
      })
        .then((_testimonials) => {
          setLoadingTestimonials(false);
          setTestimonials(_testimonials);
        })
        .catch((err) => {
          console.error(err);
          setLoadingTestimonials(false);
          setErrorTestimonials("Failed to load testimonials.");
        });
    }
  }, []);

  return (
    <React.Fragment>
      {pageLoading ? (
        <View style={{ marginTop: 200, marginBottom: 200 }}>
          <ActivityIndicator color={Theme.green} size="large" />
        </View>
      ) : (
        <React.Fragment>
          <PageTitle title={content.page_title} />
          {!!hasBody && (
            <View style={[styles.section]}>
              <View style={styles.content}>
                <RichText render={content._body} isWeb={isWeb} />
              </View>
            </View>
          )}
          <View style={testimonialStyles.testimonialsHeaderContainer}>
            <Text style={[styles.text_header3, testimonialStyles.testimonialsHeader]}>
              Read what businesses and volunteers are saying about Spicy Green Book.
            </Text>
          </View>

          <View style={[styles.section]} nativeID="testimonialsLinks">
            <View style={styles.content}>
              {loadingTestimonials ? (
                <ActivityIndicator color={Theme.green} size="large" />
              ) : errorTestimonials ? (
                <Text>{errorTestimonials}</Text>
              ) : (
                <FlatList
                  key={"cols" + numColumns}
                  data={testimonials}
                  numColumns={numColumns}
                  renderItem={({ item, index, separators }) => (
                    <View
                      key={"testimonials" + index}
                      style={testimonialStyles.testimonialCard}
                    >
                      <View style={{ flexDirection: "row" }}>
                        {item.image && item.image.url && (
                          <Image
                            style={testimonialStyles.testimonialAvatar}
                            source={{ uri: item.image.url + "&w=600" }}
                          />
                        )}
                        <View style={testimonialStyles.testimonialCardHeader}>
                          <Text
                            style={[
                              styles.text_header6,
                              testimonialStyles.testimonialAuthor,
                            ]}
                          >
                            {item.quote_credit}
                          </Text>

                          {item.sub_title && (
                            <Text
                              style={[
                                styles.text_header4,
                                testimonialStyles.testimonialSubtitle,
                              ]}
                            >
                              {item.sub_title}
                            </Text>
                          )}
                          {item.type === "Volunteer" && (
                            <Text
                              style={[
                                styles.text_header4,
                                testimonialStyles.testimonialSubtitle,
                              ]}
                            >
                              Volunteer
                            </Text>
                          )}
                        </View>
                      </View>
                      <View style={[testimonialStyles.testimonialTextContainer]}>
                        <Text
                          style={[styles.text_body2, testimonialStyles.testimonialText]}
                        >
                          {item.asdf}
                        </Text>
                      </View>

                      {!!item.link_text && !!item.link && (
                        <View style={testimonialStyles.testimonialLink}>
                          <Link href={item.link}>
                            <View>
                              <Text style={[styles.text_header4]}>
                                {item.link_text} &gt;
                              </Text>
                            </View>
                          </Link>
                        </View>
                      )}

                      {!!(item.attribution && item.attribution.length) && (
                        <Attribution attribution={item.attribution} />
                      )}
                    </View>
                  )}
                  keyExtractor={(item, index) => "testimonials" + index}
                />
              )}
            </View>
          </View>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default Page;
