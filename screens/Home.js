import React from 'react';
import { useStateValue } from "../components/State";
import { StyleSheet, View, Text, Button, ImageBackground} from 'react-native';
import { Link } from "../components/Link"; 
import { getStyles } from '../utils';

function Page(props) {

    const [{ view, isWeb, dimensions }, dispatch] = useStateValue();
    const styles = StyleSheet.create(getStyles('middle_all, text_hero', {isWeb}));

    return (
    <View>
        <View style={{height: 700}}>
            <ImageBackground source={require('../public/images/home_hero.png')} style={{height: 700}}>
                <View style={[styles.middle_all, {flex: 1, alignItems: 'stretch', padding: 20}]}>
                    <Text style={styles.text_hero}>
                        Support{"\n"}
                        Black Owned{"\n"}
                        Businesses
                    </Text>
                </View>
            </ImageBackground>
        </View>
        <View>
            <Link href="/about" title="About Screen" />
        </View>
    </View>
    );
}

export default Page;