import React from 'react';
import { default as NextLink } from "next/link";
import { useStateValue } from "../components/State";
import { Text, StyleSheet, Button, View, TouchableOpacity, Linking } from 'react-native';
import { getStyles, Theme } from '../utils';

export function Link(props) {

    const [{ view, isWeb }, dispatch] = useStateValue();
    const external = props.href.slice(0,1) !== '/';

    const handleURL = (e) => {
        if (!external) {
            dispatch({type: 'setView', view: props.href || ''})
        } else {
            Linking.openURL(props.href || '')
        }
    }

    if (props.button) {
        const styles = StyleSheet.create(getStyles(props.button + ', ' + props.button + '_text', {isWeb}));
        return isWeb && !external ? <NextLink href={props.href || ''}>
            <View style={[{flexDirection: 'row', cursor: 'pointer'}, props.style ? props.style : {}]}>
                <View style={styles[props.button]}>
                    <Text style={styles[props.button + '_text']}>{props.title}</Text>
                </View>
            </View>
        </NextLink>
        : isWeb && external ? <a href={props.href || ''} target="_blank" style={{textDecoration: 'none'}}>
            <View style={[{flexDirection: 'row', cursor: 'pointer'}, props.style ? props.style : {}]}>
                <View style={styles[props.button]}>
                    <Text style={styles[props.button + '_text']}>{props.title}</Text>
                </View>
            </View>
        </a>
        : 
        <TouchableOpacity onPress={handleURL}>
            <View style={[{flexDirection: 'row'}, props.style ? props.style : {}]}>
                <View style={styles[props.button]}>
                    <Text style={styles[props.button + '_text']}>{props.title}</Text>
                </View>
            </View>
        </TouchableOpacity>
    }


    if (props.children) {
        if (isWeb) {
            let more = props.fill ? {height: '100%'} : {}
            return !external ? 
                <NextLink href={props.href || ''}>
                    <a href={props.href || ''} onClick={handleURL} style={{...props.style, textDecoration: 'none', ...more}}>
                        {props.children}
                    </a>
                </NextLink>
            : <a href={props.href || ''} onClick={handleURL} style={{textDecoration: 'none'}} target="_blank">
                {props.children}
            </a>
        } else {
            return !external ? 
                <TouchableOpacity onPress={handleURL}>{props.children}</TouchableOpacity>
                :
                <TouchableOpacity onPress={() => Linking.openURL(props.href)}>{props.children}</TouchableOpacity>
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
        window.location = url;
    } else {
        dispatch({type: 'setView', view: url || ''})
    }
    return
}

