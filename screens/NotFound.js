import React, {useState, useEffect} from 'react';
import { useStateValue } from "../components/State";
import {View, Text, StyleSheet, Button, Platform} from 'react-native';
import { Link } from "../components/Link"; 
import { RichText } from "../components/RichText"; 
import { getStyles, Theme } from '../utils';


function Page(props) {

    const [{ view, isWeb, dimensions }, dispatch] = useStateValue();
    const styles = StyleSheet.create(getStyles('text_header2, section, content, body', {isWeb}));

    return (
        <React.Fragment>
            <View style={[styles.section, {backgroundColor: Theme.green_bg, paddingTop: 180}]}>
                <View style={[styles.content, {flexDirection: 'column', alignItems: 'center'}]}>
                    <Text accessibilityRole="header" aria-level="2" style={[styles.text_header2, {color: '#fff'}]}>404 - Page Not Found</Text>
                </View>
            </View>
            <View style={[styles.section]}>
                <View style={styles.content}>
                    <Text style={[styles.body, {textAlign: 'center'}]}>
                        We couldn't find that page.
                    </Text>
                </View>
            </View>
        </React.Fragment>
    )
}


export default Page;