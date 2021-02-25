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
    // const styles = StyleSheet.create(getStyles('text_header2, text_header3, section, content', { isWeb }));
    // console.log('page props', props)
    const styles = StyleSheet.create(getStyles('button_green, button_white, button_white_text, button_green_text, text_header, text_header2, text_header3, text_header4, text_body, text_quote, section, content, footer', { isWeb }));


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
                        <View>
                            <View style={{
                                height: 200,
                                flexDirection: 'row', backgroundColor: Theme.green_bg, alignItems: 'center',
                                justifyContent: 'space-around', paddingTop: 70
                            }}>
                                {headerLinks && headerLinks.map((header, index) => (
                                    <Link key={index} href={header.href} contain>
                                        <View style={dimensions.width < 800 ? { marginTop: 40, marginLeft: 20 } : header.title !== 'BECOME A SPONSOR' ? { marginTop: 40 } : { backgroundColor: 'black', padding: 10, marginTop: 40 }} >
                                            <Text style={dimensions.width < 800 && header.title === 'BECOME A SPONSOR' ? { fontSize: 16, lineHeight: 16, fontFamily: "ApercuMedium", backgroundColor: 'black', padding: 10, color: 'white', fontWeight: 'bold', marginRight: 15, flex: 2, marginTop: 10 } : { fontFamily: "ApercuMedium", fontSize: 18, lineHeight: 16, color: 'white', fontWeight: 'bold' }}>{header.title}</Text>
                                        </View>
                                    </Link>
                                ))}
                            </View>

                            <View id="why_sponsor" style={[styles.section, { fontSize: 24, paddingTop: 40 }]}>
                                <View style={styles.content}>
                                    <View style={dimensions.width < 700 ? {} : { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingRight: 50 }}>
                                        <View style={{ flex: 1 }}>
                                            <View style={dimensions.width < 700 ? {} : { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <View style={dimensions.width < 700 ? { paddingTop: 40 } : { flex: 2, paddingLeft: 20 }}>
                                                    <Text accessibilityRole="header" aria-level="3" style={[styles.text_header3, { marginBottom: 20 }]}>WHY SPONSOR?</Text>
                                                    <Text style={[styles.text_body, { color: '#000' }]}>
                                                        Spicy Green Book’s stories are rich in cultural identity—taking you on a fascinating, delicious journey. We can’t tell these stories without your help! Now is your chance to join our exciting movement by supporting our growth. Together, we can empower more Black-owned businesses, diversify the world’s business landscape, and bring amazing food, culture, and experiences to all!
                                            </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={[styles.section, { backgroundColor: Theme.green_bg, paddingTop: 20, paddingBottom: 20, marginLeft: 70, marginRight: 70 }]}>
                                <View style={styles.content}>
                                    <View style={dimensions.width < 700 ? {} : { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <View style={dimensions.width < 700 ? { paddingLeft: 40, paddingRight: 40 } : { flex: 2, paddingLeft: 80, paddingRight: 80 }}>
                                            <ResponsiveImage
                                                style={{ width: 800, resizeMode: 'contain', aspectRatio: 1.2 }}
                                                alt="Opportunity Gap"
                                                source={require('../public/images/opportunity_gap.jpg')}
                                            />
                                        </View>
                                        <View style={dimensions.width < 700 ? { paddingTop: 40 } : { flex: 2, paddingLeft: 20 }}>

                                            <Text style={[styles.text_body, { color: 'white' }]}>
                                                Due to systemic racism and societal injustices, Black-owned businesses often have insufficient access to funding, marketing support, and other services.
                                </Text>
                                            <Text style={[styles.text_body, { color: 'white', paddingTop: 10 }]}>
                                                Did you know that 87% of C-Level decision-makers in this nation are white men, while white men make up only 20% of the overall population?
                                </Text>
                                            <Text style={[styles.text_body, { color: 'white', paddingTop: 10 }]}>
                                                This statistic alone shines a bright light on what we are trying to change. Your conscientious contribution goes toward helping us level these disparities.
                                </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.section}>
                                <View style={styles.content}>
                                    <View style={dimensions.width < 700 ? {} : { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', alignItems: 'center' }}>
                                        <View style={dimensions.width < 700 ? { paddingLeft: 40, paddingRight: 40 } : { flex: 2 }}>
                                            <ResponsiveImage
                                                style={{ width: 100, resizeMode: 'contain', aspectRatio: 1 }}
                                                alt="danilo"
                                                source={require('../public/images/danilo.png')}
                                            />
                                        </View>
                                        <View style={dimensions.width < 700 ? { paddingTop: 40 } : { flex: 14, paddingLeft: 20 }}>
                                            <Text style={[styles.text_body, { fontWeight: 'bold' }]}>“A lot of time, effort, and collaboration went into building the systemic problems that have arisen in our history and are still present today. We need an equivalent amount of effort to alter that system for the better.” —Danilo Batson, Founder of SGB.</Text>
                                        </View>
                                    </View>

                                </View>
                            </View>



                        </View>
                    </TouchableOpacity>
                )}
        </React.Fragment>
    )
}



export default Page;

{/* <View style={styles.section}>
                                <View style={styles.content}>
                                <View style={{ backgroundColor: Theme.green_bg, height: 600, display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                                    <View>
                                        <ResponsiveImage
                                            style={{ width: 500, aspectRatio: 1 }}
                                            alt="Opportunity Gap"
                                            // layerColor={'rgba(0,0,0,0.5)'}
                                            source={require('../public/images/opportunity_gap.jpg')}
                                        />
                                    </View>
                                    <View>
                                        <Text style={styles.button_white_text}>Due to systemic racism and societal injustices, Black-owned businesses often have insufficient access to funding, marketing support, and other services.</Text>
                                        <Text style={styles.button_white_text}>Did you know that 87% of C-Level decision-makers in this nation are white men, while white men make up only 20% of the overall population?</Text>
                                        <Text style={styles.button_white_text}>This statistic alone shines a bright light on what we are trying to change. Your conscientious contribution goes toward helping us level these disparities.</Text>
                                    </View>
                                </View>
                                </View>
                            </View> */}