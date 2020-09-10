import React from 'react';
import { default as NextLink } from "next/link";
import { useStateValue } from "../components/State";
import { Text, StyleSheet, Button, View, Linking } from 'react-native';
import { getStyles, Theme } from '../utils';

export function Link(props) {

    const [{ view, isWeb }, dispatch] = useStateValue();
    const external = props.href.slice(0,1) !== '/';

    const handleURL = (e) => {
        if (!external) {
            dispatch({type: 'setView', view: props.href || ''})
        }
    }

    if (props.children) {
        if (isWeb) {
            return external ? 
                <NextLink href={props.href || ''}>
                    <a href={props.href || ''} onClick={handleURL} style={{textDecoration: 'none'}}>
                        {props.children}
                    </a>
                </NextLink>
            : <a href={props.href || ''} onClick={handleURL} style={{textDecoration: 'none'}} target="_blank">
                {props.children}
            </a>
        } else {
            return <View onPress={() => Linking.openURL(props.href)}>{props.children}</View>
        }
    }

    return (
        isWeb ? <NextLink href={props.href || ''}>
            <a href={props.href || ''} onClick={handleURL}>
                {props.title}
            </a>
        </NextLink>
        : 
        <Button title={props.title || 'asdf'} color={Theme.green} onPress={handleURL} {...props} />
    )

}

export function Click(url, config) {
    const [{ view, isWeb }, dispatch] = useStateValue();
    if (isWeb) {
        dispatch({type: 'setView', view: url})
    }
    return
}

