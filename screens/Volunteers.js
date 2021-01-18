import React, { useState, useEffect } from "react";
import { useStateValue } from "../components/State";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Platform,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity
} from "react-native";
import { Link } from "../components/Link";
import { PageTitle } from "../components/PageTitle";
import { RichText } from "../components/RichText";
import { getStyles, Theme, getContent, getData } from "../utils";
import { ResponsiveImage } from "../components/ResponsiveImage";
import VolunteerModal from "../components/VolunteerModal";

function Page(props) {
  const [{ view, isWeb, dimensions }, dispatch] = useStateValue();
  const styles = StyleSheet.create(
    getStyles(
      "text_header2, text_header3, text_header4, text_header5, section, content",
      { isWeb }
    )
  );

  const [pageLoading, setPageLoading] = useState(props.content ? false : true);
  const [content, setContent] = useState(props.content || {});

  const [loadingVolunteers, setLoadingVolunteers] = useState(!props.volunteers);
  const [errorVolunteers, setErrorVolunteers] = useState("");
  const [volunteers, setVolunteers] = useState(props.volunteers || []);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  function closeModal() {
    setModalOpen(false);
  }

  if (!props.content) {
    useEffect(() => {
      getContent({ type: "content", uid: "volunteers" })
        .then((_content) => {
          setContent(_content.content);
          setPageLoading(false);
        })
        .catch((err) => {
          console.error(err);
        });
    }, []);
  }

  useEffect(() => {
    if (!props.volunteers) {
      getData({
        type: "volunteers"
      })
        .then((_volunteers) => {
          setLoadingVolunteers(false);
          setVolunteers(_volunteers);
        })
        .catch((err) => {
          console.error(err);
          setLoadingVolunteers(false);
          setErrorVolunteers("Failed to load volunteers.");
        });
    }
  }, []);

  let numColumns = dimensions.width < 600 ? 1 : 2;
  let hasBody = content.body && content.body.join("");

  let stats = {
    count: 200,
    hours: 10000,
    dollars: 700000
  };
  volunteers.forEach((volunteer) => {
    stats.count++;
    stats.dollars += volunteer.amount || 0;
    stats.hours += volunteer.amount ? volunteer.amount / 100 : 0;
  });
  console.log("volunteers", volunteers);

  let shuffledVolunteers = volunteers.sort(() => Math.random() - 0.5);

  return (
    <React.Fragment>
      {pageLoading ? (
        <View style={{ marginTop: 200, marginBottom: 200 }}>
          <ActivityIndicator color={Theme.green} size="large" />
        </View>
      ) : (
        <React.Fragment>
          <PageTitle
            navigation={props.navigation}
            title={content.page_title}
            button={{
              title: "Get Involved",
              href: "/volunteer",
              nav: "Volunteer"
            }}
          />
          {!!hasBody && (
            <View style={[styles.section]}>
              <View style={styles.content}>
                <RichText render={content._body} isWeb={isWeb} />
              </View>
            </View>
          )}
          {loadingVolunteers ? (
            <ActivityIndicator color={Theme.green} size="large" />
          ) : errorVolunteers ? (
            <Text>{errorVolunteers}</Text>
          ) : (
            <View>
              <VolunteerModal
                open={modalOpen}
                data={modalData}
                close={closeModal}
                isWeb={isWeb}
              />
              <View style={[styles.section, { backgroundColor: "#F2F2F2" }]}>
                <View
                  style={[
                    styles.content,
                    {
                      flexDirection: "row",
                      justifyContent: isWeb ? "space-evenly" : "space-between",
                      alignItems: "center",
                      textAlign: "center",
                      marginTop: 20
                    }
                  ]}
                >
                  <View>
                    <Text
                      style={
                        ([styles.text_body, styles.statsCounter],
                        {
                          fontSize: dimensions.width < 980 ? 26 : 40,
                          alignSelf: "center"
                        })
                      }
                    >
                      {stats.count}+
                    </Text>
                    <Text
                      style={[
                        styles.text_body,
                        { fontSize: dimensions.width < 980 ? 13 : 24 }
                      ]}
                    >
                      total volunteers
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={
                        ([styles.text_body, styles.statsCounter],
                        {
                          fontSize: dimensions.width < 980 ? 26 : 40,
                          alignSelf: "center"
                        })
                      }
                    >
                      {Math.round(stats.hours)}+
                    </Text>
                    <Text
                      style={[
                        styles.text_body,
                        { fontSize: dimensions.width < 980 ? 13 : 24 }
                      ]}
                    >
                      hours donated
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={
                        ([styles.text_body, styles.statsCounter],
                        {
                          fontSize: dimensions.width < 980 ? 26 : 40,
                          alignSelf: "center"
                        })
                      }
                    >
                      ${Math.round(stats.dollars / 1000)}K+
                    </Text>
                    <Text
                      style={[
                        styles.text_body,
                        { fontSize: dimensions.width < 980 ? 13 : 24 }
                      ]}
                    >
                      in time volunteered
                    </Text>
                  </View>
                </View>
              </View>
              <View style={[styles.section]} nativeID="volunteersLinks">
                <View style={styles.content}>
                  <FlatList
                    key={"cols" + numColumns}
                    data={shuffledVolunteers}
                    numColumns={numColumns}
                    renderItem={({ item, index, separators }) => (
                      <View
                        style={{ flexDirection: "row" }}
                        key={"volunteers" + index}
                        style={{
                          flex: 1 / numColumns,
                          margin: 10,
                          elevation: 6
                        }}
                      >
                        <TouchableOpacity
                          onPress={(e) => {
                            console.log(item);
                            setModalData(item);
                            setModalOpen(true);
                          }}
                        >
                          <View
                            style={{ flexDirection: "row", minHeight: 115 }}
                          >
                            <View style={{ flex: 1 }}>
                              {item.image && item.image.url && (
                                <ResponsiveImage
                                  style={{
                                    width: item.image.width,
                                    height: item.image.height
                                  }}
                                  source={{ uri: item.image.url + "&w=600" }}
                                />
                              )}
                            </View>
                            <View style={{ flex: 2, paddingLeft: 20 }}>
                              <View>
                                <Text style={styles.text_header4}>
                                  {item.name}
                                </Text>
                                <Text
                                  style={[
                                    styles.text_header4,
                                    {
                                      fontSize: 18,
                                      paddingBottom: 4,
                                      paddingTop: 4
                                    }
                                  ]}
                                >
                                  {item.role || ""}
                                </Text>
                              </View>
                              <View>
                                <View
                                  style={{ maxHeight: 50, overflow: "hidden" }}
                                >
                                  <Text style={[styles.text_body]}>
                                    {item.description || ""} ...
                                  </Text>
                                </View>
                                {/*<Text style={[styles.text_body, {color: Theme.green, marginTop: 20}]}>See full bio</Text>*/}
                              </View>
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>
                    )}
                    keyExtractor={(item, index) => "volunteers" + index}
                  />
                </View>
              </View>
            </View>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  statsCounter: {
    fontWeight: "bold",
    marginBottom: 10
  }
});

export default Page;
