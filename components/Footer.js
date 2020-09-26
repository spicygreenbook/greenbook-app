import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
//import {TouchableOpacity} from 'react-native-gesture-handler';
import { getStyles, Theme } from '../utils';
import {useStateValue} from "../components/State";
import { FontAwesome } from '@expo/vector-icons'; 
import { Link, Click } from '../components/Link';

export default function(props) {

    const [{ view, isWeb, theme, dimensions }, dispatch] = useStateValue();
    const styles = StyleSheet.create(getStyles('footer, text_footer', {isWeb, theme}));

    return (
        <View style={styles.footer}>
            <View style={{flex: 3, justifyContent: 'center', flexDirection: 'row'}}>
                <View style={{flex: 1, justifyContent: 'center', flexDirection: 'column'}}>
                    <Link href="/about"><Text style={styles.text_footer}>About</Text></Link>
                </View>
                <View style={{flex: 1, justifyContent: 'center', flexDirection: 'column'}}>
                    <Link href="/join"><Text style={styles.text_footer}>Join</Text></Link>
                </View>
                <View style={{flex: 1, justifyContent: 'center', flexDirection: 'column'}}>
                    <Link href="/donate"><Text style={styles.text_footer}>Donate</Text></Link>
                </View>
                <View style={{flex: 1, justifyContent: 'center', flexDirection: 'column'}}>
                    <Link href="/volunteer"><Text style={styles.text_footer}>Volunteer</Text></Link>
                </View>
            </View>
            <View style={{flex: 1, justifyContent: 'center', flexDirection: 'row'}}>
                <Link href="https://www.instagram.com/spicygreenbook/" style={{flex: 1, marginLeft: 10}}>
                    <FontAwesome name="instagram" size={32} color="#fff" />
                </Link>
                <Link href="https://twitter.com/Spicy_GreenBook" style={{flex: 1, marginLeft: 10}}>
                    <FontAwesome name="twitter" size={32} color="#fff" />
                </Link>
                <Link href="https://www.linkedin.com/company/spicy-green-book/" style={{flex: 1, marginLeft: 10}}>
                    <FontAwesome name="linkedin" size={32} color="#fff" />
                </Link>
                <Link href="https://www.facebook.com/SpicyGreenBook/" style={{flex: 1, marginLeft: 10}}>
                    <FontAwesome name="facebook" size={32} color="#fff" />
                </Link>
            </View>
        </View>
    )

}
