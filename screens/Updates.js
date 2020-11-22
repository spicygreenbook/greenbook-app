import React, {useState, useEffect} from 'react';
import { useStateValue } from "../components/State";
import {View, Text, StyleSheet, Button, Platform, ActivityIndicator, FlatList, Image} from 'react-native';
import { Link } from "../components/Link"; 
import { PageTitle } from "../components/PageTitle"; 
import { RichText } from "../components/RichText"; 
import Attribution from "../components/Attribution"; 
import { getStyles, Theme, getContent, getData } from '../utils';
import { ResponsiveImage } from "../components/ResponsiveImage";


function Page(props) {

    const [{ view, isWeb, dimensions }, dispatch] = useStateValue();
    const styles = StyleSheet.create(
      getStyles(
        "text_header2, text_header4, text_header5, section, content, tagline",
        { isWeb }
      )
    );

    const [ pageLoading, setPageLoading ] = useState(props.content ? false: true);
    const [ content, setContent ] = useState(props.content || {});

    const [ loadingUpdates, setLoadingUpdates ] = useState(!props.updates);
    const [ errorUpdates, setErrorUpdates ] = useState('');
    const [ updates, setUpdates ] = useState(props.updates || []);

    if (!props.content) {
        useEffect(() => {
            getContent({type: 'content', uid: 'updates'}).then(_content => {
                setContent(_content.content)
                setPageLoading(false);
            }).catch(err => {
                console.error(err);
            });
        }, [])
    }

    useEffect( () => {
        if (!props.updates) {
            getData({
                type: 'updates'
            }).then(updates => {
                setLoadingUpdates(false);
                setUpdates(updates)
            }).catch(err => {
                console.error(err);
                setLoadingUpdates(false);
                setErrorUpdates('Failed to load latest updates.');
            })
        }
    }, [])

    let numColumns =
          dimensions.width < 600 ? 1 : dimensions.width < 1000 ? 2 : 3;

    let hasBody = content.body && content.body.join("");

    return (
      <React.Fragment>
        {pageLoading ? (
          <View style={{ marginTop: 200, marginBottom: 200 }}>
            <ActivityIndicator color={Theme.green} size="large" />
          </View>
        ) : (
          <React.Fragment>
            <PageTitle title={content.page_title} />
            {!!hasBody && <View style={[styles.tagline]}>
              <View style={styles.content}>
                <RichText render={content._body} isWeb={isWeb} />
              </View>
            </View>}
            <View style={[styles.section]} nativeID="updatesLinks">
              <View style={styles.content}>
                {loadingUpdates ? (
                  <ActivityIndicator color={Theme.green} size="large" />
                ) : errorUpdates ? (
                  <Text>{errorUpdates}</Text>
                ) : (
                  <FlatList
                    key={"cols" + numColumns}
                    data={updates}
                    numColumns={numColumns}
                    ItemSeparatorComponent={(highlighted) => (
                      <View style={{ paddingTop: 80 }}></View>
                    )}
                    renderItem={({ item, index, separators }) => (
                      <View
                        style={{ flexDirection: "row" }}
                        key={"update" + index}
                        style={{
                          flex: 1 / numColumns,
                          margin: 10,
                          borderTopWidth: 2,
                          borderColor: Theme.green,
                          shadowColor: "#000",
                          shadowOffset: {
                            width: 0,
                            height: 3,
                          },
                          shadowOpacity: 0.27,
                          shadowRadius: 4.65,

                          elevation: 6,
                        }}
                      >
                        {item.image && item.image.url && (
                          <ResponsiveImage
                            style={{
                              maxWidth: "100%",
                              width: item.image.width,
                              height: item.image.height,
                            }}
                            source={{ uri: item.image.url + "&w=600" }}
                          />
                        )}

                        <View
                          style={{
                            flex: 1,
                            padding: 20,
                          }}
                        >
                          <View>
                            <Text>{item.date}</Text>
                            <Text style={styles.text_header5}>
                              {item.title}
                            </Text>
                          </View>

                          <View>
                            <RichText render={item._body} isWeb={isWeb} />
                          </View>

                          {!!item.action_text && !!item.link && (
                            <View style={{ marginTop: "auto" }}>
                              <Link href={item.link}>
                                <View>
                                  <Text style={[styles.text_header4]}>
                                    {item.action_text} &gt;
                                  </Text>
                                </View>
                              </Link>
                            </View>
                          )}

                          {!!(item.attribution && item.attribution.length) && (
                            <Attribution attribution={item.attribution} />
                          )}
                        </View>
                      </View>
                    )}
                    keyExtractor={(item, index) => "update" + index}
                  />
                )}
              </View>
            </View>
          </React.Fragment>
        )}
      </React.Fragment>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default Page;