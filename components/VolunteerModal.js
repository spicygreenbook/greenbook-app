import React, { useState } from "react";
import { useStateValue } from "../components/State";
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Button
} from "react-native";
import { getStyles, Theme } from "../utils";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "../components/Link";
import { ResponsiveImage } from "../components/ResponsiveImage";

export default function App(props) {
  const { open, data, close, isWeb } = props;
  const [{ dimensions }] = useStateValue();

  let _styles1 = getStyles(
    "text_body2, text_header2, text_header3, button_green, button_green_text, text_header4, section, content",
    { isWeb }
  );
  let _styles = {
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    modalView: {
      backgroundColor: "white",
      alignItems: "flex-start",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    volunteerDetailItem: {
      marginTop: 10,
      marginBottom: 5
    }
  };
  const styles = StyleSheet.create({ ..._styles1, ..._styles });

  console.log("modal visible", open);

  function WebWrapper(props) {
    return isWeb ? (
      <View
        style={{
          zIndex: 3,
          elevation: 3,
          opacity: open ? 1 : 0,
          pointerEvents: open ? "" : "none",
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row"
        }}
        onClick={(e) => {
          close();
        }}
      >
        <View
          style={{
            width: isWeb ? 500 : "100%",
            maxWidth: "100%",
            height: "100%",
            margin: "0 auto"
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {props.children}
        </View>
      </View>
    ) : (
      <React.Fragment>{props.children}</React.Fragment>
    );
  }

  return (
    <WebWrapper isWeb={isWeb}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={open}
        presentationStyle="overFullScreen"
        onRequestClose={() => {
          close();
        }}
        style={{ borderColor: "transparent" }}
      >
        <View
          style={[
            styles.centeredView,
            isWeb
              ? {
                  flex: 1,
                  width: "100%",
                  height: "100%"
                }
              : {}
          ]}
        >
          <ScrollView
            contentContainerStyle={[
              styles.modalView,
              {
                top: isWeb ? 120 : 0,
                width: "100%",
                height: isWeb ? "100%" : null,
                minHeight: dimensions.height - 120
              }
            ]}
          >
            <View
              style={{
                width: "100%",
                maxWidth: dimensions.width,
                height: "100%"
              }}
            >
              {data.image && data.image.url && (
                <ResponsiveImage
                  style={{
                    width: dimensions.width,
                    height: isWeb ? 300 : 200
                  }}
                  source={{ uri: data.image.url + "&w=600" }}
                />
              )}

              <View
                style={{
                  marginHorizontal: 10
                }}
              >
                <View>
                  <Text style={styles.text_header3}>{data.name}</Text>
                </View>

                <View>
                  <Text style={styles.text_header4}>{data.role}</Text>
                </View>

                <View style={styles.volunteerDetailItem}>
                  <Text style={styles.text_body2}>{data.description}</Text>
                </View>

                {!!data._date_started && (
                  <View style={styles.volunteerDetailItem}>
                    {!!isWeb ? (
                      <Text style={styles.text_body2}>
                        Started on:
                        {" " +
                          new Date(
                            data._date_started.value
                          ).toLocaleDateString()}
                      </Text>
                    ) : (
                      <Text style={styles.text_body2}>
                        Started on:
                        {" " +
                          Date(
                            new Date(
                              data._date_started.value
                            ).toLocaleDateString()
                          ).slice(4, 15)}
                      </Text>
                    )}
                  </View>
                )}

                {!!data.amount && (
                  <View style={styles.volunteerDetailItem}>
                    <Text style={styles.text_body2}>
                      ${data.amount} in time volunteered
                    </Text>
                  </View>
                )}

                {data.links && data.links.length > 0 && (
                  <View
                    style={{
                      flexDirection: "row",
                      flexWrap: "wrap",
                      marginTop: 20
                    }}
                  >
                    {data.links.map((link) => (
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginRight: 20
                        }}
                      >
                        <Link href={link.link}>
                          <Text style={styles.text_body2}>
                            {link &&
                              link.link_title &&
                              link.link_title
                                .toLowerCase()
                                .indexOf("instagram") > -1 && (
                                <FontAwesome
                                  name="instagram"
                                  size={16}
                                  color="#B56230"
                                  style={{ marginRight: 10 }}
                                />
                              )}
                            {link &&
                              link.link_title &&
                              link.link_title.toLowerCase().indexOf("site") >
                                -1 && (
                                <FontAwesome
                                  name="link"
                                  size={16}
                                  color="#B56230"
                                  style={{ marginRight: 10 }}
                                />
                              )}
                            {link &&
                              link.link_title &&
                              link.link_title
                                .toLowerCase()
                                .indexOf("portfolio") > -1 && (
                                <FontAwesome
                                  name="link"
                                  size={16}
                                  color="#B56230"
                                  style={{ marginRight: 10 }}
                                />
                              )}
                            {link &&
                              link.link_title &&
                              link.link_title
                                .toLowerCase()
                                .indexOf("linkedin") > -1 && (
                                <FontAwesome
                                  name="linkedin"
                                  size={16}
                                  color="#B56230"
                                  style={{ marginRight: 10 }}
                                />
                              )}
                            {link &&
                              link.link_title &&
                              link.link_title.toLowerCase().indexOf("twitter") >
                                -1 && (
                                <FontAwesome
                                  name="twitter"
                                  size={16}
                                  color="#B56230"
                                  style={{ marginRight: 10 }}
                                />
                              )}
                            {link &&
                              link.link_title &&
                              link.link_title
                                .toLowerCase()
                                .indexOf("facebook") > -1 && (
                                <FontAwesome
                                  name="facebook"
                                  size={16}
                                  color="#B56230"
                                  style={{ marginRight: 10 }}
                                />
                              )}

                            {isWeb ? link.link_title : " " + link.link_title}
                          </Text>
                        </Link>
                      </View>
                    ))}
                  </View>
                )}

                {!!data.talents_donated && (
                  <View
                    style={{
                      flex: 1,
                      borderTopWidth: 1,
                      borderTopColor: "#999",
                      marginTop: 20,
                      marginBottom: 10,
                      paddingTop: 20,
                      paddingbottom: 20
                    }}
                  >
                    <Text style={[styles.text_body2, { fontWeight: "bold" }]}>
                      SKILLS
                    </Text>
                    <View
                      style={{
                        marginTop: 10,
                        flexDirection: "row",
                        flexWrap: "wrap"
                      }}
                    >
                      {data.talents_donated.map((talent, i, ar) => (
                        <Text style={[styles.text_body2, { fontSize: 14 }]}>
                          {talent.talent}
                          {i < ar.length - 1 && ", "}
                        </Text>
                      ))}
                    </View>
                  </View>
                )}
                {!isWeb ? (
                  <View
                    style={{
                      // position: "relative",
                      // bottom: isWeb ? -20 : 0,
                      alignSelf: "center",
                      padding: 30,
                      minWidth: 200,
                      minHeight: "100%"
                    }}
                  >
                    <Button
                      onPress={close}
                      title="Close"
                      color={Theme.green}
                      style={[styles.button_green, { fontSize: 40 }]}
                      accessibilityLabel="Close the pop-up screen with volunteer details"
                    />
                  </View>
                ) : null}
              </View>

              {isWeb ? (
                <View
                  style={{
                    // position: "relative",
                    // bottom: isWeb ? -20 : 0,
                    alignSelf: "center",
                    padding: 30,
                    minWidth: 200,
                    minHeight: "100%"
                  }}
                >
                  <Button
                    onPress={close}
                    title="Close"
                    color={Theme.green}
                    style={[styles.button_green, { fontSize: 40 }]}
                    accessibilityLabel="Close the pop-up screen with volunteer details"
                  />
                </View>
              ) : null}

              <View
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  minWidth: 40,
                  minHeight: 40
                }}
              >
                <Button
                  onPress={close}
                  title="X"
                  color={Theme.green}
                  style={styles.button_green}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </WebWrapper>
  );
}
