import React from 'react';
import { useStateValue } from "../components/State";
import { StyleSheet, View, Text, Button, ImageBackground} from 'react-native';
import Link from "../components/Link"; 
import { getStyles } from '../utils';

function Page(props) {

    const [{ view, isWeb, dimensions }, dispatch] = useStateValue();
    const styles = StyleSheet.create(getStyles('middle_all,text_hero', {isWeb}));

    return (
    <View>
        <View style={{height: 700}}>
            <ImageBackground source={require('../public/images/home_hero.png')} style={{height: 700}}>
                <View style={styles.middle_all}>
                    <Text style={styles.text_hero}>Some text in here</Text>
                </View>
            </ImageBackground>
        </View>
        <View>
            <Text>This is the home screen5</Text>
            <Link href="/about" title="About Screen" />
        </View>
    </View>
    );
}

export default Page;