import React from 'react';
import { useStateValue } from "../components/State";
import {View, Text, StyleSheet, Button, Platform} from 'react-native';
import Link from "../components/Link"; 

function Page(props) {
    return <View style={styles.container}>
        <Text>This is the aabout screen</Text>
        <Link href="/" title="Home Screen" />
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default Page;