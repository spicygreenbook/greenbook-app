import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
//import {TouchableOpacity} from 'react-native-gesture-handler';
import { getStyles, Theme } from '../utils';
import {useStateValue} from "../components/State";
import { AntDesign } from '@expo/vector-icons'; 
import { Link, Click } from '../components/Link';

export default function(props) {

    const [{ view, isWeb, theme, dimensions, menuOpen }, dispatch] = useStateValue();
    const styles = StyleSheet.create(getStyles('nav, text_nav', {isWeb, theme}));

    return (
        <View style={[styles.nav, props.isScrolled ? {backgroundColor: props.theme == 'light' ? '#fff' : '#000'} : {backgroundColor: props.theme == 'light' ? '#fff' : 'transparent'}]}>
            <View style={{padding: 20, flex: 1, alignContent: 'center', borderRightWidth: 2, borderColor: props.theme == 'light' ? Theme.green : '#fff'}}>
                <TouchableOpacity style={{width: '100%', height: 80}} onPress={() => { 
                    dispatch({type: 'setView', view: "/"})
                }}>
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
                </TouchableOpacity>
            </View>
            <View style={{padding: 20, flex: dimensions.window.width < 900 ? 1 : 3, alignContent: 'center', flexDirection: 'row', justifyContent: 'flex-end'}}>
                {dimensions.window.width < 900 ? (
                    <View style={{flex: 1, justifyContent: 'center', flexDirection: 'column', alignItems: 'flex-end'}}>
                        <View style={{width: 40}}>
                            <Button title="Menu" style={{height: 40, backgroundColor: 'orange'}} onPress={() => {
                                console.log('yolo');
                                dispatch({type: 'menuOpen', value: true})
                                dispatch({type: 'setView', view: "/about"})
                            }}>
                                <View style={{borderColor: props.theme === 'light' ? Theme.green : '#fff', borderBottomWidth: 2, marginBottom: 20}} />
                                <View style={{borderColor: props.theme === 'light' ? Theme.green : '#fff', borderBottomWidth: 2}} />
                            </Button>
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
                                <AntDesign name="down" size={22} color={props.theme === 'light' ? Theme.green : '#fff'} style={{marginLeft: 10}} />
                            </View>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center', flexDirection: 'column', alignItems: 'flex-end'}}>
                            <Link href="/join"><Text style={styles.text_nav}>Join</Text></Link>
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

