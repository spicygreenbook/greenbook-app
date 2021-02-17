import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Easing, Animated, Image, TouchableOpacity, Linking } from 'react-native';
import { getStyles, Theme } from '../utils';
import { useStateValue } from "../components/State";
import { AntDesign } from '@expo/vector-icons';
import { Link } from '../components/Link';
import { debounce} from 'lodash/fp';
import useOutsideClick from '../hooks/useOutSideClick';

export default function (props) {

    const [{ view, isWeb, theme, dimensions }, dispatch] = useStateValue();
    // const [active, setActive] = useState(false);
    // const [open, setOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const styles = StyleSheet.create(getStyles('nav, text_nav, text_nav_sub, text_header3', { isWeb, theme }));
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const dropDownRef = useRef();
    const [active, setActive] = useOutsideClick(dropDownRef);

    const ColorIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(fadeAnim, {
            easing: Easing.in,
            toValue: 1,
            duration: 200,
            useNativeDriver: true
        }).start();
    };

    const ColorOut = () => {
        // Will change fadeAnim value to 0 in 5 seconds
        Animated.timing(fadeAnim, {
            easing: Easing.ease,
            toValue: 0,
            duration: 200,
            useNativeDriver: true
        }).start();
    };

    useEffect(() => {
        if (isScrolled === 'down') {
            ColorIn();
        } else if (isScrolled === 'up') {
            ColorOut()
        }
    }, [isScrolled])

    
    function scrollEventListener() {
        let y = document.body.scrollTop || document.documentElement.scrollTop;

        if (y > 10) {
            setIsScrolled('down');

        } else if (y < 10) {
            setIsScrolled('up');
        }
    }

    useEffect(() => {
        if(view !== '/') return;
        
        const fn = debounce(200, scrollEventListener)
        window.addEventListener('scroll', fn, false)

        return () => window.removeEventListener('scroll', fn, false)
    }, []);



    return (
        <View
          nativeID="nav"
          style={[styles.nav, {
              borderBottomWidth: props.theme === 'light' && (props.isScrolled || (view.indexOf('/biz') === 0 && props.isScrolled)) ? 2 : 0,
              borderColor: Theme.green,
              backgroundColor: props.theme == 'light' ? '#fff' : 'transparent'
            }]} >
            {props.theme === 'dark' && <Animated.View
                style={{
                    position: 'absolute',
                    left: 0, top: 0, bottom: 0, right: 0,
                    backgroundColor: '#000',
                    opacity: fadeAnim
                }}/>
            }
            <View style={{ padding: 20, flex: 1, alignContent: 'center', borderRightWidth: 2, borderColor: props.theme == 'light' ? Theme.green : '#fff' }}>
                <Link href="/" fill>
                    <View style={{ height: '100%' }}>
                        {props.theme == 'light' ?
                            <Image
                                style={{ width: dimensions.width < 1100 ? '100%' : 200, flex: 1, resizeMode: 'contain' }}
                                alt="Spicy Green Book"
                                source={isWeb ? { uri: '/images/logo_nav_light.png' } : require('../public/images/logo_nav_light.png')}
                            />
                            :
                            <Image
                                style={{ width: dimensions.width < 1100 ? '100%' : 200, flex: 1, resizeMode: 'contain' }}
                                alt="Spicy Green Book"
                                source={isWeb ? { uri: '/images/logo_nav_dark.png' } : require('../public/images/logo_nav_dark.png')}
                            />
                        }
                    </View>
                </Link>
            </View>
            <View style={{ padding: 20, flex: dimensions.width < 1100 ? 1 : 3, alignContent: 'center', flexDirection: 'row', justifyContent: 'flex-end' }}>
                {dimensions.width < 1100 ? (
                    <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'column', alignItems: 'flex-end' }}>
                        <View style={{ width: 40 }}>
                            <TouchableOpacity onPress={() => {
                                dispatch({ type: 'menuOpen', value: true })
                            }}>
                                <View style={{ borderColor: props.theme === 'light' ? Theme.green : '#fff', borderBottomWidth: 2, marginBottom: 20 }} />
                                <View style={{ borderColor: props.theme === 'light' ? Theme.green : '#fff', borderBottomWidth: 2 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                        <View style={[{flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}, view !== '/' && { maxWidth: 750, justifyContent: 'space-between' }]}>
                            <Link href="/search"><Text style={styles.text_nav}>Directory</Text></Link>                            
                            <View style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'flex-end' }}>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                    <Link href="/about"><Text style={[styles.text_nav]}>About</Text></Link>
                                    <AntDesign 
                                        // ref={dropDownIconRef}
                                        name="down" 
                                        size={22} 
                                        color={props.theme === 'light' ? Theme.green : '#fff'} 
                                        style={{ cursor: 'pointer', marginLeft: 10 }} 
                                        onPress={() => setActive(true)} 
                                    />
                                </View>
                                <div
                                    ref={dropDownRef} 
                                    style={{
                                        position: 'absolute', minHeight: 175, justifyContent: 'space-between', top: 30, right: 0, backgroundColor: '#fff', minWidth: 120, padding: 20,
                                        flexDirection: 'column',
                                        opacity: active ? 1 : 0, 
                                        display: active ? 'flex' : 'none',
                                        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
                                    }} 
                        
                                >     
                                    <Link href="https://shop.spicygreenbook.org"><Text style={styles.text_nav_sub}>Store</Text></Link>              
                                    <Link href="/updates"><Text style={styles.text_nav_sub}>Updates</Text></Link>    
                                    <Link href="/team"><Text style={styles.text_nav_sub}>Team</Text></Link>
                                    <Link href="/volunteers"><Text style={styles.text_nav_sub}>Volunteers</Text></Link>
                                    <Link href="/process"><Text style={styles.text_nav_sub}>Process</Text></Link>       
                                    <Link href="/press"><Text style={styles.text_nav_sub}>Press</Text></Link>              
                                    <Link href="/testimonials"><Text style={styles.text_nav_sub}>Testimonials</Text></Link>              
                                    <Link href="/faq"><Text style={styles.text_nav_sub}>FAQ</Text></Link>                           
                                    <Link href="/contact"><Text style={styles.text_nav_sub}>Contact Us</Text></Link>                           
                                </div>
                            </View>
    
                            <Link href="/add"><Text style={[styles.text_nav]}>Add Listing</Text></Link>
                            <Link href="/donate"><Text style={[styles.text_nav]}>Donate</Text></Link>
                            <Link href="/volunteer"><Text style={[styles.text_nav]}>Volunteer</Text></Link>
                            
                            { view === '/' &&
                                <TouchableOpacity onPress={() => {
                                    const ele = document.getElementById('download-app');
                                    ele.scrollIntoView({ block: "center" });
                                }}>
                                    <View style={{ backgroundColor: '#fff', height: 40, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4, borderRadius: 50 }}>
                                        <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#000', height: 1, borderRadius: 50, paddingHorizontal: 18, paddingTop: 18, paddingBottom: 16 }}>
                                            <Text style={[styles.text_header3, {color: '#fff', fontSize: 22}]}>DOWNLOAD OUR APP</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            }

                        </View>
                    )}
            </View>
        </View>
    )
}