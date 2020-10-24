import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
//import {TouchableOpacity} from 'react-native-gesture-handler';
import { getStyles, Theme } from '../utils';
import {useStateValue} from "../components/State";
import { Link, Click } from '../components/Link';
import { EvilIcons } from '@expo/vector-icons'; 
import { useRouter } from 'next/router'

export default function(props) {

    const [{ view, isWeb, theme, dimensions, menuOpen }, dispatch] = useStateValue();
    const styles = StyleSheet.create(getStyles('text_menu', {isWeb, theme}));
    const router = useRouter();

    const menu = [{
        title: 'Browse',
        href: '/search'
    }, {
        title: 'About',
        href: '/about'
    }, {
        title: 'Join',
        href: '/add'
    }, {
        title: 'Donate',
        href: '/donate'
    }, {
        title: 'Volunteer',
        href: '/volunteer'
    }];

    return (
        <View style={{flexDirection: 'column', position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, height: '100%', zIndex: 10, backgroundColor: Theme.green_bg}}>
            <View style={{position: 'absolute', left: 10, top: isWeb ? 10 : 60, zIndex: 10}}>
                <TouchableOpacity onPress={(e) => {
                    dispatch({type: 'menuOpen', value: false})
                }}>
                    <EvilIcons name="close" size={48} color="#fff" />
                </TouchableOpacity>
            </View>
            {menu.map((item, i) => (
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', borderColor: '#fff', borderBottomWidth: 2}}>
                        <TouchableOpacity onPress={e => {
                            dispatch({type: 'menuOpen', value: false})
                            dispatch({type: 'setView', view: item.href || ''})
                            router.push(item.href)
                        }}>
                            <Text style={styles.text_menu}>{item.title}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
        </View>
    )

}

