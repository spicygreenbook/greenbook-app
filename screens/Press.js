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
    const styles = StyleSheet.create(getStyles('text_header2, text_header4, section, content', {isWeb}));
    //console.log('page props', props)

    const [ pageLoading, setPageLoading ] = useState(props.content ? false: true);
    const [ content, setContent ] = useState(props.content || {});

    const [ loadingPress, setLoadingPress ] = useState(!props.press);
    const [ errorPress, setErrorPress ] = useState('');
    const [ press, setPress ] = useState(props.press || []);

    if (!props.content) {
        useEffect(() => {
            setContent(getContent({type: 'content', uid: 'press'}).then(_content => {
                console.log('_content', _content)
                setContent(_content.content)
                setPageLoading(false);
            }).catch(err => {
                console.error(err);
            }));
        }, [])
    }

    useEffect( () => {
        if (!props.press) {
            getData({
                type: 'press'
            }).then(press => {
                console.log('press izz', press)
                setLoadingPress(false);
                setPress(press)
            }).catch(err => {
                console.error(err);
                setLoadingPress(false);
                setErrorPress('Failed to load press.');
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
                <View style={[styles.section, {paddingTop: 0}]}>
                    <View style={styles.content}>
                        {loadingPress ? (
                            <ActivityIndicator color={Theme.green} size="large" />
                        ) : errorPress ? (
                            <Text>{errorPress}</Text>
                        ) : (
                            <FlatList
                                key={'cols' + numColumns}
                                data={press}
                                numColumns={numColumns}
                                renderItem={({ item, index, separators }) => (
                                    <View key={'press' + index} style={{flex: 1/numColumns, margin: 10, borderTopWidth: 2, borderColor: Theme.green,
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
                                        <View style={{padding: 20}}>
                                            <Text style={[styles.text_header4]}>{item.title}</Text>
                                            <Text>{item.date}</Text>
                                        </View>
                                        {item.image && item.image.url && 
                                            <ResponsiveImage style={{maxWidth: '100%', width: item.image.width, height: item.image.height}} source={{uri: item.image.url + '&w=1200'}} />
                                        }
                                        {!!item.link &&
                                            <Link href={item.link}>
                                                <View>
                                                    <Text style={[styles.text_header4, {padding: 20}]}>{item.action_text} &gt;</Text>
                                                </View>
                                            </Link>
                                        }
                                    </View>
                                )}
                                keyExtractor={(item, index) => 'press' + index}
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