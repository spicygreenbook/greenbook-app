import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
//import {TouchableOpacity} from 'react-native-gesture-handler';
import { getStyles, Theme } from '../utils';
import {useStateValue} from "../components/State";
import { FontAwesome } from '@expo/vector-icons'; 
import { Link, Click } from '../components/Link';

export default function(props) {

    const [{ view, isWeb, theme, dimensions }, dispatch] = useStateValue();
    const styles = StyleSheet.create(getStyles('content, footer, text_footer, text_header3', {isWeb, theme}));

    return (
        <View style={styles.footer}>
            <View style={{flexDirection: 'column', alignItems: 'center', borderColor: '#fff', borderTopWidth: 2}}>
                <View style={{flex:1, flexDirection: 'row', width: 1024, maxWidth: '100%'}}>
                    <View style={{flex: 3, justifyContent: 'flex-start', flexDirection: 'row', borderColor: '#fff', borderRightWidth: 2, paddingTop: 40, paddingBottom:40, paddingRight: 40}}>
                        <View style={{flex: 1}}>
                            <Link href="/search"><Text style={styles.text_footer}>Browse</Text></Link>
                        </View>
                        <View style={{flex: 1}}>
                            <Link href="/about"><Text style={styles.text_footer}>About</Text></Link>
                        </View>
                        <View style={{flex: 1}}>
                            <Link href="/join"><Text style={styles.text_footer}>Join</Text></Link>
                        </View>
                        <View style={{flex: 1}}>
                            <Link href="/donate"><Text style={styles.text_footer}>Donate</Text></Link>
                        </View>
                        <View style={{flex: 1}}>
                            <Link href="/volunteer"><Text style={styles.text_footer}>Volunteer</Text></Link>
                        </View>
                    </View>
                    <View style={{flex: 1, justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 40, paddingTop: 40, paddingBottom: 40}}>
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
            </View>
        </View>
    )

}
