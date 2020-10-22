import React, {useState, useEffect} from 'react';
import { useStateValue } from "../components/State";
import {View, Text, StyleSheet, Button, Platform, ActivityIndicator, FlatList, Image} from 'react-native';
import { Link } from "../components/Link"; 
import { RichText } from "../components/RichText"; 
import { getStyles, Theme, getContent, getData, getDataAsync } from '../utils';
import { FontAwesome } from '@expo/vector-icons'; 

function Attribution(props) {

    console.log('attr props', props)
    const [{ view, isWeb, dimensions }, dispatch] = useStateValue();
    const styles = StyleSheet.create(getStyles('text_body2', {isWeb}));

    return (<View style={{marginTop: 20}}>
            {props.attribution.map((attribution, a) => (
                <View key={'attr' + a}>
                    {attribution.attribution_type === 'Photography' ? (
                        <Text style={styles.text_body2}>Thank you to professional photographer {attribution.attribution_name} for donating your time and talent providing the photos for this business.</Text>
                    ) : attribution.attribution_type === 'Videography' ? (
                        <Text style={styles.text_body2}>Thank you to professional videographer {attribution.attribution_name} for donating your time and talent providing the video for this business.</Text>
                    ) : attribution.attribution_type === 'Design' ? (
                        <Text style={styles.text_body2}>Thank you to professional designer {attribution.attribution_name} for donating your time and talent providing the design for this business.</Text>
                    ) : (
                        <Text style={styles.text_body2}>Thank you to volunteer {attribution.attribution_name} for donating your time and talent for this business.</Text>
                    )}
                    {attribution.attribution_link && 
                        <Link href={attribution.attribution_link}>
                            <Text style={styles.text_body2}>
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
                            </Text>
                        </Link>
                    }
                    {attribution.attribution_instagram && 
                        <Link href={'https://instagram.com/' + (attribution.attribution_instagram.indexOf('@') > -1 ? attribution.attribution_instagram.slice(1) : attribution.attribution_instagram)}>
                            <FontAwesome name="instagram" size={16} color="#B56230" style={{display: 'inline-block', width: 16, height: 16, verticalAlign: 'middle', marginRight: 5}} />
                            <Text style={styles.text_body2}>
                                {attribution.attribution_instagram}
                            </Text>
                        </Link>
                    }
                </View>
            ))}
    </View>)
}
export default Attribution