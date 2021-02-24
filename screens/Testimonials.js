
import React, { useState, useEffect, useRef } from "react";
import { useStateValue } from "../components/State";
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Image, TouchableOpacity, SafeAreaView } from "react-native";

import { Link } from "../components/Link";
import { PageTitle } from "../components/PageTitle";
import { RichText } from "../components/RichText";
import { getStyles, Theme, getContent, getData } from "../utils";

function Page(props) {
  const [{ view, isWeb, dimensions }, dispatch] = useStateValue();
  let numColumns = dimensions.width < 600 ? 1 : dimensions.width < 1000 ? 2 : 2;
  console.log("DIMENSIONS", dimensions)
  const styles = StyleSheet.create(
    getStyles("button_green, button_green_text, text_header2,text_header3, text_header4, text_header6, text_body2, section, content", {
      isWeb,
    })
  );

  const testimonialStyles = StyleSheet.create({

    HeaderContainer: {
      paddingTop: 80,
    },

    listingsORvolunteers: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: "space-between",
      alignContent: "center",
      alignItems: "center",
      paddingBottom: 20,
      marginTop: 50,
      width: "auto"
    },

    buttonStyle: {
      display: "flex",
      alignContent: "center",
      backgroundColor: "#006633",
      color: "#fff",
      padding: 20,
      margin: 10
    },

    volunteerSection: {
      marginTop: 25,
    },

    testimonialsHeader: {
      display: "flex",
      marginBottom: 50,
      lineHeight: 50,
      padding: 25,
      backgroundColor: "#006633",
      color: "#fff",
      width: "90%",
      alignContent: "center",
      alignSelf: "center",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
    },

    secondaryTestimonialsHeader: {
      fontWeight: "100",
      textAlign: "center",
      color: "#1f1f1f",
      marginBottom: 30
    },

    everyOtherTestimonial: {
      height: "90%",
      flex: 1,
      margin: 10,
      padding: 45,
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
      padding: 45,
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
      marginRight: 10
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
  const [loadingVolunteers, setLoadingVolunteers] = useState(!props.volunteers);
  const [errorTestimonials, setErrorTestimonials] = useState("");
  const [testimonials, setTestimonials] = useState(props.testimonials || []);
  const [volunteers, setVolunteers] = useState(props.volunteers || []);
  

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
          const business = _testimonials.filter(item => item.type !== "Volunteer")
          setLoadingTestimonials(false);
          setTestimonials(business);
        })
        .catch((err) => {
          console.error(err);
          setLoadingTestimonials(false);
          setErrorTestimonials("Failed to load testimonials.");
        });
    }

    // Render Business Testimonials only
    if(props.testimonials) {
      let business = testimonials.filter(item => item.type !== "Volunteer")
      setTestimonials(business)
    }
  }, []);


  useEffect(() => {
    if(!props.volunteers){
      getData({
        type: "testimonial",
      })
      .then((_testimonials) => {
        let volunteers = _testimonials.filter(item => item.type === "Volunteer")
        setLoadingVolunteers(false)
        setVolunteers(volunteers)
      })
    }
  }, [])

  // Quick scroll solution
  const volunteerRef = useRef(null);
  const businessRef = useRef(null);

  const scrollToVolunteer = () => {
    window.scrollTo(0, volunteerRef.current.offsetTop - 200);
  }
  const scrollToBusiness = () => {
    window.scrollTo(0, businessRef.current.offsetTop - 200);
  }

  return (
    <React.Fragment>
      {pageLoading ? (
        <View style={{ marginTop: 200, marginBottom: 200 }}>
          <ActivityIndicator color={Theme.green} size="large" />
        </View>
      ) : (
        <SafeAreaView>
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
              style={[testimonialStyles.HeaderContainer, styles.section]}
            >
            <Text style={[styles.text_header3, testimonialStyles.secondaryTestimonialsHeader]}>
              Community
            </Text>
            <Text style={[styles.text_header4, testimonialStyles.secondaryTestimonialsHeader]}>
              Read what businesses and volunteers are saying about Spicy Green Book.
            </Text>
            <View style={[styles.content, testimonialStyles.listingsORvolunteers]}>
            <TouchableOpacity onPress={scrollToBusiness}> 
              <Text  style={[ styles.text_header4, testimonialStyles.buttonStyle ]}>Businesses</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={scrollToVolunteer}> 
              <Text  style={[ styles.text_header4,  testimonialStyles.buttonStyle]}>Volunteers</Text>
              </TouchableOpacity>
            </View>
          </View>



          
          {/********************************** Business Testimonials ***********************************/}
          
          <View ref={businessRef} style={[styles.section]} nativeID="testimonialsLinks">
            <View style={styles.content}>
            <Text style={[ styles.text_header3, testimonialStyles.testimonialsHeader]}>
              Businesses
            </Text>
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
        
        </SafeAreaView>
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
      {loadingVolunteers ? (
                <ActivityIndicator color={Theme.green} size="large" />
              ) : errorTestimonials ? (
                <Text>{errorTestimonials}</Text>
              ) : (
      <FlatList
          style={testimonialStyles.volunteerSection}
          key={"cols" + numColumns}
          data={volunteers} 
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
          )}

        </View>
      </View>
      </>
    </React.Fragment>
  );
}

export default Page;
