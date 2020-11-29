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
        <View nativeID="footer" style={styles.footer}>
            <View style={{flexDirection: 'column', alignItems: 'center', borderColor: '#fff', borderTopWidth: 2}}>
                <View style={[dimensions.width < 700 ? {} : {flexDirection: 'row'}, {flex:1, width: 1024, maxWidth: '100%'}]}>
                    <View style={{flex: 3, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row', borderColor: '#fff', borderRightWidth: dimensions.width < 700 ? 0 : 2, paddingTop: 40, paddingBottom:40, paddingRight: dimensions.width < 700 ? 0 : 40, paddingLeft: dimensions.width < 700 ? 0 : dimensions.width < 1080 ? 20 : 0}}>
                        <Link href="/search"><Text style={styles.text_footer}>Browse</Text></Link>
                        <Link href="/about"><Text style={styles.text_footer}>About</Text></Link>
                        <Link href="/add"><Text style={styles.text_footer}>Add Listing</Text></Link>
                        <Link href="/donate"><Text style={styles.text_footer}>Donate</Text></Link>
                        <Link href="/volunteer"><Text style={styles.text_footer}>Volunteer</Text></Link>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around', paddingTop: 40, paddingBottom: 40}}>
                        <Link href="https://www.instagram.com/spicygreenbook/">
                            <FontAwesome name="instagram" size={32} color="#fff" />
                        </Link>
                
                        <Link href="https://twitter.com/spicygreenbook">
                            <FontAwesome name="twitter" size={32} color="#fff" />
                        </Link>

                        <Link href="https://www.linkedin.com/company/spicy-green-book/">
                            <FontAwesome name="linkedin" size={32} color="#fff" />
                        </Link>
                
                        <Link href="https://www.facebook.com/SpicyGreenBook/">
                            <FontAwesome name="facebook" size={32} color="#fff" />
                        </Link>
                    </View>
                </View>
                <View style={{marginTop: 40}}>
                    <Link href="https://spicygreenbook.cdn.prismic.io/spicygreenbook/28695689-cc0d-4f87-a4bd-c751a857aabe_SGB+PressKit+.pdf">
                        <Text style={styles.text_footer}>Press Kit</Text>
                    </Link>
                </View>
                {isWeb && <div style={{marginBottom: 40, textAlign: 'center'}}>
                    <div style={{marginTop: 40, marginBottom: 20}}>
                        <a href="https://vercel.com/?utm_source=spicygreenbook" style={{color: 'inherit', textDecoration: 'none'}} target="_blank">
                            <span style={{display:'inline-block', verticalAlign: 'middle', lineHeight: '50%', fontFamily: 'ApercuMedium', color: '#fff'}}>Powered By</span>
                            {' '}
                            <svg style={{display:'inline-block', verticalAlign: 'middle'}} width="95" height="22" viewBox="0 0 283 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M141.04 16c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.46 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zM248.72 16c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.45 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zM200.24 34c0 6 3.92 10 10 10 4.12 0 7.21-1.87 8.8-4.92l7.68 4.43c-3.18 5.3-9.14 8.49-16.48 8.49-11.05 0-19-7.2-19-18s7.96-18 19-18c7.34 0 13.29 3.19 16.48 8.49l-7.68 4.43c-1.59-3.05-4.68-4.92-8.8-4.92-6.07 0-10 4-10 10zm82.48-29v46h-9V5h9zM36.95 0L73.9 64H0L36.95 0zm92.38 5l-27.71 48L73.91 5H84.3l17.32 30 17.32-30h10.39zm58.91 12v9.69c-1-.29-2.06-.49-3.2-.49-5.81 0-10 4-10 10V51h-9V17h9v9.2c0-5.08 5.91-9.2 13.2-9.2z" fill="#fff"/></svg>
                        </a>
                    </div>
                    <div style={{marginTop: 40}}>
                        <a href="https://www.livechat.com/" target="_blank">
                            <img width="160" src="https://d33wubrfki0l68.cloudfront.net/0e40536c3e870532a51f90f6f143eb4306c21192/32d29/images/logo_rgb_white.svg" alt="Customer service software" />
                        </a>
                    </div>
                    <div style={{marginTop: 40}}>
                        <a href="https://www.re-store.info/" target="_blank">
                            <img width="160" src="https://images.prismic.io/spicygreenbook/90c9280e-5f5f-4c96-9b22-40b5b28cb5d6_98997417-54959080-24e9-11eb-95a7-5e6da055dea7.png?auto=compress,format&w=400" alt="Restore LA" />
                        </a>
                    </div>
                </div>}
            </View>
        </View>
    )

}
