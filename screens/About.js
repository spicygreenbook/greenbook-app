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

                                <Text style={[styles.text_body, { color: '#000' }]}>
                                    <b>We are gathering a growing list of volunteers to help compile a directory of black owned businesses.  Our mission is to establish a space to help people who seek to create change within their communities.</b>{"\n"}{"\n"}
                                    If you're interested in helping but feel that you don't fit any of the roles listed above, let us know! Website development and upkeep require many different skill sets so we're sure that you can help in some way.  Also feel free to send people our way who you feel may be able to help.{"\n"}{"\n"}
                                    If you're looking to help grow our mission but can't give your time you can always dontate.  We also encourage you to help by being a patron of black-owned businesses!
                                    </Text>
                                <Link href="/about" contain onPress={() => props.navigation.navigate('About')} >

                                </Link>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Begin support for these businesses image ***/}
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'flex-start', paddingRight: 100, fontSize: 24, flex: 2, backgroundColor: Theme.green_bg }} >

                        <text style={{ alignSelf: 'flex-end', paddingTop: 40, color: '#ffffff', flex: 1 }}>
                            Support for these businesses will:
                        </text>
                        <text style={{ alignSelf: 'flex-end', color: '#ffffff', flex: 1 }}>
                            <FontAwesome name="check" size={25} style={{ color: 'white' }} />Help decrease the wealth gap
                        </text>
                        <text style={{ alignSelf: 'flex-end', color: '#ffffff', flex: 1 }}>
                            <FontAwesome name="check" size={25} style={{ color: 'white' }} />Create more job opportunities
                        </text>
                        <text style={{ alignSelf: 'flex-end', color: '#ffffff', flex: 1 }}>
                            <FontAwesome name="check" size={25} style={{ color: 'white' }} />Help prevent further injustices
                        </text>
                        <text style={{ alignSelf: 'flex-end', color: '#ffffff', flex: 1 }}>
                            <FontAwesome name="check" size={25} style={{ color: 'white' }} />Help implement needed reform
                        </text>

                        <text style={{ paddingLeft: 20, paddingRight: 10, alignSelf: 'flex-end', color: '#ffffff', flex: .5 }}>
                            <FontAwesome name="check" size={25} style={{ color: 'white' }} />Ensure greater representation of
                        </text>
                        <text style={{ alignSelf: 'flex-end', color: '#ffffff', flex: .5 }}>
                            people who will change outdated
                        </text>
                        <text style={{ paddingRight: 238, alignContent: 'flexStart', alignSelf: 'flex-end', color: '#ffffff', flex: .5 }}>
                            policies.
                        </text>
                    </View>

                    {/* <View style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'flex-start', paddingRight: 100, fontSize: 24, flex: 2, backgroundColor: Theme.green_bg }} > */}

                    <View style={{ flex: 2, width: 1000, height: 500, backgroundColor: '#ffffff' }} >

                    </View>
                </View>
            </View>
            {/* End support for these businesses image */}

            <View style={[styles.section, { flex: 1, paddingBottom: 0, paddingTop: 80 }]}>
                <View style={[styles.content, { flex: 1 }]}>
                    <Text accessibilityRole="header" aria-level="3" style={[styles.text_header3, { marginBottom: 20 }]}>
                        WHERE WE'RE AT
                            </Text>

                    <SGBMap style={{ marginTop: -80 }} listings={Listings} loadingListings={loadingListings} navigation={props.navigation} />

                </View>
            </View>

            <View style={[styles.section, { flex: 1, paddingTop: 0 }]}>
                <View style={[styles.content, { flex: 1 }]}>
                    <Text accessibilityRole="header" aria-level="3" style={[styles.text_header3, { marginBottom: 20 }]}>
                        UPDATES
                            </Text>
                    {loadingUpdates ? (
                        <ActivityIndicator color={Theme.green} size="large" />
                    ) : errorUpdates ? (
                        <Text>{errorUpdates}</Text>
                    ) : (
                                <FlatList
                                    horizontal={true}
                                    data={updates.filter(item => item.image)}
                                    renderItem={({ item, index, separators }) => {
                                        function Item() {
                                            return <React.Fragment>
                                                <View>
                                                    <Image source={{ uri: item.image.url + '&w=600' }} style={{ width: 300, height: 300, resizeMode: 'cover' }} />
                                                </View>
                                                <View>
                                                    <Text style={styles.text_header4}>{item.title}</Text>
                                                </View>
                                                <View>
                                                    <Text>{item.date}</Text>
                                                </View>
                                            </React.Fragment>
                                        }
                                        return <View style={{ margin: 10, maxWidth: 300 }} key={'update' + index}>
                                            {item.link ? (<Link href={item.link}><Item /></Link>) : <Item />}
                                        </View>
                                    }}
                                    keyExtractor={(item, index) => 'update' + index}
                                />
                            )}
                </View>
            </View>

            <View style={[styles.section, { flex: 1 }]}>
                <View style={[styles.content, { flex: 1 }]}>
                    <Link contain href='https://instagram.com/spicygreenbook'>
                        <Text accessibilityRole="header" aria-level="3" style={[styles.text_header3, { marginBottom: 20 }]}>
                            FOLLOW @SPICYGREENBOOK
                                </Text>
                    </Link>
                    {loadingUpdates ? (
                        <ActivityIndicator color={Theme.green} size="large" />
                    ) : errorUpdates ? (
                        <Text>{errorUpdates}</Text>
                    ) : (
                                <FlatList
                                    horizontal={true}
                                    data={instagram}
                                    renderItem={({ item, index, separators }) => (
                                        <View style={{ flex: 1, width: 180, margin: 10 }}>
                                            <Image source={{ uri: item.thumbnail }} style={{ width: 180, height: 180, resizeMode: 'cover' }} />
                                        </View>
                                    )}
                                    keyExtractor={(item, index) => 'instagram' + index}
                                />
                            )}
                </View>
            </View>

            <View style={[styles.section, { flex: 1 }]}>
                <View style={[styles.content, { flex: 1 }]}>
                    <View>
                        <Fontisto name="quote-left" size={64} color={Theme.green} />
                        <Text style={[styles.text_quote, { marginTop: 20 }]}>
                            It is certain, in any case, that ignorance,
                            allied with power, is the most ferocious enemy
                            justice can have.
                                </Text>
                        <Text style={[styles.text_quote]}>
                            - James Baldwin
                                </Text>
                    </View>
                </View>
            </View>

            {/*<View style={styles.footer}>
                        <View style={{flexDirection: 'column', alignItems: 'center'}}>
                            <View style={{flex: 1, flexDirection: 'row', width: 1024, maxWidth: '100%'}}>
                                <View style={{flex: 1, justifyContent: 'flex-start', flexDirection: 'row', borderColor: '#fff', borderRightWidth: 2, paddingRight: 40, paddingTop: 40, paddingBottom: 40}}>
                                    <Text style={[styles.text_header3, {color: '#fff'}]}>Subscribe</Text>
                                </View>
                                <View style={{flex: 3, justifyContent: 'flex-start', flexDirection: 'row', paddingLeft: 40, paddingTop: 40, paddingBottom: 40}}>
                                    <Text>yolo</Text>
                                </View>
                            </View>
                        </View>
                    </View>*/}


        </TouchableOpacity >
    );
}

const styles = StyleSheet.create(getStyles('button_green, button_white, button_white_text, button_green_text, text_header, text_header2, text_header3, text_header4, text_body, text_quote, section, content, footer'));

export default Page;