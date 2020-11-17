import React, {useState, useEffect} from 'react';
import { useStateValue } from "../components/State";
import {View, Text, StyleSheet, Button, Platform, ActivityIndicator} from 'react-native';
import { Link } from "../components/Link"; 
import { RichText } from "../components/RichText"; 
import { getStyles, Theme, getContent } from '../utils';


function Page(props) {

    const [{ view, isWeb, dimensions }, dispatch] = useStateValue();
    const styles = StyleSheet.create(getStyles('text_header2, section, content', {isWeb}));
    //console.log('page props', props)

    const [ pageLoading, setPageLoading ] = useState(props.content ? false: true);
    const [ content, setContent ] = useState(props.content || {});

    if (!props.content) {
        useEffect(() => {
            getContent({type: 'content', uid: 'privacy'}).then(_content => {
                console.log('_content', _content)
                setContent(_content.content)
                setPageLoading(false);
            }).catch(err => {
                console.error(err);
            });
        }, [])
    }

    return (
        <React.Fragment>
        { pageLoading ?
            <View style={{marginTop: 200, marginBottom: 200}}>
                <ActivityIndicator color={Theme.green} size="large" />
            </View>
        : (
            <React.Fragment>
                <View style={[styles.section, {backgroundColor: Theme.green_bg, paddingTop: 180}]}>
                    <View style={[styles.content, {flexDirection: 'column', alignItems: 'center'}]}>
                        <Text accessibilityRole="header" aria-level="2" style={[styles.text_header2, {color: '#fff'}]}>{content.page_title}</Text>
                    </View>
                </View>
                <View style={[styles.section]}>
                    <View style={styles.content}>
                        <RichText render={content._body} isWeb={isWeb} />
                    </View>
                </View>
            </React.Fragment>
        )}
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default Page;