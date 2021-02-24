import React, { useState, useEffect } from 'react';
import { useStateValue } from "../components/State";
import { StyleSheet, View, FlatList, Text, Image, ImageBackground, ActivityIndicator, TouchableOpacity, Button } from 'react-native';
import { Link } from "../components/Link";
import { PageTitle } from "../components/PageTitle";
import { ResponsiveImage } from "../components/ResponsiveImage";
import { RichText } from "../components/RichText";
import { getStyles, getData, Theme, getContent } from '../utils';
import { getInstagram } from '../utils/getData';
import { handleRootClick } from '../utils/rootClickHandler';
import { FontAwesome } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';

function Page(props) {

    const [{ view, isWeb, dimensions }, dispatch] = useStateValue();
    const styles = StyleSheet.create(getStyles('text_header2, text_header3, section, content', { isWeb }));
    // console.log('page props', props)

    const [pageLoading, setPageLoading] = useState(props.content ? false : true);
    const [content, setContent] = useState(props.content || {});

    const [loadingInstagram, setLoadingInstagram] = useState(true);
    const [instagram, setInstagram] = useState([]);

    const [loadingUpdates, setLoadingUpdates] = useState(!props.sponsors);
    const [errorUpdates, setErrorUpdates] = useState('');
    const [sponsors, setSponsors] = useState(props.sponsors || []);

    const responsiveStyles = StyleSheet.create(getStyles('middle_all, text_hero'));

    if (!props.content) {
        useEffect(() => {
            getContent({ type: 'content', uid: 'sponsors' }).then(_content => {
                console.log('_content', _content)
                setContent(_content.content)
                setPageLoading(false);
            }).catch(err => {
                console.error(err);
            });
        }, [])
    }

    const headerLinks = [ 
        { href: '#why_sponsor', title: 'Why Sponsor?' }, 
        { href: '#sponsor_benefits', title: 'Sponsorship Benefits' },
        { href: '#sponsor_levels', title: 'Sponsorship Levels' },
        { href: '#our_sponsors', title: 'Our Sponsors' },
        { href: '#become_sponsor', title: 'BECOME A SPONSOR' }    
    ]

    return (
        <React.Fragment>
            { pageLoading ?
                <View style={{ marginTop: 200, marginBottom: 200 }}>
                    <ActivityIndicator color={Theme.green} size="large" />
                </View>
                : (
                    <TouchableOpacity activeOpacity={1} style={{ cursor: 'default' }} onPress={e => handleRootClick(e)}>
                        <View style={{ paddingBottom: 120 }}>
                            <View style={{
                                height: 200,
                                flexDirection: 'row', backgroundColor: Theme.green_bg, alignItems: 'center',
                                justifyContent: 'space-around', paddingTop: 60,
                            }}>
                                {headerLinks && headerLinks.map((header, index) => (
                                    <Link key={index} href={header.href} contain>
                                    <View style={dimensions.width < 700 ? {marginTop: 40, marginLeft: 20 } : header.title !== 'BECOME A SPONSOR' ? [styles.button_white, { marginTop: 40 }] : {backgroundColor: 'black', padding: 10, marginTop: 40}} >
                                        <Text style={dimensions.width < 700 && header.title === 'BECOME A SPONSOR' ? {backgroundColor: 'black', padding: 10, color: 'white', fontWeight: 'bold', marginRight: 10, marginTop: 10} : [styles.button_white_text, { color: 'white', fontWeight: 'bold' }]}>{header.title}</Text>
                                    </View>
                                </Link>
                                ))}
                                

                            </View>
                        </View>
                    </TouchableOpacity>
                )}
        </React.Fragment>
    )
}

const styles = StyleSheet.create(getStyles('button_green, button_white, button_white_text, button_green_text, text_header, text_header2, text_header3, text_header4, text_body, text_quote, section, content, footer'));


export default Page;