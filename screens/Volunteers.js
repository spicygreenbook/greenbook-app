import React, {useState, useEffect} from 'react';
import { useStateValue } from "../components/State";
import {View, Text, StyleSheet, Button, Platform, ActivityIndicator, FlatList, Image} from 'react-native';
import { Link } from "../components/Link";
import { PageTitle } from "../components/PageTitle"; 
import { RichText } from "../components/RichText"; 
import { getStyles, Theme, getContent, getData } from '../utils';
import { ResponsiveImage } from "../components/ResponsiveImage"

function Page(props) {

    const [{ view, isWeb, dimensions }, dispatch] = useStateValue();
    const styles = StyleSheet.create(getStyles('text_header2, text_header4, text_header5, section, content', {isWeb}));

    const [ pageLoading, setPageLoading ] = useState(props.content ? false: true);
    const [ content, setContent ] = useState(props.content || {});

    const [ loadingVolunteers, setLoadingVolunteers ] = useState(!props.volunteers);
    const [ errorVolunteers, setErrorVolunteers ] = useState('');
    const [ volunteers, setVolunteers ] = useState(props.volunteers || []);

    if (!props.content) {
        useEffect(() => {
            getContent({type: 'content', uid: 'volunteers'}).then(_content => {
                setContent(_content.content)
                setPageLoading(false);
            }).catch(err => {
                console.error(err);
            });
        }, [])
    }

    useEffect( () => {
        if (!props.volunteers) {
            getData({
                type: 'volunteers'
            }).then(_volunteers => {
                setLoadingVolunteers(false);
                setVolunteers(_volunteers)
            }).catch(err => {
                console.error(err);
                setLoadingVolunteers(false);
                setErrorVolunteers('Failed to load volunteers.');
            })
        }
    }, [])

    let numColumns = dimensions.width < 600 ? 1 : dimensions.width < 1000 ? 2 : 3

    let hasBody = content.body && content.body.join('');

    return (
        <React.Fragment>
        { pageLoading ?
            <View style={{marginTop: 200, marginBottom: 200}}>
                <ActivityIndicator color={Theme.green} size="large" />
            </View>
        : (
            <React.Fragment>
                <PageTitle title={content.page_title} />
                {!!hasBody && <View style={[styles.section]}>
                    <View style={styles.content}>
                        <RichText render={content._body} isWeb={isWeb} />
                    </View>
                </View>}
                <View style={[styles.section]} nativeID="volunteersLinks">
                    <View style={styles.content}>
                        {loadingVolunteers ? (
                            <ActivityIndicator color={Theme.green} size="large" />
                        ) : errorVolunteers ? (
                            <Text>{errorVolunteers}</Text>
                        ) : (
                            <FlatList
                                key={'cols' + numColumns}
                                data={volunteers}
                                numColumns={numColumns}
                                renderItem={({ item, index, separators }) => (
                                    <View
                                    style={{ flexDirection: "row" }}
                                    key={'volunteers' + index}
                                    style={{
                                        flex: 1/numColumns,
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
                                        <ResponsiveImage style={{
                                        maxWidth: '100%',
                                        width: item.image.width,
                                        height: item.image.height
                                        }}
                                        source={{uri: item.image.url + '&w=600'}} />
                                        )}

                                        <View
                                            style={{
                                                flex: 1,
                                                padding: 20
                                            }}
                                        >
                                            <View>
                                                <Text>{item.date}</Text>
                                                <Text style={styles.text_header5}>{item.title}</Text>
                                            </View>
                
                                            {!!item.action_text && !!item.link && (
                                                <View style={{ marginTop: "auto" }}>
                                                <Link href={item.link}>
                                                    <View>
                                                        <Text style={[styles.text_header4]}>{item.action_text} &gt;</Text>
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
                                keyExtractor={(item, index) => 'volunteers' + index}
                            />
                        )}
                    </View>
                </View>
            </React.Fragment>
        )}
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default Page;