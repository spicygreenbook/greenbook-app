import React, {useState, useEffect} from 'react';
import { useStateValue } from "../components/State";
import {View, Text, StyleSheet, Button, Platform, ActivityIndicator, FlatList, Image} from 'react-native';
import { Link } from "../components/Link"; 
import { RichText } from "../components/RichText"; 
import { getStyles, Theme, getContent, getData, getDataAsync } from '../utils';

function Attribution(props) {

    console.log('attr props', props)
    //const [{ view, isWeb, dimensions }, dispatch] = useStateValue();
    //const styles = StyleSheet.create(getStyles('text_header2, text_body, text_body2, section, content, text_link', {isWeb}));

    return (<View style={{marginTop: 20}}>
            {props.attribution.map((attribution, a) => (
                <View key={'attr' + a}>
                    {attribution.attribution_type === 'Photography' ? (
                        <Text>Thank you to professional photographer {attribution.attribution_name} for donating your time and talent providing the photos for this business.</Text>
                    ) : attribution.attribution_type === 'Videography' ? (
                        <Text>Thank you to professional videographer {attribution.attribution_name} for donating your time and talent providing the video for this business.</Text>
                    ) : attribution.attribution_type === 'Design' ? (
                        <Text>Thank you to professional designer {attribution.attribution_name} for donating your time and talent providing the design for this business.</Text>
                    ) : (
                        <Text>Thank you to volunteer {attribution.attribution_name} for donating your time and talent for this business.</Text>
                    )}
                    {attribution.attribution_link && 
                        <Link href={attribution.attribution_link}>
                            {attribution.attribution_link.replace(
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
                                    ).split('/')[0]}
                        </Link>
                    }
                    {attribution.attribution_instagram && 
                        <Link href={'https://instagram.com/' + (attribution.attribution_instagram.indexOf('@') > -1 ? attribution.attribution_instagram.slice(1) : attribution.attribution_instagram)}>
                            <Icons type="instagram" color="#B56230" style={{display: 'inline-block', width: 16, height: 16, verticalAlign: 'middle', marginRight: 5}} />
                            {attribution.attribution_instagram}
                        </Link>
                    }
                </View>
            ))}
    </View>)
}
export default Attribution