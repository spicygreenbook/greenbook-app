import React from 'react';
import { default as NextLink } from "next/link";
import { useStateValue } from "../components/State";
import { Text, StyleSheet, Button } from 'react-native';
import { getStyles, Theme } from '../utils';

export function Link(props) {

    const [{ view, isWeb }, dispatch] = useStateValue();

    if (props.children) {
        if (isWeb) {
            return <NextLink href={props.href || ''}>
                <a href={props.href || ''} onClick={() => dispatch({type: 'setView', view: props.href || ''})} style={{textDecoration: 'none'}}>
                    {props.children}
                </a>
            </NextLink>
        }
    }

    return (
        isWeb ? <NextLink href={props.href || ''}>
            <a href={props.href || ''} onClick={() => dispatch({type: 'setView', view: props.href || ''})}>
                {props.title}
            </a>
        </NextLink>
        : 
        <Button title={props.title || 'asdf'} color={Theme.green} onPress={() => dispatch({type: 'setView', view: props.href})} {...props} />
    )

}

export function Click(url, config) {
    const [{ view, isWeb }, dispatch] = useStateValue();
    if (isWeb) {
        dispatch({type: 'setView', view: url})
    }
    return
}

