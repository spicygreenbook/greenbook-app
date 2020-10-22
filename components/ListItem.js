import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import {useStateValue} from "../components/State";
import { getStyles, Theme, responsiveImageWidthCDN } from '../utils';
import { ResponsiveImage } from "./ResponsiveImage"; 
import { Link } from "./Link"; 

export default function ListItem(props) {

    const [{ view, isWeb, theme, dimensions }, dispatch] = useStateValue();
    const styles = StyleSheet.create(getStyles('text_header4', {isWeb, theme}));

    let { listing } = props;

    //console.log('listing', listing);

    return (
        <Link href={'/biz/' + listing.uid}>
            <View style={{borderBottomWidth:props.last ? 0 : 2, borderColor: Theme.green, padding: 20, flexDirection: 'row'}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    {/*<ResponsiveImage style={{width: '100%', aspectRatio: 1}} cdn source={{uri: listing.primary_image.url}} />*/}
                    <Image style={{width: '100%', aspectRatio: 1}} cdn source={{uri: listing.primary_image.url + '&w=400' }} />
                </View>
                <View style={{flex: 2, paddingLeft: 20}}>
                    <Text style={styles.text_header4}>{listing.name}</Text>
                    <Text style={[styles.text_body2,{paddingTop: 10, paddingBottom:20}]}>{listing.description}</Text>
                    <View style={{width: 46, borderColor: Theme.green, borderBottomWidth: 2}} />
                    {!!listing.phone_number && <Text style={[styles.text_body2,{paddingTop: 20}]}>{listing.phone_number}</Text>}
                    {!!listing.address && <Text style={[styles.text_body2,{paddingTop: 10, paddingBottom:20}]}>{listing.address}</Text>}
                </View>
            </View>
        </Link>
    )

}
