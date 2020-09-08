import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { getStyles } from '../utils';
import {useStateValue} from "../components/State";
import { AntDesign } from '@expo/vector-icons'; 

export default function(props) {

    const [{ view, isWeb, dimensions }, dispatch] = useStateValue();
    const styles = StyleSheet.create(getStyles('nav, text_nav', {isWeb}));

    return (
        <View style={styles.nav}>
            <View style={{padding: 20, flex: 1, alignContent: 'center', borderRightWidth: 2, borderColor: '#fff'}}>
                <Image
                    style={{width: dimensions.window.width < 900 ? '100%' : 200, flex: 1, resizeMode: 'contain'}}
                    alt="Spicy Green Book"
                    source={isWeb ? {uri: '/images/logo_nav_dark.png'} : require('../public/images/logo_nav_dark.png')}
                />
            </View>
            <View style={{padding: 20, flex: dimensions.window.width < 900 ? 1 : 3, alignContent: 'center', flexDirection: 'row', justifyContent: 'flex-end'}}>
                {dimensions.window.width < 900 ? (
                    <View style={{flex: 1, justifyContent: 'center', flexDirection: 'column'}}>
                        <Text style={{color: '#fff'}}>menu icon</Text>
                    </View>
                ) : (
                    <React.Fragment>
                        <View style={{flex: 3}} />
                        <View style={{flex: 1, justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={{marginRight: 10, ...styles.text_nav}}>About</Text>
                                <AntDesign name="down" size={22} color="#fff" />
                            </View>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center', flexDirection: 'column'}}>
                            <Text style={styles.text_nav}>Join</Text>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center', flexDirection: 'column'}}>
                            <Text style={styles.text_nav}>Donate</Text>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center', flexDirection: 'column'}}>
                            <Text style={styles.text_nav}>Volunteer</Text>
                        </View>
                    </React.Fragment>
                )}
            </View>
        </View>
    )

}

