// THIS IS A WEB ONLY ENDPOINT USED TO GENERATE RASTER IMAGES/SCREENSHOTS FOR SHARING
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';
import { getContent } from '../../utils';
import Main from "../../components/Main";
import Head from "next/head";
import qs from 'querystring';
import { getStyles, Theme, states, getListingsByState, statesObj, statesObjRev } from '../../utils';

function getQS() {
    if (typeof window !== 'undefined') {
        return qs.parse((window.location.search || '').substr(1));
    } else {
        return {};
    }
}

function App(props) {

    const styles = StyleSheet.create(getStyles('text_body', {isWeb: true}));
    const [ content, setContent ] = useState();
    const query = getQS();

    let cityState = '';
    if (content) {
        const listingsByState = getListingsByState([content]);
        console.log('listingsByState', listingsByState);
        if (listingsByState) {
            Object.keys(listingsByState).forEach(state => {
                //console.log('state', state);
                Object.keys(listingsByState[state]).forEach(city => {
                    if (city.substr(0,1) !== '_') {
                        //console.log('city', city)
                        cityState = listingsByState[state][city]._name + ', ' + listingsByState[state]._state
                    }
                })
            })
        }
    }

    useEffect(() => {
        let config = {
            type: query.type || 'listing',
            uid: query.name || ''
        };
        console.log('fetch config', config)
        let content;
        async function fetcher() {
            setContent((await getContent(config) || {}).content);
        }
        fetcher();

    }, []);


    console.log('content', content);

    return (
        <div>
            {content && <div style={{
                width: 1200,
                height: 600,
                position: 'relative'}}>
                <View style={{
                    backgroundImage: `url(${content && content.primary_image && content.primary_image.url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                    height: 460
                }}>
                </View>
                <View style={{position: 'absolute', top: 0, padding: 20, left: '50%', marginLeft: '-100px', height: 100, width: 200, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, backgroundColor: Theme.green}}>
                    <Image
                        style={{ width: 160, flex: 1, resizeMode: 'contain' }}
                        alt="Spicy Green Book"
                        source={{ uri: '/images/logo_nav_dark.png' }}
                    />
                </View>
                <View style={{zIndex: (2147483639 + 1), position: 'absolute', left: 0, bottom:0, right:0, backgroundColor: Theme.green, padding: 12, justifyContent: 'rows', alignItems: 'center', justifyContent: 'space-between'}}>
                    <View style={{padding: 10}}>
                        <Text style={[styles.text_body, {fontSize: 24, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase'}]}>Support Black-Owned Businesses</Text>
                    </View>
                    <View>
                        <Text style={[styles.text_body, {fontSize: 40, fontWeight: 'bold', color: '#fff'}]}>{content.name}</Text>
                    </View>
                    <View style={{paddingTop: 10}}>
                        <Text style={[styles.text_body, {fontSize: 24, color: '#fff', textTransform: 'capitalize'}]}>{cityState}</Text>
                    </View>
                </View>
            </div>}
        </div>
    );
}

export default App;
