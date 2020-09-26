import React, {useState, useEffect} from 'react';
import { useStateValue } from "../components/State";
import { StyleSheet, View, ScrollView, FlatList, Text, Button, SGBButton, Image, ImageBackground, ActivityIndicator, TouchableOpacity} from 'react-native';
import { Link } from "../components/Link"; 
import { ResponsiveImage } from "../components/ResponsiveImage"; 
import RichText from "../components/RichText"; 
import { getStyles, Theme, getDataAsync, GridWidth, displayDate } from '../utils';
import { Entypo } from '@expo/vector-icons'; 

let currentIndexListing = 0;
const viewableItemsChangedListing = ({ viewableItems, changed }) => {
    console.log("Visible items are", viewableItems);
    console.log("Changed in this iteration", changed);
    currentIndexListing = viewableItems && viewableItems[0] && viewableItems[0].index;
}
const viewableItemsChangedConfigListing = {
    itemVisiblePercentThreshold: 50
};

function Page(props) {

    const [{ view, isWeb, dimensions }, dispatch] = useStateValue();
    const styles = StyleSheet.create(getStyles('middle_all, text_hero, text_header, text_header2, text_header3, text_header4, text_body, section, content', {isWeb}));

    const [ loadingPress, setLoadingPress ] = useState(true);
    const [ errorPress, setErrorPress ] = useState('');
    const [ press, setPress ] = useState([]);

    const [ loadingUpdates, setLoadingUpdates ] = useState(true);
    const [ errorUpdates, setErrorUpdates ] = useState('');
    const [ updates, setUpdates ] = useState([]);

    const [ loadingInstagram, setLoadingInstagram ] = useState(true);
    const [ errorInstagram, setErrorInstagram ] = useState('');
    const [ instagram, setInstagram ] = useState([]);

    const [ loadingListings, setLoadingListings ] = useState(true);
    const [ errorListings, setErrorListings ] = useState('');
    const [ Listings, setListings ] = useState([]);

    useEffect( () => {
        getDataAsync({
            type: 'press'
        }).then(press => {
            console.log('press izz', press)
            setLoadingPress(false);
            setPress(press)
        }).catch(err => {
            console.error(err);
            setLoadingPress(false);
            setErrorPress('Failed to load latest press updates.');
        })

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

        getDataAsync({
            type: 'instagram'
        }).then(instagram => {
            console.log('instagram izz', instagram)
            setLoadingInstagram(false);
            setInstagram(instagram)
        }).catch(err => {
            console.error(err);
            setLoadingInstagram(false);
            setErrorInstagram('Failed to load latest instagram.');
        })

        getDataAsync({
            type: 'listing'
        }).then(listings => {
            console.log('Listings izz', listings)
            setLoadingListings(false);
            setListings(listings)
        }).catch(err => {
            console.error(err);
            setLoadingListings(false);
            setErrorListings('Failed to load latest listings.');
        })
    }, [])

    let newListingRef;
    const scrollToIndexListing = (obj, len) => {
        if (obj.index < 0) { obj.index = 0; }
        if (obj.index > len-1) { obj.index = len-1; }
        if (newListingRef) {
            newListingRef.scrollToIndex(obj)
        } else {
            console.log('no listing ref')
        }
    }

    return (
        <View>
            <View style={{height: 700, backgroundColor: '#000'}}>
                <ImageBackground source={require('../public/images/home_hero.png')} style={{height: 700}}>
                    <View style={[styles.middle_all, {flex: 1, alignItems: 'stretch', padding: 20}]}>
                        <Text style={styles.text_hero}>
                            Support{"\n"}
                            Black Owned{"\n"}
                            Businesses
                        </Text>
                    </View>
                </ImageBackground>
            </View>
            <View style={{backgroundColor: Theme.green_bg, padding: 20, paddingTop: 60, paddingBottom: 60}}>
                <View style={{justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap'}}>
                    {loadingPress ? (
                        <ActivityIndicator size="large" />
                    ) : errorPress ? (
                        <Text>{errorPress}</Text>
                    ) : (
                        <React.Fragment>
                            {press.filter(pressRow => pressRow.press_site_logo_white).map((pressRow, p) => 
                                (<View style={{width: GridWidth({minWidth: 140}), margin: 20}} key={'press' + p}>
                                    <Link href={pressRow.link}>
                                        <Image source={{uri: pressRow.press_site_logo_white.url + '&w=300'}} style={{height: 40, resizeMode: 'contain'}} />
                                    </Link>
                                </View>)
                            )}
                        </React.Fragment>
                    )
                    }
                </View>
            </View>
            <View style={styles.section}>
                <View style={styles.content}>
                    <View style={dimensions.window.width < 700 ? {} : {flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center'}}>
                        <View style={dimensions.window.width < 700 ? {paddingLeft: 40, paddingRight: 40} : {flex: 1, paddingLeft: 80, paddingRight: 80}}>
                            <ResponsiveImage
                                style={{width: 804, resizeMode: 'contain', aspectRatio: 1.37245}}
                                alt="Spicy Green Book"
                                source={isWeb ? {uri: '/images/home_green_book.png'} : require('../public/images/home_green_book.png')}
                            />
                        </View>
                        <View style={dimensions.window.width < 700 ? {paddingTop: 40} : {flex: 2, paddingLeft: 20}}>
                            <Text style={[styles.text_header, {marginBottom: 30}]}>ABOUT SGB</Text>
                            <Text style={styles.text_body}>
                                Inspired by Victor Green, Spicy Green Book is a team of volunteers committed to help complie a directory of black owned businesses.
                                 
                                Our mission is to establish a space to help people who seek to create change within their communities.
                            </Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={{backgroundColor: '#000', position: 'relative'}}>
                {loadingListings ? (
                    <ActivityIndicator size="large" />
                ) : errorListings ? (
                    <Text style={{color: '#fff'}}>{errorListings}</Text>
                ) : (
                    <React.Fragment>
                        <FlatList
                            horizontal
                            data={Listings.sort((a,b) => {
                                    return a.time - b.time
                                }).slice(0,10)
                            }
                            ref={(ref) => { newListingRef = ref; }}
                            onViewableItemsChanged={viewableItemsChangedListing}
                            viewabilityConfig={viewableItemsChangedConfigListing}
                            renderItem={({ item, index, separators }) => (
                                <View>
                                    <ImageBackground source={{uri: item.images[0].image.url}} style={{width: dimensions.window.width, height: 700}}>
                                    </ImageBackground>
                                    <View style={{
                                        position: 'absolute', left: 0, top: 0, bottom: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.5)', paddingTop: 80, paddingBottom: 80, paddingLeft: 20, paddingRight: 20,
                                        flexDirection: 'column',
                                        justifyContent: 'space-between'
                                    }}>
                                        <View style={{flex: 2}}>
                                            <Text style={[styles.text_header3, {color: '#fff'}]}>
                                                NEW LISTING
                                            </Text>
                                        </View>
                                        <View style={{flex: 1, height: 200}}>
                                        </View>
                                        <View style={{flex: 2}}>
                                            <Text style={[styles.text_header2, {color: '#fff'}]}>
                                                {item.name}
                                            </Text>
                                            <Link button={'button_white'} title={'Learn More'} href={'/biz/' + item.uid} style={{marginTop: 40}}/>
                                        </View>
                                    </View>
                                </View>
                            )}
                            keyExtractor={(item, index) => 'listing' + index}
                        />
                        <View style={{position: 'absolute', top: '50%', marginTop: -100, left:10, right:10, height: 200, flex: 1}}>
                            <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                                <View style={{flex: 1}}>
                                    <TouchableOpacity onPress={(e) => scrollToIndexListing({animated: true, index: currentIndexListing-1}, 10)}>
                                        <Entypo name="chevron-thin-left" size={48} color="#fff" />
                                    </TouchableOpacity>
                                </View>
                                <View style={{flex: 1, alignItems: 'flex-end'}}>
                                    <TouchableOpacity onPress={(e) => scrollToIndexListing({animated: true, index: currentIndexListing+1}, 10)}>
                                        <Entypo name="chevron-thin-right" size={48} color="#fff" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </React.Fragment>
                )}
            </View>

            <View style={[styles.section, {flex:1}]}>
                <View style={[styles.content, {flex:1}]}>
                    <Text style={[styles.text_header3, {marginBottom: 20}]}>
                        UPDATES
                    </Text>
                    {loadingUpdates ? (
                        <ActivityIndicator size="large" />
                    ) : errorUpdates ? (
                        <Text>{errorUpdates}</Text>
                    ) : (
                        <FlatList
                            horizontal={true}
                            data={updates}
                            renderItem={({ item, index, separators }) => (
                                <View style={{ margin: 10}} key={'update' + index}>
                                    <Image source={{uri: item.image.url + '&w=600'}} style={{width: 300, height:300, resizeMode: 'cover'}} />
                                    <Text style={styles.text_header4}>{item.title}</Text>
                                    <Text>{item.date}</Text>
                                </View>
                            )}
                            keyExtractor={(item, index) => 'update' + index}
                        />
                    )}
                </View>
            </View>

            <View style={[styles.section, {flex:1}]}>
                <View style={[styles.content, {flex:1}]}>
                    <Text style={[styles.text_header3, {marginBottom: 20}]}>
                        FOLLOW @SPICYGREENBOOK
                    </Text>
                    {loadingUpdates ? (
                        <ActivityIndicator size="large" />
                    ) : errorUpdates ? (
                        <Text>{errorUpdates}</Text>
                    ) : (
                        <FlatList
                            horizontal={true}
                            data={instagram}
                            renderItem={({ item, index, separators }) => (
                                <View style={{flex: 1, width: 300, margin: 10}}>
                                    <Image source={{uri: item.thumbnail}} style={{width: 300, height:300, resizeMode: 'cover'}} />
                                </View>
                            )}
                            keyExtractor={(item, index) => 'instagram' + index}
                        />
                    )}
                </View>
            </View>

            <View>
                <Link href="/about" title="About Screen" />
            </View>

            <View style={{height: 100}}>
                <Text>hi</Text>
            </View>
        </View>
    );
}

export default Page;