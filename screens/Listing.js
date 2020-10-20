import React, {useState, useEffect} from 'react';
import { useStateValue } from "../components/State";
import {View, Text, StyleSheet, Button, Platform, ActivityIndicator, Image, TouchableOpacity} from 'react-native';
import { Link } from "../components/Link";
import { RichText } from "../components/RichText";
import { getStyles, Theme, getContent } from '../utils';
import Map from "../components/Map";
import { FontAwesome } from '@expo/vector-icons';
import Attribution from "../components/Attribution";

function Page(props) {

    const [{ view, isWeb, dimensions }, dispatch] = useStateValue();
    const styles = StyleSheet.create(getStyles('text_header2, text_body, text_body2, section, content, text_link', {isWeb}));
    console.log('page props', props)

    const [ pageLoading, setPageLoading ] = useState(!props.content);
    const [ content, setContent ] = useState(props.content);
    const [ galleryOpen, setGalleryOpen ] = useState(false);

    console.log('view is', view)
    if (!props.content) {
        useEffect(() => {
            getContent({
                type: 'listing',
                uid: view.split('/')[2]
            }).then(_data => {
                setContent(_data.content)
                setPageLoading(false);
            }).catch(err => {
                console.error(err);
            });
        }, [])
    }

    function clickImage(index) {
        dispatch({type: 'lightboxConfig', value: {
            index: index || 0,
            images: content.images.map(image => image.image)
        }})
        dispatch({type: 'lightbox', value: true})
    }

    return (
        <React.Fragment>
        { pageLoading ?
            <View style={{marginTop: 200, marginBottom: 200}}>
                <ActivityIndicator size="large" />
            </View>
        : (
            <React.Fragment>
                <View style={{paddingTop: 120}} />
                <View style={{flexDirection: 'row', backgroundColor: Theme.green_bg}}>
                    <View style={{flex: 2, borderRightWidth: 2, borderColor: '#fff'}}>
                        <TouchableOpacity onPress={e => clickImage(0)}>
                            <Image source={{uri: content.images[0].image.url + '&w=1200'}} style={{width: '100%', height: 600}} resizeMode="cover" />
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1}}>
                        <View style={{flex: 1, borderBottomWidth: 2, borderColor: '#fff'}}>
                            <TouchableOpacity onPress={e => clickImage(1)}>
                                <Image source={{uri: content.images[1].image.url + '&w=600'}} style={{width: '100%', height: 300}} resizeMode="cover" />
                            </TouchableOpacity>
                        </View>
                        <View style={{flex: 1}}>
                            <TouchableOpacity onPress={e => clickImage(2)}>
                                <Image source={{uri: content.images[2].image.url + '&w=600'}} style={{width: '100%', height: 300}} resizeMode="cover" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{flexDirection: 'row', backgroundColor: Theme.green_bg, borderTopWidth: 2, borderColor: '#fff'}}>
                    <View style={{flex: 2, borderRightWidth: 2, borderColor: '#fff', alignItems: 'flex-end'}}>
                        <View style={{padding: 20, paddingTop: 40, paddingBottom: 40, width: 795, maxWidth: '100%', marginLeft: 10}}>
                            <Text style={[styles.text_header2, {color: '#fff', textTransform: 'none', paddingBottom: 20}]}>{content.name}</Text>
                            {content.address && <Text style={[styles.text_body, {color: '#fff', paddingBottom:20}]}>{content.address}</Text>}
                            {content.hours && content.hours.length &&
                                content.hours.map((line, l) => (
                                    <Text key={'hoursline' + l} style={[styles.text_body, {color: '#fff', fontSize: 18}]}>{line}</Text>
                                ))
                            }
                        </View>
                    </View>
                    <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'center'}}>
                        <View style={{padding: 20}}>
                            {content.phone_number &&
                                <Link href={'tel:' + content.phone_number}>
                                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                                        <View style={{marginRight: 10}}>
                                            <FontAwesome name="phone" size={24} color="#fff" />
                                        </View>
                                        <View>
                                            <Text style={[styles.text_body, {color: '#fff', fontSize: 18}]}>{content.phone_number}</Text>
                                        </View>
                                    </View>
                                </Link>
                            }
                            {content.instagram &&
                                <Link href={'https://instagram.com/' + (content.instagram.indexOf('@') > -1 ? content.instagram.slice(1) : content.instagram)}>
                                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginTop: 10}}>
                                        <View style={{marginRight: 10}}>
                                            <FontAwesome name="instagram" size={24} color="#fff" />
                                        </View>
                                        <View>
                                            <Text style={[styles.text_body, {color: '#fff', fontSize: 18}]}>{content.instagram.substr(1)}</Text>
                                        </View>
                                    </View>
                                </Link>
                            }
                            {content.website_url &&
                                <Link href={content.website_url}>
                                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginTop: 10}}>
                                        <View style={{marginRight: 10}}>
                                            <FontAwesome name="link" size={24} color="#fff" />
                                        </View>
                                        <View>
                                            <Text style={[styles.text_body, {color: '#fff', fontSize: 18}]}>{content.website_url
                                                .replace(
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
                                                ).split('/')[0]}</Text>
                                        </View>
                                    </View>
                                </Link>
                            }
                            {content.online_ordering_link &&
                                <Link href={content.online_ordering_link}>
                                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginTop: 10}}>
                                        <View style={{marginRight: 10}}>
                                            <FontAwesome name="link" size={24} color="#fff" />
                                        </View>
                                        <View>
                                            <Text style={[styles.text_body, {color: '#fff', fontSize: 18}]}>Online Ordering</Text>
                                        </View>
                                    </View>
                                </Link>
                            }
                        </View>
                    </View>
                </View>
                <View style={[styles.section]}>
                    <View style={[styles.content]}>
                        <RichText render={content._bio} isWeb={isWeb} />
                        {!!(content.attribution && content.attribution.length) && <Attribution attribution={content.attribution} />}
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