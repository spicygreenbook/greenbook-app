import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Easing, Animated, Button, Image, TouchableOpacity } from 'react-native';
//import {TouchableOpacity} from 'react-native-gesture-handler';
import { getStyles, Theme } from '../utils';
import { useStateValue } from "../components/State";
import { AntDesign } from '@expo/vector-icons'; 
import { Link, Click } from '../components/Link';

export default function(props) {

    const [{ view, isWeb, theme, dimensions, menuOpen }, dispatch] = useStateValue();
    const styles = StyleSheet.create(getStyles('nav, text_nav, text_nav_sub', {isWeb, theme}));

    const [ active, setActive ] = useState('');

    const fadeAnim = useRef(new Animated.Value(0)).current;

    const ColorIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(fadeAnim, {
            easing: Easing.bounce,
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start();
    };

    const ColorOut = () => {
        // Will change fadeAnim value to 0 in 5 seconds
        Animated.timing(fadeAnim, {
            easing: Easing.ease,
            toValue: 0,
            duration: 500,
            useNativeDriver: true
        }).start();
    };

    useEffect(() => {
        if (props.isScrolled) {
            ColorIn();
        } else {
            ColorOut()
        }
    }, [props.isScrolled])

    console.log('theme', props.theme, 'scrolled', props.isScrolled, 'view', view)

    return (
        <View
        style={[styles.nav,
          {
            borderBottomWidth: props.theme === 'light' && (props.isScrolled || (view.indexOf('/biz') === 0 && props.isScrolled)) ? 2 : 0,
            borderColor: Theme.green,
            backgroundColor: props.theme == 'light' ? '#fff' : 'transparent'
            }
        ]}>
            {props.theme === 'dark' && <Animated.View 
                style={[
                    {position: 'absolute',
                    left: 0, top: 0, bottom: 0, right:0,
                    backgroundColor: '#000',
                    opacity: fadeAnim}
                ]}
            />}
            <View style={{padding: 20, flex: 1, alignContent: 'center', borderRightWidth: 2, borderColor: props.theme == 'light' ? Theme.green : '#fff'}}>
                <Link href="/" fill>
                    <View style={{height: '100%'}}>
                    {props.theme == 'light' ? 
                        <Image
                            style={{width: dimensions.window.width < 900 ? '100%' : 200, flex: 1, resizeMode: 'contain'}}
                            alt="Spicy Green Book"
                            source={isWeb ? {uri: '/images/logo_nav_light.png'} : require('../public/images/logo_nav_light.png')}
                        />
                        :
                        <Image
                            style={{width: dimensions.window.width < 900 ? '100%' : 200, flex: 1, resizeMode: 'contain'}}
                            alt="Spicy Green Book"
                            source={isWeb ? {uri: '/images/logo_nav_dark.png'} : require('../public/images/logo_nav_dark.png')}
                        />
                    }
                    </View>
                </Link>
            </View>
            <View style={{padding: 20, flex: dimensions.window.width < 900 ? 1 : 3, alignContent: 'center', flexDirection: 'row', justifyContent: 'flex-end'}}>
                {dimensions.window.width < 900 ? (
                    <View style={{flex: 1, justifyContent: 'center', flexDirection: 'column', alignItems: 'flex-end'}}>
                        <View style={{width: 40}}>
                            <TouchableOpacity onPress={() => {
                                dispatch({type: 'menuOpen', value: true})
                            }}>
                                <View style={{borderColor: props.theme === 'light' ? Theme.green : '#fff', borderBottomWidth: 2, marginBottom: 20}} />
                                <View style={{borderColor: props.theme === 'light' ? Theme.green : '#fff', borderBottomWidth: 2}} />
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <React.Fragment>
                        <View style={{flex: Math.floor(dimensions.window.width/800)}} />
                        <View style={{flex: 1, justifyContent: 'center', flexDirection: 'column', alignItems: 'flex-end'}}>
                            <Link href="/search"><Text style={styles.text_nav}>Browse</Text></Link>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center', flexDirection: 'column', alignItems: 'flex-end'}}>
                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                                <Link href="/about"><Text style={styles.text_nav}>About</Text></Link>
                                <AntDesign name="down" size={22} color={props.theme === 'light' ? Theme.green : '#fff'} style={{cursor: 'pointer', marginLeft: 10}} onClick={e => {
                                    setActive(active === 'about' ? '' : 'about');
                                }}/>
                            </View>
                            <View style={{position: 'absolute', top: 60, right: 0, backgroundColor: '#fff', minWidth: 160, padding: 20,
                                opacity:active === 'about' ? 1 : 0, display:active === 'about' ? '' : 'none'}}>
                                <View style={{flex: 1, flexDirection: 'row', paddingBottom: 10}}>
                                    <Link href="/updates"><Text style={styles.text_nav_sub}>Updates</Text></Link>
                                </View>
                                <View style={{flex: 1, flexDirection: 'row', paddingBottom: 10}}>
                                    <Link href="/team"><Text style={styles.text_nav_sub}>Team</Text></Link>
                                </View>
                                <View style={{flex: 1, flexDirection: 'row', paddingBottom: 10}}>
                                    <Link href="/process"><Text style={styles.text_nav_sub}>Process</Text></Link>
                                </View>
                                <View style={{flex: 1, flexDirection: 'row', paddingBottom: 10}}>
                                    <Link href="/press"><Text style={styles.text_nav_sub}>Press</Text></Link>
                                </View>
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                    <Link href="/contact"><Text style={styles.text_nav_sub}>Contact Us</Text></Link>
                                </View>
                            </View>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center', flexDirection: 'column', alignItems: 'flex-end'}}>
                            <Link href="/add"><Text style={styles.text_nav}>Join</Text></Link>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center', flexDirection: 'column', alignItems: 'flex-end'}}>
                            <Link href="/donate"><Text style={styles.text_nav}>Donate</Text></Link>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center', flexDirection: 'column', alignItems: 'flex-end'}}>
                            <Link href="/volunteer"><Text style={styles.text_nav}>Volunteer</Text></Link>
                        </View>
                    </React.Fragment>
                )}
            </View>
        </View>
    )

}

