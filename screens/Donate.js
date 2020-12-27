import React, {useState, useEffect} from 'react';
import { useStateValue } from "../components/State";
import {View, Text, StyleSheet, Button, Platform, ActivityIndicator, Linking} from 'react-native';
import { Link } from "../components/Link"; 
import { PageTitle } from "../components/PageTitle"; 
import { RichText } from "../components/RichText"; 
import { getStyles, Theme, getContent } from '../utils';
import Stripe from "../components/Stripe";


function Page(props) {

    const [{ view, isWeb, dimensions }, dispatch] = useStateValue();
    const styles = StyleSheet.create(getStyles('text_header2, section, content, button_green, button_green_text', {isWeb}));
    //console.log('page props', props)

    const [ pageLoading, setPageLoading ] = useState(props.content ? false: true);
    const [ content, setContent ] = useState(props.content || {});

    if (!props.content) {
        useEffect(() => {
            getContent({type: 'content', uid: 'donate'}).then(_content => {
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
                <PageTitle title={content.page_title} />
                <View style={[styles.section]}>
                    <View style={styles.content}>
                        <RichText render={content._body} isWeb={isWeb} />
                        {!isWeb && <Link style={{marginTop: 40}} href={'https://spicygreenbook.org/donate'} button={'button_green'} title="Go To Donation Form" />}
                    </View>
                    {!isWeb && 
                        <View style={[styles.section]}>
                            <Link href="https://spicygreenbook.org/donate" contain onPress={() => Linking.openURL('https://spicygreenbook.org/donate')} >
                                <View style={[styles.button_green, { marginTop: 40 }]} >    
                                    <Text style={[styles.button_green_text]}>Go To Online Donation Form</Text>
                                </View>
                            </Link>
                        </View>
                    }
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