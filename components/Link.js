import React from 'react';
import Link from "next/link";
import { useStateValue } from "../components/State";
import {Text, StyleSheet, Button} from 'react-native';

function SwitchLink(props) {

    const [{ view, isWeb }, dispatch] = useStateValue();
    console.log('link view', view, 'isweb', isWeb, 'props', props)
    return (
        isWeb ? <Link href={props.href || ''}><a href={props.href || ''} onClick={() => dispatch({type: 'setView', view: props.href})}>{props.title}</a></Link>
        : 
        <Button title={props.title || 'asdf'} onPress={() => dispatch({type: 'setView', view: props.href})} />
    )

}

export default SwitchLink;
