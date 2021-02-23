
import React, { useState, useEffect, useRef } from "react";
import { useStateValue } from "../components/State";
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Image } from "react-native";

import { Link } from "../components/Link";
import { PageTitle } from "../components/PageTitle";
import { RichText } from "../components/RichText";
import { getStyles, Theme, getContent, getData } from "../utils";

function Page(props) {
  const [{ view, isWeb, dimensions }, dispatch] = useStateValue();
  let numColumns = dimensions.width < 600 ? 1 : dimensions.width < 1000 ? 2 : 2;
  const styles = StyleSheet.create(
    getStyles("button_green, button_green_text, text_header2,text_header3, text_header4, text_header6, text_body2, section, content", {
      isWeb,
    })
  );

  const testimonialStyles = StyleSheet.create({

    HeaderContainer: {
      paddingTop: 80,
      margin: "auto",
    },

    listingsORvolunteers: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: "space-between",
      margin: "auto",
      paddingTop: "5%",
      paddingBottom: "10%",
      width: 500
    },

    buttonStyle: {
      flex: 1,
      margin: "1rem",
      height: "55px",
      display: "flex",
      justifyContent: "center"
    },

    volunteerSection: {
      marginTop: "5rem"
    },

    testimonialsHeader: {
      textAlign: "center",
      margin: 0,
      paddingTop: "10%",
      paddingBottom: "10%",
      paddingLeft: 0,
      paddingRight: 0,
      lineHeight: 50,
      backgroundColor: "#006633",
      color: "#fff"
    },

    secondaryTestimonialsHeader: {
      fontWeight: 100,
      textAlign: "center",
      color: "#1f1f1f",
      marginBottom: "3%"
    },

    everyOtherTestimonial: {
      height: "90%",
      flex: 1,
      margin: 10,
      padding: 72,
      justifyContent: 'space-evenly',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3.5,
      },
      shadowOpacity: 0.175,
      shadowRadius: 14,
      elevation: 6,
    },
    testimonialCard: {
      flex: 1 / numColumns,
      margin: 10,
      padding: 72,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3.5,
      },
      shadowOpacity: 0.175,
      shadowRadius: 14,
      elevation: 6,
    },
    testimonialCardInner: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },

    everyOtherTestimonialInner: {
      display: 'flex',
      flexDirection: 'column',
      // alignItems: 'center',
      // textAlign: 'center'

    },
    testimonialCardHeader: {
      // flex: 1,
      justifyContent: "center",
      paddingTop: 12,
      alignItems: "flex-start",
      width: "100%"
},
    testimonialAvatar: {
      width: 60,
      height: 60,
      marginRight: "1rem"
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
      // lineHeight: 43,
      color: "#A5A5A5",
      fontSize: 17,
      paddingTop: 10
    },
    testimonialTextContainer: {
      marginTop: 18,
    },
    testimonialText: {
      lineHeight: 30,
      //fontSize: "1rem",
      fontSize: 16
    },
    testimonialLink: {
      paddingTop: 20,
    },
  });

  const [pageLoading, setPageLoading] = useState(props.content ? false : true);
  const [content, setContent] = useState(props.content || {});

  const [loadingTestimonials, setLoadingTestimonials] = useState(!props.testimonials);
  const [errorTestimonials, setErrorTestimonials] = useState("");
  const [testimonials, setTestimonials, setVolunteers] = useState(props.testimonials || []);
  

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


  // Render Businesses Testimonials only
  useEffect(() => {
    if(props.testimonials){
      let listings = testimonials.filter(item => item.type !== "Volunteer")
      setTestimonials(listings)
    }
  }, [])

  // Quick scroll solution
  const volunteerRef = useRef(null);
  const businessRef = useRef(null);

  const scrollToVolunteer = () => {
      window.scrollTo(0, volunteerRef.current.offsetTop);
  }
  const scrollToBusiness = () => {
      window.scrollTo(0, businessRef.current.offsetTop);
  }

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

          {/****************************************** HEADER *******************************************/}
          <View                   
              style={[testimonialStyles.HeaderContainer, styles.content]}
            >
            <Text style={[styles.text_header3, testimonialStyles.secondaryTestimonialsHeader]}>
              Community
            </Text>
            <Text style={[styles.text_header4, testimonialStyles.secondaryTestimonialsHeader]}>
              Read what businesses and volunteers are saying about Spicy Green Book.
            </Text>
            <View style={[styles.content, testimonialStyles.listingsORvolunteers]}>
              <Text onPress={scrollToBusiness} style={[testimonialStyles.buttonStyle, styles.button_green, styles.button_green_text]}>Businesses</Text>
              <Text onPress={scrollToVolunteer} style={[testimonialStyles.buttonStyle, styles.button_green, styles.button_green_text]}>Volunteers</Text>
            </View>

            <Text ref={businessRef} style={[styles.text_header2, testimonialStyles.testimonialsHeader]}>
              Businesses
            </Text>

          </View>
          
          {/********************************** Business Testimonials ***********************************/}
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
                      style={index % 3 == 0 || index % 5 == 0? testimonialStyles.testimonialCard: testimonialStyles.everyOtherTestimonial }
                    >
                      <View style={index % 3 == 0 || index % 5 == 0? testimonialStyles.testimonialCardInner: testimonialStyles.everyOtherTestimonialInner}>
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
                                styles.text_header5,
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
      
    {/********************************                                          ********************************/}
    {/********************************                                          ********************************/}
    {/********************************              VOLUNTEERS                  ********************************/}
    {/********************************                                          ********************************/}
    {/********************************                                          ********************************/}
      
    <>
    <View ref={volunteerRef} style={[styles.section]} nativeID="testimonialsLinks">
      <View style={styles.content}>
      <Text style={[styles.text_header2, testimonialStyles.testimonialsHeader]}>
          Volunteers
      </Text>
      <FlatList
          style={testimonialStyles.volunteerSection}
          key={"cols" + numColumns}
          data={props.volunteers} 
          numColumns={numColumns}
          renderItem={({ item, index, separators }) => (
          <View
            key={"volunteers" + index}
            style={index % 3 == 0 || index % 5 == 0? testimonialStyles.testimonialCard: testimonialStyles.everyOtherTestimonial }
          >
            <View style={index % 3 == 0 || index % 5 == 0? testimonialStyles.testimonialCardInner: testimonialStyles.everyOtherTestimonialInner}>
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
                      styles.text_header5,
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
          keyExtractor={(item, index) => "volunteers" + index}
          />
        </View>
      </View>
      </>
    </React.Fragment>
  );
}

export default Page;
