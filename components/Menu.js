import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';

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
        title: 'Directory',
        href: '/search'
    }, {
        title: 'Donate',
        href: '/donate'
    }, {
        title: 'Store',
        href: '/shop'
    }, {
        title: 'Add Listing',
        href: '/add'
    }, {
        title: 'Volunteer',
        href: '/volunteer'
    }, {
        title: 'About',
        href: '/about'
    }, {
        title: 'Updates',
        href: '/updates'
    }, {
        title: 'Team',
        href: '/team'
    }, {
        title: 'Volunteers',
        href: '/volunteers'
    }, {
        title: 'Process',
        href: '/process'
    }, {
        title: 'Press',
        href: '/press'
    }, {
        title: 'Testomonials',
        href: '/testimonials'
    }, {
        title: 'FAQ',
        href: '/faq'
    }, {
        title: 'Contact',
        href: '/contact'
    }];

    return (
        <View style={{flexDirection: 'column', position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, height: '100%', zIndex: 10, paddingTop: isWeb ? 0 : 40, backgroundColor: Theme.green_bg}}>
            <View style={{position: 'absolute', left: 10, top: isWeb ? 10 : 60, zIndex: 10}}>
                <TouchableOpacity onPress={(e) => {
                    dispatch({type: 'menuOpen', value: false})
                }}>
                    <EvilIcons name="close" size={48} color="#fff" />
                </TouchableOpacity>
            </View>
            {menu.map((item, i) => (
                <View key={'nav' + i} style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', borderColor: '#fff', borderBottomWidth: 2}}>
                        <TouchableOpacity onPress={e => {
                            console.log('item', item)
                            dispatch({type: 'menuOpen', value: false})
                            dispatch({type: 'setView', view: item.href || ''})
                        }}>
                            <Text style={styles.text_menu}>{item.title}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
        </View>
    )

}

