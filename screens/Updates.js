import React, {useState, useEffect} from 'react';
import { useStateValue } from "../components/State";
import {View, Text, StyleSheet, Button, Platform, ActivityIndicator, FlatList, Image} from 'react-native';
import { Link } from "../components/Link"; 
import { RichText } from "../components/RichText"; 
import { getStyles, Theme, getContent, getData, getDataAsync } from '../utils';


function Page(props) {

    const [{ view, isWeb, dimensions }, dispatch] = useStateValue();
    const styles = StyleSheet.create(getStyles('text_header2, text_header4, section, content', {isWeb}));
    console.log('page props', props)

    const [ pageLoading, setPageLoading ] = useState(props.content ? false: true);
    const [ content, setContent ] = useState(props.content || {});

    const [ loadingUpdates, setLoadingUpdates ] = useState(!props.updates);
    const [ errorUpdates, setErrorUpdates ] = useState('');
    const [ updates, setUpdates ] = useState(props.updates || []);

    if (!props.content) {
        useEffect(() => {
            setContent(getContent({type: 'content', uid: 'updates'}).then(_content => {
                console.log('_content', _content)
                setContent(_content.content)
                setPageLoading(false);
            }).catch(err => {
                console.error(err);
            }));
        }, [])
    }

    useEffect( () => {
        if (!props.updates) {
            getDataAsync({
                type: 'updates'
            }).then(updates => {
                console.log('updates izz', updates)
                setLoadingUpdates(false);
                setUpdates(updates)
            }).catch(err => {
                console.error(err);
                setLoadingUpdates(false);
                setErrorUpdates('Failed to load latest updates.');
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
                        {loadingUpdates ? (
                            <ActivityIndicator color={Theme.green} size="large" />
                        ) : errorUpdates ? (
                            <Text>{errorUpdates}</Text>
                        ) : (
                            <FlatList
                                data={updates}
                                ItemSeparatorComponent={highlighted => <View style={{paddingTop: 80}}></View>}
                                renderItem={({ item, index, separators }) => (
                                    <View style={{flexDirection: 'row'}} key={'update' + index}>
                                        <View style={{flex: 1, flexDirection: 'row'}}>
                                            <Image style={{width: '100%', aspectRatio: 1}} source={{uri: item.image.url + '&w=600'}} />
                                        </View>
                                        <View style={{flex: 3, paddingLeft: 20}}>
                                            <Text style={styles.text_header4}>{item.title}</Text>
                                            <Text>{item.date}</Text>
                                            <RichText render={item._body} isWeb={isWeb} />

                                            {!!item.action_text && <Link href={item.link}>
                                                    {item.action_text}
                                                </Link>
                                            }

                                            {!!(item.attribution && item.attribution.length) && <View style={{marginTop: 20}}>
                                                    {item.attribution.map((attribution, a) => (
                                                        <View key={'attr' + a}>
                                                            <Text>
                                                                {attribution.attribution_type === 'Photography' ? (
                                                                    <span>Thank you to professional photographer {attribution.attribution_name} for donating your time and talent providing the photos on this update.</span>
                                                                ) : attribution.attribution_type === 'Videography' ? (
                                                                    <span>Thank you to professional videographer {attribution.attribution_name} for donating your time and talent providing the video on this update.</span>
                                                                ) : attribution.attribution_type === 'Design' ? (
                                                                    <span>Thank you to professional designer {attribution.attribution_name} for donating your time and talent providing the design on this update.</span>
                                                                ) : (
                                                                    <span>Thank you to volunteer {attribution.attribution_name} for donating your time and talent on this update.</span>
                                                                )}
                                                            </Text>
                                                            {attribution.attribution_link && 
                                                                <Link href={attribution.attribution_link}>
                                                                    {attribution.attribution_link.replace(
                                                                                "https://",
                                                                                ""
                                                                            )
                                                                            .replace(
                                                                                "http://",
                                                                                ""
                                                                            )
                                                                            .replace(
                                                                                "www.",
                                                                                ""
                                                                            ).split('/')[0]}
                                                                </Link>
                                                            }
                                                            {attribution.attribution_instagram && 
                                                                <Link href={'https://instagram.com/' + (attribution.attribution_instagram.indexOf('@') > -1 ? attribution.attribution_instagram.slice(1) : attribution.attribution_instagram)}>
                                                                    <Icons type="instagram" color="#B56230" style={{display: 'inline-block', width: 16, height: 16, verticalAlign: 'middle', marginRight: 5}} />
                                                                    {attribution.attribution_instagram}
                                                                </Link>
                                                            }
                                                        </View>
                                                    ))}
                                            </View>}
                                        </View>
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