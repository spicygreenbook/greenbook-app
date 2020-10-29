import React, {useState, useEffect} from 'react';
import { useStateValue } from "../components/State";
import {View, Text, StyleSheet, Button, Platform, ActivityIndicator, FlatList, Image} from 'react-native';
import { Link } from "../components/Link"; 
import { RichText } from "../components/RichText"; 
import { getStyles, Theme, getContent, getData, getDataAsync } from '../utils';
import { ResponsiveImage } from "../components/ResponsiveImage"

function Page(props) {

    const [{ view, isWeb, dimensions }, dispatch] = useStateValue();
    const styles = StyleSheet.create(getStyles('text_header2, text_header4, section, content', {isWeb}));
    console.log('page props', props)

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
            getDataAsync({
                type: 'press'
            }).then(press => {
                console.log('press izz', press)
                setLoadingPress(false);
                setUpdates(press)
            }).catch(err => {
                console.error(err);
                setLoadingPress(false);
                setErrorPress('Failed to load press.');
            })
        }
    }, [])

    return (
        <React.Fragment>
        { pageLoading ?
            <View style={{marginTop: 200, marginBottom: 200}}>
                <ActivityIndicator color={Theme.green} size="large" />
            </View>
        : (
            <React.Fragment>
                <View style={[styles.section, {backgroundColor: Theme.green_bg, paddingTop: 180}]}>
                    <View style={[styles.content, {flexDirection: 'column', alignItems: 'center'}]}>
                        <Text accessibilityRole="header" aria-level="2" style={[styles.text_header2, {color: '#fff'}]}>{content.page_title}</Text>
                    </View>
                </View>
                <View style={[styles.section]}>
                    <View style={styles.content}>
                        <RichText render={content._body} isWeb={isWeb} />
                    </View>
                </View>
                <View style={[styles.section]}>
                    <View style={styles.content}>
                        {loadingPress ? (
                            <ActivityIndicator color={Theme.green} size="large" />
                        ) : errorPress ? (
                            <Text>{errorPress}</Text>
                        ) : (
                            <FlatList
                                data={press}
                                ItemSeparatorComponent={highlighted => <View style={{paddingTop: 80}}></View>}
                                renderItem={({ item, index, separators }) => (
                                    <View key={'press' + index}>
                                        <Text style={styles.text_header4}>{item.title}</Text>
                                        <Text>{item.date}</Text>
                                        {item.image && item.image.url && 
                                            <ResponsiveImage style={{maxWidth: '100%', width: item.image.width, height: item.image.height}} source={{uri: item.image.url + '&w=1200'}} />
                                        }
                                        {!!item.link &&
                                            <Link href={item.link}>
                                                {item.action_text}
                                            </Link>
                                        }
                                    </View>
                                )}
                                keyExtractor={(item, index) => 'update' + index}
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