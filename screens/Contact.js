import React, {useState, useEffect} from 'react';
import { useStateValue } from "../components/State";
import {View, Text, StyleSheet, Button, Platform, ActivityIndicator, Image, Linking} from 'react-native';
import { Link } from "../components/Link";
import { PageTitle } from "../components/PageTitle"; 
import { RichText } from "../components/RichText"; 
import { getStyles, Theme, getContent } from '../utils';
import { ConnectContactLens } from 'aws-sdk';
import ContactImage from "./../public/images/logo_nav_light.png"

function Page(props) {

    const [{ view, isWeb, dimensions }, dispatch] = useStateValue();
    const styles = StyleSheet.create(
      getStyles("text_header2, text_header3, text_header4, section, content", {
        isWeb,
      })
    );
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
            getContent({type: 'content', uid: 'contact'}).then(_content => {
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
                <PageTitle title='Contact Us' style={{margin:'auto'}}/>
                    <View style={styling.contact_outer_container}>
                        <View style={styling.contact_container}>
                            <View style={styling.contact_inner_container}>
                                <View style={styling.contact_text_container}>
                                    <Text style={styling.contact_heading_2}>QUESTIONS ABOUT PHOTOGRAPHY?</Text>
                                    <Text onPress={() => Linking.openURL('mailto:photography@spicygreenbook.com')} style={styling.contact_links}>
                                        photography@spicygreenbook.com</Text>
                                    <Text style={styling.contact_heading_2}>FIND AN ISSUE WITH THE WEBSITE?</Text>
                                    <Text style={styling.contact_details}>Open a new issue / bug report on our github page:</Text>
                                    <Text onPress={() => Linking.openURL("https://github.com/spicygreenbook/greenbook-app")} style={[styling.contact_links, isWeb ? {cursor:'pointer'} : '']}>
                                        https://github.com/spicygreenbook-app</Text>
                                    {/* <Text style={styling.contact_heading_2}>OUR SLACK CHAT:</Text>
                                    <Text style={styling.contact_links}>spicy-green-book.slack.com</Text> */}
                                </View>
                            </View>
                            <Image alt="strawberry waffles" source={require('../public/images/contact_image.png')} style={[styling.contact_image, !isWeb ? {right:20}:'']}/>
                        </View>

                        <View style={styling.contact_form_container}>
                            {isWeb && <View style={[styles.section]}>
                               <View style={[styles.content]}>
                                   <div className="hb-p-5f0282b0a1f62a61eedd0881-2" style={{display: 'inline-block', width: '100%'}}/>
                                </View>
                            </View>}
                            {!isWeb && <View style={[styles.section]}>
                               <Button color="rgb(0, 98, 51)" title="Go To Contact Form" onPress={() => Linking.openURL("https://spicygreenbook.org/contact")}/>
                            </View>}  
                        </View>
                            
                    </View>
                             
            </React.Fragment>
        )}
        </React.Fragment>
    )
}

const styling = StyleSheet.create({
    contact_heading_2: {
        fontWeight:'bold', 
        marginBottom:0,
        marginTop:45,
        fontFamily: 'KnockoutFeatherWeight',
        fontSize: 22,
    },
    contact_details: {
        marginTop:2,
        marginBottom: 2,
        marginLeft: 0,
        marginRight: 0, 
        fontSize:22,
        fontFamily: 'KnockoutFeatherWeight'
    },
    contact_outer_container: {
        display:'flex',
        flexDirection: 'row',
        flexWrap: 'wrap', 
        justifyContent:'center'
    },
    contact_container: {
        width:'48%', 
        minWidth:300, 
        maxHeight:600, 
        display:'flex', 
        flexDirection:'column', 
        alignItems:'flex-end'
    },
    contact_inner_container: {
        height:300, 
        shadowColor: '#000',
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 1,
        paddingRight:20, 
        marginTop:20, 
        fontFamily: 'KnockoutFeatherWeight'
    },
    contact_text_container: {
        display:'flex', 
        flexDirection:'column', 
        alignItems:'flex-end'
    },
    contact_form_container: {
        minWidth:'50%', 
        maxWidth:300, 
        marginTop:-60
    },
    contact_links: {
        color:'rgb(0, 98, 51)', 
        marginTop:2,
        marginBottom: 2,
        marginLeft: 0,
        marginRight: 0, 
        fontSize:22, 
        fontFamily: 'KnockoutFeatherWeight', 
        textDecorationLine:'underline', 
    },
    contact_image: {
        width:'70%', 
        height:'42%', 
        minHeight:166.67, 
        minWidth:250, 
        position:'relative', 
        bottom:40, 
        right:40,
        marginBottom: 40,
    },
    contact_button: {
        marginTop: 40,
        backgroundColor: 'rgb(0, 98, 51)',
        borderRadius: 8,
        fontFamily: 'KnockoutFeatherWeight'
    }
});

export default Page;