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
                    flexDirection: 'row', height: 'auto', backgroundColor: Theme.green_bg, alignItems: 'center',
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

                <View style={[styles.section, { fontSize: 24, paddingTop: 80 }]}>
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

                        <Text style={{ fontSize: 24, alignSelf: 'flex-end', paddingTop: 40, color: '#ffffff', flex: 1 }}>
                            Support for these businesses will:
                        </Text>
                        <Text style={{ fontSize: 24, alignSelf: 'flex-end', color: '#ffffff', flex: 1 }}>
                            <FontAwesome name="check" size={25} style={{ color: 'white' }} />Help decrease the wealth gap
                        </Text>
                        <Text style={{ fontSize: 24, alignSelf: 'flex-end', color: '#ffffff', flex: 1 }}>
                            <FontAwesome name="check" size={25} style={{ color: 'white' }} />Create more job opportunities
                        </Text>
                        <Text style={{ fontSize: 24, alignSelf: 'flex-end', color: '#ffffff', flex: 1 }}>
                            <FontAwesome name="check" size={25} style={{ color: 'white' }} />Help prevent further injustices
                        </Text>
                        <Text style={{ fontSize: 24, alignSelf: 'flex-end', color: '#ffffff', flex: 1 }}>
                            <FontAwesome name="check" size={25} style={{ color: 'white' }} />Help implement needed reform
                        </Text>

                        <Text style={{ fontSize: 24, paddingLeft: 0, paddingRight: 10, alignSelf: 'flex-end', color: '#ffffff', flex: .5 }}>
                            <FontAwesome name="check" size={25} style={{ color: 'white' }} />Ensure greater representation of
                        </Text>
                        <Text style={{ fontSize: 24, alignSelf: 'flex-end', color: '#ffffff', flex: .5 }}>
                            people who will change outdated
                        </Text>
                        <Text style={{ fontSize: 24, paddingRight: 158, alignContent: 'flexStart', alignSelf: 'flex-end', color: '#ffffff', flex: .5 }}>
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
                    <View style={{ flex: 1, width: 400 }}>


                        <View style={{ flexDirection: 'column', paddingBottom: 50, paddingTop: 50, justifyContent: 'center', alignContent: 'center' }}>

                            <Text style={[styles.text_body, { fontSize: 24, paddingRight: 50, paddingLeft: 50, alignSelf: 'center', textAlign: 'center', color: '#000' }]}>

                                We have a hard-working and <Text style={[styles.text_body, { fontSize: 24, fontWeight: "bold", color: '#000' }]}>growing team</Text> of volunteers to help provide this service with skills in writing, photography, and other professionl serices.  We will do our best to <Text style={[styles.text_body, { fontSize: 24, fontWeight: "bold", color: '#000' }]}>represent everyone in our list with high quality photography, videography and story-telling</Text> so everyone can enjoy discovering and learning more about businesses in their area.
                            </Text>

                        </View>




                        <Link href="/about" contain onPress={() => props.navigation.navigate('About')} >

                        </Link>

                    </View>

                </View>
                {/* *Begin Row 1* */}
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'flex-start', flex: 2, backgroundColor: '#ffffff' }} >
                        <Text style={[styles.text_header3, { paddingBottom: 30, paddingLeft: 80, fontSize: 36, fontWeight: "bold", color: '#006634' }]}>A PEEK BACK TO LOOK FORWARD</Text>

                        <Text style={[{ height: 'auto', fontSize: 24, color: '#000', paddingLeft: 80 }]}>

                            From 1936 to 1964, in the midst of the Jim Crow era, black men and women were under the persistent threat of violence after sunset in the form of lynchings and other very real hate crimes. To help many escape this violence, Victor Green created the Negro Motorist Green Book.
                            </Text>
                        <Text style={[{ paddingBottom: 70, height: 'auto', fontSize: 24, color: '#000', paddingLeft: 80, paddingTop: 20 }]}>

                            This book listed vital places of refuge during the segregation era that included hotels, gas stations, grocery stores, night clubs, restaurants, and "tourist homes" where homeowners welcomed travelers who had nowhere else to go.  This valuable note of history not only shows us the racial discrimination that existed, but also the importance and ingenuity of black entrepreneurship. Today we continue to push forward with black innovation and invite you to be a part of it.
                            </Text>

                    </View>



                    <View style={{ paddingBottom: 30, height: "100%", width: "100%", flexDirection: 'column', flex: 2, backgroundColor: '#ffffff' }} >

                        <ResponsiveImage
                            style={{ height: 'auto', width: 410, aspectRatio: 1.3 }}
                            alt="Spicy Green Book"
                            source={isWeb ? { uri: '/images/Capture Spicy Green Book dos.png' } : require('../public/images/Capture Spicy Green Book dos.png')}
                        />
                    </View>

                </View>
                {/* *End Row 1* */}
                {/* * Begin Row 2* */}
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ paddingLeft: 82, paddingBottom: 30, height: "100%", width: "100%", flexDirection: 'column', flex: 2, backgroundColor: '#ffffff' }} >

                        <ResponsiveImage
                            style={{ height: 'auto', width: 400, aspectRatio: 1.3 }}
                            alt="Spicy Green Book"
                            source={isWeb ? { uri: '/images/spicygreenbookphotorowdos.png' } : require('../public/images/spicygreenbookphotorowdos.png')}

                        />
                    </View>
                    <View style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'flex-start', flex: 2, backgroundColor: '#ffffff' }} >
                        <Text style={[styles.text_header3, { paddingBottom: 30, fontSize: 36, fontWeight: "bold", color: '#006634' }]}>BLACK OWNED BUSINESS</Text>

                        <Text style={[{ height: 'auto', fontSize: 24, color: '#000' }]}>

                            Each business has a story and we at Spicy Green Book set out to share them. Getting these stories out will allow police and people of varying backgrounds to come experience the culture within each business. Through this process we will begin to humanize the black community and change the taught perspectives which far too often lead to unnecessary violence and systematic oppression.
                            </Text>
                        <Text style={[{ paddingBottom: 30, height: 'auto', fontSize: 24, color: '#000', paddingTop: 20 }]}>

                            As perspectives change we will see an increase of people who begin to value the black life and decrease the number of people who engage in violent acts towards the black community. Here we can create a dialogue which allows the stereotypes that black men and women are threats to be disproven.
                            </Text>

                    </View>





                </View>
                {/* * End Row 2* */}
                {/* * Begin Row 3* */}
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'flex-start', flex: 2, backgroundColor: '#ffffff' }} >
                        <Text style={[styles.text_header3, { paddingBottom: 30, paddingLeft: 80, fontSize: 36, fontWeight: "bold", color: '#006634' }]}>HOW WE ARE MAKING OUR LISTINGS DIFFERENT</Text>

                        <Text style={[{ height: 'auto', fontSize: 24, color: '#000', paddingLeft: 80 }]}>

                            Spicy Green Book is offering a space that allows these nationwide black owned businesses to amplify their voices. Spicy Green Book is hand curating content for each business so, every one is represented well and the image coincides with the owner's vision. Nothing is listed on the business's webpage that was not approved by the business owner.
                            </Text>
                        <Text style={[{ paddingBottom: 30, height: 'auto', fontSize: 24, color: '#000', paddingLeft: 80, paddingTop: 20 }]}>

                            This way we can assure everything listed on the businesses web page is high quality and is brand consistent. Additionally, we are a nonprofit organization. Money donated will be repurposed back into the black community. Spicy Green Book will look to also make donations to causes that benefit the black community. Together we can contribute to the fight against racial inequality.
                            </Text>

                    </View>



                    <View style={{ paddingBottom: 30, height: "100%", width: "100%", flexDirection: 'column', flex: 2, backgroundColor: '#ffffff' }} >

                        <ResponsiveImage
                            style={{ height: 'auto', width: 400, aspectRatio: 1.3 }}
                            alt="Spicy Green Book"
                            source={isWeb ? { uri: '/images/spicygreenbookphotorowtres.png' } : require('../public/images/spicygreenbookphotorowtres.png')}
                        />
                    </View>

                </View>
                {/* * End Row 3* */}


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