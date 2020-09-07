import React from 'react';
import { useStateValue } from "../components/State";
import {View, Text, StyleSheet, Button, Platform} from 'react-native';
import Link from "../components/Link"; 

function Page(props) {
    return <View style={styles.container}>
        <Text>view is {props.view}</Text>
        <Text>This is the home screen5</Text>
        <Link href="/about" title="About Screen" />

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