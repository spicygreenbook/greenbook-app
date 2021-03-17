import React, {useState, useEffect} from 'react';
import { useStateValue } from "../components/State";
import {View, Text, StyleSheet, Button, Platform, ActivityIndicator} from 'react-native';
import { Link } from "../components/Link";
import { PageTitle } from "../components/PageTitle"; 
import { RichText } from "../components/RichText"; 
import { getStyles, Theme, getContent } from '../utils';


function Page(props) {

    const [{ view, isWeb, dimensions }, dispatch] = useStateValue();
    const styles = StyleSheet.create(
      getStyles("text_header2, text_header3, section, content", {
        isWeb,
      })
    );
    //console.log('page props', props)

    const [ pageLoading, setPageLoading ] = useState(false);
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

    return (
        <React.Fragment>
        { pageLoading ?
            <View style={{marginTop: 200, marginBottom: 200}}>
                <ActivityIndicator color={Theme.green} size="large" />
            </View>
        : (
            <React.Fragment>
                <View style={[styles.section, {marginTop: 40, paddingBottom: isWeb ? 0 : 80}]}>
                    <View style={styles.content}>
                        {!isWeb && <Link style={{marginTop: 40}} href={'https://spicygreenbook.org/addrequest'} button={'button_green'} title="Go To Add Request Form" />}
                    </View>
                </View>

                {isWeb && <View style={[styles.section]}>
                    <View style={styles.content}>
                        <div className="hb-p-5f0282b0a1f62a61eedd0881-4" style={{display: 'inline-block', maxWidth: '100%', minWidth: 600, boxSizing: 'border-box'}}/>
                        <img height="1" width="1" style={{display:'none'}} src="https://www.honeybook.com/p.png?pid=5f0282b0a1f62a61eedd0881" />
                    </View>
                </View>}
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