import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { getStyles, getImage } from '../utils';
import {useStateValue} from "../components/State";

export default function(props) {

    const [{ view, isWeb }, dispatch] = useStateValue();

    const styles = StyleSheet.create(getStyles('nav', {isWeb}));
    return (
        <View style={styles.nav}>
            <View style={{width: 50, height: 50}}>
                <Image
                    style={{width: 500, height: 50}}
                    alt="Spicy Green Book"
                    source={getImage('images/logo_nav_dark.png', { isWeb })}
                    //source={require('../public/images/logo_nav_dark.png')}
                />
            </View>
        </View>
    )

}

