import React, { useState, useEffect } from 'react';
import { useStateValue } from "../components/State";
import { StyleSheet, View, FlatList, Text, Image, ImageBackground, ActivityIndicator, TouchableOpacity, Button } from 'react-native';
import { Link } from "../components/Link";
import { ResponsiveImage } from "../components/ResponsiveImage";
import { getStyles, Theme, getData, GridWidth } from '../utils';
import { parseAddress } from '../utils/cityState';
import { Entypo } from '@expo/vector-icons';
import Search from "../components/Search";
import SGBMap from "../components/SGBMap";
import { getInstagram } from '../utils/getData';
import { handleRootClick } from '../utils/rootClickHandler';
import { Fontisto } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';

let currentIndexListing = 0;
const viewableItemsChangedListing = ({ viewableItems, changed }) => {
    //console.log("Visible items are", viewableItems);
    //console.log("Changed in this iteration", changed);
    currentIndexListing = viewableItems && viewableItems[0] && viewableItems[0].index;
}
const viewableItemsChangedConfigListing = {
    itemVisiblePercentThreshold: 50
};

function getOffset( el ) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}

function Page(props) {

    const [{ isWeb, dimensions }, dispatch] = useStateValue();

    const [loadingPress, setLoadingPress] = useState(!props.press);
    const [errorPress, setErrorPress] = useState('');
    const [press, setPress] = useState(props.press || []);

    const [loadingUpdates, setLoadingUpdates] = useState(!props.updates);
    const [errorUpdates, setErrorUpdates] = useState('');
    const [updates, setUpdates] = useState(props.updates || []);

    const [loadingInstagram, setLoadingInstagram] = useState(true);
    const [instagram, setInstagram] = useState([]);

    const [loadingListings, setLoadingListings] = useState(!props.listings);
    const [errorListings, setErrorListings] = useState('');
    const [Listings, setListings] = useState(props.listings || []);

    const responsiveStyles = StyleSheet.create(getStyles('middle_all, text_hero'));

    useEffect(() => {

        if (!props.press) {
            getData({
                type: 'press'
            }).then(press => {
                setLoadingPress(false);
                setPress(press)
            }).catch(err => {
                console.error(err);
                setLoadingPress(false);
                setErrorPress('Failed to load latest press updates.');
            })
        } else {
            console.log('press static is', props.press)
        }

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

        getInstagram().then(instagram => {
            setLoadingInstagram(false);
            setInstagram(instagram)
        });

        if (!props.listings) {
            getData({
                type: 'listing'
            }).then(listings => {
                setLoadingListings(false);
                setListings(listings)
            }).catch(err => {
                console.error(err);
                setLoadingListings(false);
                setErrorListings('Failed to load latest listings.');
            })
        }
    }, [])

    let newListingRef;
    const scrollToIndexListing = (obj, len) => {
        if (obj.index < 0) { obj.index = 0; }
        if (obj.index > len - 1) { obj.index = len - 1; }
        if (newListingRef) {
            newListingRef.scrollToIndex(obj)
        } else {
            console.log('no listing ref')
        }
    }

    return (
        <TouchableOpacity activeOpacity={1} style={{ cursor: 'default' }} onPress={e => handleRootClick(e)}>
            <View>
                <View style={{
                    height: 400,
                    flexDirection: 'row', backgroundColor: Theme.green_bg, alignItems: 'center',
                    justifyContent: 'center', paddingTop: 120,
                }}>

                    <Text accessibilityRole="header" fontSize="1" aria-level="1" style={responsiveStyles.text_hero}>ABOUT US</Text>
                </View>

                <View style={[styles.section, { fontSize: 24, paddingTop: 80 }]}>
                    <View style={styles.content}>
                        <View style={dimensions.width < 700 ? {} : { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingRight: 50 }}>
                            <View style={{ flex: 1 }}>
                                        <View style={dimensions.width < 700 ? {} : {flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <View style={dimensions.width < 700 ? {paddingTop: 40} : {flex: 2, paddingLeft: 20}}>
                                            <Text accessibilityRole="header" aria-level="3" style={[styles.text_header3, {marginBottom: 20}]}>MISSION STATEMENT</Text>
                                            <Text style={[styles.text_body, {color: '#000'}]}>
                                            Spicy Green Book’s mission is to build substantive relationships and increase social trust between three groups of people, Black small business owners, potential customers of these businesses located in their communities, and volunteers passionate about economic justice, all in order to improve the economic well-being of Black business owners, better integrate racially separated communities, and develop marketable skills in volunteers.
                                            </Text>
                                        </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={[styles.section, { fontSize: 24}]}>
                    <View style={styles.content}>
                        <View style={dimensions.width < 700 ? {} : { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingRight: 50 }}>
                            <View style={{ flex: 1 }}>
                                        <View style={dimensions.width < 700 ? {} : {flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <View style={dimensions.width < 700 ? {paddingTop: 10} : {flex: 2, paddingLeft: 20}}>
                                            <Text accessibilityRole="header" aria-level="3" style={[styles.text_header3, {marginBottom: 20}]}>PRODUCT AND SERVICES</Text>
                                            <Text style={[styles.text_body, {color: '#000'}]}>
                                            Spicy Green Book provides a variety of professional services to Black restauranteurs. These include online marketing and advertising, content creation, photography and videography, and business development education all in an effort to increase their business and achieve our mission. SGB does this by getting to know these business owners, understanding their most pressing needs, and attempting to meet those needs by matching the owners with qualified professional volunteers.{'\n'}{'\n'}
                                            We are a growing group of volunteers with a passion for sparking and creating change. At Spicy Green Book, we want to not only compile a directory of Black-owned businesses, but establish a space where business owners and loyal patrons can come together to support their local community. Additionally, we create volunteer service opportunities for upcoming professionals, matching them with members of these business owners. We offer all these introductory promotional services all a no cost to the business owner.
                                            </Text>
                                        </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>



                <View style={{ flexDirection: dimensions.width < 800 ? 'column' : 'row', backgroundColor: Theme.green_bg}}>
                    <View style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'flex-end', paddingRight: dimensions.width < 800 ? 0 : 100, flex: 1 }}>
                        <View style={{flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', flexGrow: 1, maxWidth: dimensions.width < 800 ? 1000 : 400, paddingLeft: 20, paddingRight: 20}}>
                            <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 10}}>
                                <Text style={{ fontSize: 24, paddingTop: 40, color: '#ffffff'}}>
                                    Support for these businesses will:
                                </Text>
                            </View>

                            <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', paddingBottom: 10}}>
                                <FontAwesome name="check" size={25} style={{ color: 'white', marginRight: 10}}/>
                                <Text style={{ fontSize: 24, alignSelf: 'flex-end', color: '#ffffff', flex: 1 }}>
                                    Decrease the wealth gap
                                </Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', paddingBottom: 10}}>
                                <FontAwesome name="check" size={25} style={{ color: 'white', marginRight: 10}} />
                                <Text style={{ fontSize: 24, alignSelf: 'flex-end', color: '#ffffff', flex: 1 }}>
                                    Create more job opportunities
                                </Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', paddingBottom: 10}}>
                                <FontAwesome name="check" size={25} style={{ color: 'white', marginRight: 10}} />
                                <Text style={{ fontSize: 24, alignSelf: 'flex-end', color: '#ffffff', flex: 1 }}>
                                    Prevent further injustices
                                </Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', paddingBottom: 10}}>
                                <FontAwesome name="check" size={25} style={{ color: 'white', marginRight: 10}} />
                                <Text style={{ fontSize: 24, alignSelf: 'flex-end', color: '#ffffff', flex: 1 }}>
                                    Implement needed reform
                                </Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', paddingBottom: 80}}>
                                <FontAwesome name="check" size={25} style={{ color: 'white', marginRight: 10}} />
                                <Text style={{ fontSize: 24, alignSelf: 'flex-end', color: '#ffffff', flex: 1 }}>
                                    Ensure marginalized people will receive the representation they deserve.
                                </Text>
                            </View>

                        </View>
                    </View>
                    {dimensions.width >= 800 && <View style={{flex: 1, backgroundColor: '#ffffff', position: 'relative'}}>
                        <View style={{position: 'absolute', left: -20, top: 20, width: '100%'}}>
                            <ResponsiveImage
                                style={{position: 'relative', top: 50, width: 400, aspectRatio: 1 }}
                                alt="Spicy Green Book"
                                source={isWeb ? { uri: '/images/SpicyBookAboutUs.png' } : require('../public/images/SpicyBookAboutUs.png')}
                                layerColor={'rgba(0,0,0,0.5)'}
                            />
                        </View>
                    </View>}
                </View>

                <View style={{marginTop: -20, flexDirection: 'row', justifyContent: 'center'}}>
                    <View style={{ flex: 1, width: 400, shadowOpacity: 0.4, shadowRadius: 10, backgroundColor: '#fff', maxWidth: '80%'}}>
                        <View style={{ flexDirection: 'column', paddingBottom: 50, paddingTop: 50, justifyContent: 'center', alignContent: 'center' }}>
                            <Text style={[styles.text_body, { fontSize: 24, paddingRight: 50, paddingLeft: 50, alignSelf: 'center', textAlign: 'center', color: '#000' }]}>
                                Our growing team helps provide marketing services like photography, videography, graphic design, and other creative services. Our mission is to represent everyone with authentic storytelling so our communities can discover and support Black-owned businesses near them.
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={[styles.section, { paddingTop: 80 }]}>
                    <View style={styles.content}>
                        <View style={dimensions.width < 700 ? {} : {flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center'}}>
                            <View style={dimensions.width < 700 ? {paddingTop: 40} : {flex: 2, paddingLeft: 20}}>
                                <Text accessibilityRole="header" aria-level="3" style={[styles.text_header3, {marginBottom: 20}]}>A PEEK BACK TO LOOK FORWARD</Text>
                                <Text style={[styles.text_body, {color: '#000'}]}>
                                    From 1936 to 1964, in the midst of the Jim Crow era, black men and women were under the persistent threat of violence after sunset in the form of lynchings and other very real hate crimes. To help many escape this violence, Victor Green created the Negro Motorist Green Book.
                                </Text>
                            </View>
                            <View style={dimensions.width < 700 ? {paddingLeft: 40, paddingRight: 40} : {flex: 1, paddingLeft: 80, paddingRight: 80}}>
                                <ResponsiveImage
                                    style={{width: 804, resizeMode: 'contain', aspectRatio: 1.37245}}
                                    alt="Spicy Green Book"
                                    source={isWeb ? { uri: '/images/Capture Spicy Green Book dos.png' } : require('../public/images/Capture Spicy Green Book dos.png')}
                                />
                            </View>
                        </View>
                    </View>
                </View>

                <View style={[styles.section, { paddingTop: 80 }]}>
                    <View style={styles.content}>
                        <View style={dimensions.width < 700 ? {} : {flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center'}}>
                            <View style={dimensions.width < 700 ? {paddingLeft: 40, paddingRight: 40} : {flex: 1, paddingLeft: 80, paddingRight: 80}}>
                                <ResponsiveImage
                                    style={{width: 804, resizeMode: 'contain', aspectRatio: 1.37245}}
                                    alt="Spicy Green Book"
                                    source={isWeb ? { uri: '/images/spicygreenbookphotorowdos.png' } : require('../public/images/spicygreenbookphotorowdos.png')}
                                />
                            </View>
                            <View style={dimensions.width < 700 ? {paddingTop: 40} : {flex: 2, paddingLeft: 20}}>
                                <Text accessibilityRole="header" aria-level="3" style={[styles.text_header3, {marginBottom: 20}]}>BLACK OWNED BUSINESS</Text>
                                <Text style={[styles.text_body, {color: '#000'}]}>
                                    Each business has a story and we at Spicy Green Book set out to share them. Getting these stories out will allow police and people of varying backgrounds to come experience the culture within each business. Through this process we will begin to humanize the black community and change the taught perspectives which far too often lead to unnecessary violence and systematic oppression. As perspectives change we will see an increase of people who begin to value the black life and decrease the number of people who engage in violent acts towards the black community. Here we can create a dialogue which allows the stereotypes that black men and women are threats to be disproven.
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

               <View style={[styles.section, { paddingTop: 80 }]}>
                    <View style={styles.content}>
                        <View style={dimensions.width < 700 ? {} : {flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center'}}>
                            <View style={dimensions.width < 700 ? {paddingTop: 40} : {flex: 2, paddingLeft: 20}}>
                                <Text accessibilityRole="header" aria-level="3" style={[styles.text_header3, {marginBottom: 20}]}>HOW WE ARE MAKING OUR LISTINGS DIFFERENT</Text>
                                <Text style={[styles.text_body, {color: '#000'}]}>
                                    Spicy Green Book is offering a space that allows these nationwide black owned businesses to amplify their voices. Spicy Green Book is hand curating content for each business so, every one is represented well and the image coincides with the owner's vision. Nothing is listed on the business's webpage that was not approved by the business owner.
                                    <Text style={{paddingTop: 20}}>
                                        This way we can assure everything listed on the businesses web page is high quality and is brand consistent. Additionally, we are a nonprofit organization. Money donated will be repurposed back into the black community. Spicy Green Book will look to also make donations to causes that benefit the black community. Together we can contribute to the fight against racial inequality.
                                    </Text>
                                </Text>
                            </View>
                            <View style={dimensions.width < 700 ? {paddingLeft: 40, paddingRight: 40} : {flex: 1, paddingLeft: 80, paddingRight: 80}}>
                                <ResponsiveImage
                                    style={{width: 804, resizeMode: 'contain', aspectRatio: 1.37245}}
                                    alt="Spicy Green Book"
                                    source={isWeb ? { uri: '/images/spicygreenbookphotorowtres.png' } : require('../public/images/spicygreenbookphotorowtres.png')}
                                />
                            </View>
                        </View>
                    </View>
                </View>

               <View style={[styles.section, { paddingTop: 80 }]}>
                    <View style={styles.content}>
                        {isWeb ? (
                            <div style={{position: 'relative'}}>
                                <div style={{paddingTop: ((272/476)*100) + '%'}} />
                                <iframe style={{
                                    overflow: 'hidden',
                                    position: 'absolute',
                                    top: 0,
                                    bottom: 0,
                                    right: 0,
                                    left: 0,
                                    border: 0,
                                    background: '#fff'
                                }} src="https://abc7.com/video/embed/?pid=9623765" width="100%" height="100%" />
                            </div>
                        ) : (
                            <WebView 
                                originWhitelist={['*']}
                                source={{html: `
                                   <div style="position:relative">
                                        <div style="paddingTop: ${((272/476)*100)}%"></div>
                                        <iframe style="
                                            overflow: hidden,
                                            position: absolute,
                                            top: 0,
                                            bottom: 0,
                                            right: 0,
                                            left: 0,
                                            border: 0,
                                            background: #fff
                                        }} src="https://abc7.com/video/embed/?pid=9623765" width="100%" height="100%"></iframe>
                                    </div>
                                `}}
                            />
                        )}
                    </View>
                </View>

            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create(getStyles('button_green, button_white, button_white_text, button_green_text, text_header, text_header2, text_header3, text_header4, text_body, text_quote, section, content, footer'));

const custom_styles = StyleSheet.create({
    white_default: {
        color: 'white',
    }
});

export default Page;