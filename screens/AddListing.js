import React, {useState, useEffect} from 'react';
import { useStateValue } from "../components/State";
import {View, Text, StyleSheet, Button, Platform, ActivityIndicator} from 'react-native';
import { Link } from "../components/Link"; 
import { PageTitle } from "../components/PageTitle"; 
import { RichText } from "../components/RichText"; 
import { getStyles, Theme, getContent } from '../utils';
import { WebView } from 'react-native-webview';

function Page(props) {

    const [{ view, isWeb, dimensions }, dispatch] = useStateValue();
    const styles = StyleSheet.create(getStyles('text_header2, button_green, button_green_text, section, content', {isWeb}));
    //console.log('page props', props)

    const [ pageLoading, setPageLoading ] = useState(props.content ? false: true);
    const [ content, setContent ] = useState(props.content || {});


    if (isWeb) {
        useEffect(() => {
            (function(h,b,s,n,i,p,e,t) {
                let check = document.getElementById('honeybook-form');
                if (check){ check.parentNode.removeChild(check); }
                h._HB_ = {};h._HB_.pid = i;;;; // dan modified this line to make the forms actually load
                t=b.createElement(s);t.type="text/javascript";t.async=!0;t.src=n;
                t.id = 'honeybook-form';
                e=b.getElementsByTagName(s)[0];e.parentNode.insertBefore(t,e);
                console.log("EXECUTED HONEYBOOK CODE")
            })(window,document,"script","https://widget.honeybook.com/assets_users_production/websiteplacements/placement-controller.min.js","5f0282b0a1f62a61eedd0881");
        }, [pageLoading])
    }


    if (!props.content) {
        useEffect(() => {
            getContent({type: 'content', uid: 'add'}).then(_content => {
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
                <View style={[styles.section, {paddingBottom: isWeb ? 0 : 80}]}>
                    <View style={styles.content}>
                        <RichText render={content._body} isWeb={isWeb} />
                        {!isWeb && <Link contain href={'https://spicygreenbook.org/add'}> 
                            <View style={[styles.button_green, { marginTop: 40 }]} >    
                                <Text style={[styles.button_green_text]}>Go To Add Listing Form</Text>
                            </View>
                        </Link>}
                    </View>
                </View>
                {isWeb && (<View style={[styles.section]}>
                    <View style={styles.content}>
                        <div className="hb-p-5f0282b0a1f62a61eedd0881-4"></div>
                        <img height="1" width="1" style={{display:'none'}} src="https://www.honeybook.com/p.png?pid=5f0282b0a1f62a61eedd0881" />
                    </View>
                </View>)}
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