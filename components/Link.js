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
        }
    }
    const handleURLFully = (e) => {
        if (!external) {
            dispatch({type: 'setView', view: props.href || ''})
        } else {
            Linking.openURL(props.href || '')
        }
    }

    if (props.button) {
        const styles = StyleSheet.create(getStyles(props.button + ', ' + props.button + '_text', {isWeb}));
        return isWeb && !external ? <NextLink href={props.href || ''}>
            <a href={props.href} style={{textDecoration: 'none'}}>
                <View style={[{flexDirection: 'row', cursor: 'pointer'}, props.style ? props.style : {}]}>
                    <View style={styles[props.button]}>
                        <Text style={styles[props.button + '_text']}>{props.title}</Text>
                    </View>
                </View>
            </a>
        </NextLink>
        : isWeb && external ? <a href={props.href || ''} target="_blank" style={{textDecoration: 'none'}}>
            <View style={[{flexDirection: 'row', cursor: 'pointer'}, props.style ? props.style : {}]}>
                <View style={styles[props.button]}>
                    <Text style={styles[props.button + '_text']}>{props.title}</Text>
                </View>
            </View>
        </a>
        : 
        <TouchableOpacity onPress={handleURLFully}>
            <View style={[{flexDirection: 'row'}, props.style ? props.style : {}]}>
                <View style={styles[props.button]}>
                    <Text style={styles[props.button + '_text']}>{props.title}</Text>
                </View>
            </View>
        </TouchableOpacity>
    } else if (props.children) {
        if (isWeb) {
            let more = props.fill ? {height: '100%'} : {}
            return !external ? 
                <NextLink href={props.href || ''}>
                    <a href={props.href || ''} onClick={handleURLFully} style={{...props.style, textDecoration: 'none', ...more}}>
                        {props.children}
                    </a>
                </NextLink>
            : <a href={props.href || ''} style={{textDecoration: 'none'}} target="_blank">
                {props.children}
            </a>
        } else {
            return <TouchableOpacity onPress={handleURLFully}><View>{props.children}</View></TouchableOpacity>
        }
    }

    return (
        isWeb ? <NextLink href={props.href || ''}>
            <a href={props.href || ''} onClick={handleURLFully}>
                {props.title}
            </a>
        </NextLink>
        : 
        <Button title={props.title || ''} color={Theme.green} onPress={handleURLFully} {...props} />
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

