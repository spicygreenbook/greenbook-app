import React, { useState, useEffect } from 'react';
import { useStateValue } from "../components/State";
import { StyleSheet, View, FlatList, Text, Image, ImageBackground, ActivityIndicator, TouchableOpacity } from 'react-native';
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

let currentIndexListing = 0;
const viewableItemsChangedListing = ({ viewableItems, changed }) => {
    //console.log("Visible items are", viewableItems);
    //console.log("Changed in this iteration", changed);
    currentIndexListing = viewableItems && viewableItems[0] && viewableItems[0].index;
}
const viewableItemsChangedConfigListing = {
    itemVisiblePercentThreshold: 50
};

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
                {/* Begin Top About Us Bar */}
                <View style={{
                    flexDirection: 'row', height: 300, backgroundColor: Theme.green_bg, alignItems: 'center',
                    justifyContent: 'center', paddingTop: 120,
                }}>

                    <Text accessibilityRole="header" fontSize="1" aria-level="1" style={responsiveStyles.text_hero}>ABOUT US</Text>
                </View>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'stretch',
                        alignSelf: 'center'
                    }}></View>
                <View style={{ backgroundColor: Theme.green_bg }}>

                </View>

                {/* End Top About Us Bar */}

                {/* Begin "We are gathering a growing list" Text box */}

                {/* End "We are gathering a growing list" Text box */}

                <View style={[styles.section, { paddingTop: 80 }]}>
                    <View style={styles.content}>
                        <View style={dimensions.width < 700 ? {} : { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingRight: 50 }}>
                            <View style={{ flex: 1 }}>

                            </View>
                            <View style={dimensions.width < 700 ? { paddingTop: 40 } : { flex: 5 }}>
                                <Text><Text style={[styles.text_body, { fontWeight: "bold", color: '#000' }]}>
                                    We are gathering a growing list of volunteers to help compile a directory of black owned businesses.  Our mission is to establish a space to help people who seek to create change within their communities.{"\n"}{"\n"}
                                </Text>
                                    <Text style={[styles.text_body, { color: '#000' }]}>

                                        If you're interested in helping but feel that you don't fit any of the roles listed above, let us know! Website development and upkeep require many different skill sets so we're sure that you can help in some way.  Also feel free to send people our way who you feel may be able to help.{"\n"}{"\n"}
                                    If you're looking to help grow our mission but can't give your time you can always dontate.  We also encourage you to help by being a patron of black-owned businesses!
                                    </Text>

                                </Text>
                                <Link href="/about" contain onPress={() => props.navigation.navigate('About')} >

                                </Link>
                            </View>
                        </View>





                    </View>
                </View>


                <View style={{ flexDirection: 'row' }}>
                    <View style={{ height: 'auto', justifyContent: 'center', flexDirection: 'column', alignItems: 'flex-start', paddingRight: 100, fontSize: 24, flex: 2, backgroundColor: Theme.green_bg }} >

                        <Text style={{ alignSelf: 'flex-end', paddingTop: 40, color: '#ffffff', flex: 1 }}>
                            Support for these businesses will:
                        </Text>
                        <Text style={{ alignSelf: 'flex-end', color: '#ffffff', flex: 1 }}>
                            <FontAwesome name="check" size={25} style={{ color: 'white' }} />Help decrease the wealth gap
                        </Text>
                        <Text style={{ alignSelf: 'flex-end', color: '#ffffff', flex: 1 }}>
                            <FontAwesome name="check" size={25} style={{ color: 'white' }} />Create more job opportunities
                        </Text>
                        <Text style={{ alignSelf: 'flex-end', color: '#ffffff', flex: 1 }}>
                            <FontAwesome name="check" size={25} style={{ color: 'white' }} />Help prevent further injustices
                        </Text>
                        <Text style={{ alignSelf: 'flex-end', color: '#ffffff', flex: 1 }}>
                            <FontAwesome name="check" size={25} style={{ color: 'white' }} />Help implement needed reform
                        </Text>

                        <Text style={{ paddingLeft: 0, paddingRight: 10, alignSelf: 'flex-end', color: '#ffffff', flex: .5 }}>
                            <FontAwesome name="check" size={25} style={{ color: 'white' }} />Ensure greater representation of
                        </Text>
                        <Text style={{ alignSelf: 'flex-end', color: '#ffffff', flex: .5 }}>
                            people who will change outdated
                        </Text>
                        <Text style={{ paddingRight: 158, alignContent: 'flexStart', alignSelf: 'flex-end', color: '#ffffff', flex: .5 }}>
                            policies.
                        </Text>
                    </View>



                    <View style={{ height: "100%", width: "100%", flexDirection: 'column', flex: 2, backgroundColor: '#ffffff' }} >

                        <ResponsiveImage
                            style={{ height: 'auto', position: 'relative', top: 50, width: 400, aspectRatio: 1 }}
                            alt="Spicy Green Book"
                            source={isWeb ? { uri: '/images/SpicyBookAboutUs.png' } : require('../public/images/SpicyBookAboutUs.png')}
                        />
                    </View>

                </View>

                <View style={dimensions.width < 700 ? {} : { backgroundColor: '#ffffff', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingRight: 50 }}>
                    <View style={{ flex: 1 }}>

                    </View>
                    <View style={{ paddingTop: 50, alignContent: 'center', height: 200, width: 700, flex: 50 }}>

                        <Text style={[styles.text_body, { paddingBottom: 30, alignSelf: 'center', textAlign: 'center', color: '#000' }]}>

                            We have a hard-working and <Text style={[styles.text_body, { fontWeight: "bold", color: '#000' }]}>growing team</Text> of volunteers to help provide this service with skills in writing, photography, and other professionl serices.  We will do our best to <Text style={[styles.text_body, { fontWeight: "bold", color: '#000' }]}>represent everyone in our list with high quality photography, videography and story-telling</Text> so everyone can enjoy discovering and learning more about businesses in their area.
                            </Text>






                        <Link href="/about" contain onPress={() => props.navigation.navigate('About')} >

                        </Link>

                    </View>

                </View>
                {/* ** */}
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ height: 'auto', justifyContent: 'center', flexDirection: 'column', alignItems: 'flex-start', paddingRight: 100, fontSize: 24, flex: 2, backgroundColor: '#ffffff' }} >

                        <Text style={{ alignSelf: 'flex-end', paddingTop: 40, color: '#ffffff', flex: 1 }}>
                            Support for these businesses will:
                        </Text>
                        <Text style={{ alignSelf: 'flex-end', color: '#ffffff', flex: 1 }}>
                            <FontAwesome name="check" size={25} style={{ color: 'white' }} />Help decrease the wealth gap
                        </Text>
                        <Text style={{ alignSelf: 'flex-end', color: '#ffffff', flex: 1 }}>
                            <FontAwesome name="check" size={25} style={{ color: 'white' }} />Create more job opportunities
                        </Text>
                        <Text style={{ alignSelf: 'flex-end', color: '#ffffff', flex: 1 }}>
                            <FontAwesome name="check" size={25} style={{ color: 'white' }} />Help prevent further injustices
                        </Text>
                        <Text style={{ alignSelf: 'flex-end', color: '#ffffff', flex: 1 }}>
                            <FontAwesome name="check" size={25} style={{ color: 'white' }} />Help implement needed reform
                        </Text>

                        <Text style={{ paddingLeft: 0, paddingRight: 10, alignSelf: 'flex-end', color: '#ffffff', flex: .5 }}>
                            <FontAwesome name="check" size={25} style={{ color: 'white' }} />Ensure greater representation of
                        </Text>
                        <Text style={{ alignSelf: 'flex-end', color: '#ffffff', flex: .5 }}>
                            people who will change outdated
                        </Text>
                        <Text style={{ paddingRight: 158, alignContent: 'flexStart', alignSelf: 'flex-end', color: '#ffffff', flex: .5 }}>
                            policies.
                        </Text>
                    </View>



                    <View style={{ paddingTop: 50, paddingBottom: 30, height: "100%", width: "100%", flexDirection: 'column', flex: 2, backgroundColor: '#ffffff' }} >

                        <ResponsiveImage
                            style={{ height: 'auto', width: 400, aspectRatio: 1 }}
                            alt="Spicy Green Book"
                            source={isWeb ? { uri: '/images/home_green_book.png' } : require('../public/images/home_green_book.png')}
                        />
                    </View>

                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ height: 'auto', justifyContent: 'center', flexDirection: 'column', alignItems: 'flex-start', paddingRight: 100, fontSize: 24, flex: 2, backgroundColor: Theme.green_bg }} >

                        <Text style={{ alignSelf: 'flex-end', paddingTop: 40, color: Theme.green_bg, flex: 1 }}>
                            Support for these businesses will:
                        </Text>
                        <Text style={{ alignSelf: 'flex-end', color: '#ffffff', flex: 1 }}>
                            <FontAwesome name="check" size={25} style={{ color: 'white' }} />Help decrease the wealth gap
                        </Text>
                        <Text style={{ alignSelf: 'flex-end', color: '#ffffff', flex: 1 }}>
                            <FontAwesome name="check" size={25} style={{ color: 'white' }} />Create more job opportunities
                        </Text>
                        <Text style={{ alignSelf: 'flex-end', color: '#ffffff', flex: 1 }}>
                            <FontAwesome name="check" size={25} style={{ color: 'white' }} />Help prevent further injustices
                        </Text>
                        <Text style={{ alignSelf: 'flex-end', color: '#ffffff', flex: 1 }}>
                            <FontAwesome name="check" size={25} style={{ color: 'white' }} />Help implement needed reform
                        </Text>

                        <Text style={{ paddingLeft: 0, paddingRight: 10, alignSelf: 'flex-end', color: '#ffffff', flex: .5 }}>
                            <FontAwesome name="check" size={25} style={{ color: 'white' }} />Ensure greater representation of
                        </Text>
                        <Text style={{ alignSelf: 'flex-end', color: '#ffffff', flex: .5 }}>
                            people who will change outdated
                        </Text>
                        <Text style={{ paddingRight: 158, alignContent: 'flexStart', alignSelf: 'flex-end', color: '#ffffff', flex: .5 }}>
                            policies.
                        </Text>
                    </View>



                    <View style={{ height: "100%", width: "100%", flexDirection: 'column', flex: 2, backgroundColor: '#ffffff' }} >

                        <ResponsiveImage
                            style={{ height: 'auto', position: 'relative', top: 50, width: 400, aspectRatio: 1 }}
                            alt="Spicy Green Book"
                            source={isWeb ? { uri: '/images/SpicyBookAboutUs.png' } : require('../public/images/SpicyBookAboutUs.png')}
                        />
                    </View>

                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ height: 'auto', justifyContent: 'center', flexDirection: 'column', alignItems: 'flex-start', paddingRight: 100, fontSize: 24, flex: 2, backgroundColor: Theme.green_bg }} >

                        <Text style={{ alignSelf: 'flex-end', paddingTop: 40, color: '#ffffff', flex: 1 }}>
                            Support for these businesses will:
                        </Text>
                        <Text style={{ alignSelf: 'flex-end', color: '#ffffff', flex: 1 }}>
                            <FontAwesome name="check" size={25} style={{ color: 'white' }} />Help decrease the wealth gap
                        </Text>
                        <Text style={{ alignSelf: 'flex-end', color: '#ffffff', flex: 1 }}>
                            <FontAwesome name="check" size={25} style={{ color: 'white' }} />Create more job opportunities
                        </Text>
                        <Text style={{ alignSelf: 'flex-end', color: '#ffffff', flex: 1 }}>
                            <FontAwesome name="check" size={25} style={{ color: 'white' }} />Help prevent further injustices
                        </Text>
                        <Text style={{ alignSelf: 'flex-end', color: '#ffffff', flex: 1 }}>
                            <FontAwesome name="check" size={25} style={{ color: 'white' }} />Help implement needed reform
                        </Text>

                        <Text style={{ paddingLeft: 0, paddingRight: 10, alignSelf: 'flex-end', color: '#ffffff', flex: .5 }}>
                            <FontAwesome name="check" size={25} style={{ color: 'white' }} />Ensure greater representation of
                        </Text>
                        <Text style={{ alignSelf: 'flex-end', color: '#ffffff', flex: .5 }}>
                            people who will change outdated
                        </Text>
                        <Text style={{ paddingRight: 158, alignContent: 'flexStart', alignSelf: 'flex-end', color: '#ffffff', flex: .5 }}>
                            policies.
                        </Text>
                    </View>



                    <View style={{ height: "100%", width: "100%", flexDirection: 'column', flex: 2, backgroundColor: '#ffffff' }} >

                        <ResponsiveImage
                            style={{ height: 'auto', position: 'relative', top: 50, width: 400, aspectRatio: 1 }}
                            alt="Spicy Green Book"
                            source={isWeb ? { uri: '/images/SpicyBookAboutUs.png' } : require('../public/images/SpicyBookAboutUs.png')}
                        />
                    </View>

                </View>


            </View>













        </TouchableOpacity >
    );
}

const styles = StyleSheet.create(getStyles('button_green, button_white, button_white_text, button_green_text, text_header, text_header2, text_header3, text_header4, text_body, text_quote, section, content, footer'));

const custom_styles = StyleSheet.create({
    white_default: {
        color: 'white',
    }
});

export default Page;