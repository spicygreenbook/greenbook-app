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
      getStyles("text_header2, text_header3, text_header4, text_link, section, content", {
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
                let parent = document.getElementById('shadowBox');
                let child = parent.parentNode;
                let formContainer = child.lastChild;
                formContainer.style.width = "fit-content"; 
                child.style.display = "flex";
                child.style.flexDirection = "row";
                child.style.flexWrap = "wrap";
                child.style.justifyContent = "center";
                let widthParent = child.parentNode;
                widthParent.style.width = "100%";
                widthParent.parentNode.style.paddingLeft = "0px";
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
                <PageTitle title={content.page_title} />
                <View style={[styles.section, {paddingBottom: isWeb ? 0 : 80}]}>
                    <View style={styles.content}>
                        <View style={styles.text_header4}>

                        <div className='shadowBox' id='shadowBox' style={{boxShadow: "0.125rem 0.125rem 0.45rem -0.1rem rgba(0,0,0,0.21)", display: "inline-table", paddingBottom: '25px', marginTop: '25px', maxWidth: '572px'}}>
                        <div className='linkContainer' style={{paddingLeft: '15px'}}>
                            <div className='emailLink' style={{paddingBottom: '2em', paddingTop: '1em'}}>
                                <h3 style={{color: '#182026', fontWeight: 'normal', margin: '0', paddingTop: '25px'}}>Questions about photography?</h3>
                                <a href="mailto:photography@spicygreenbook.com" style={{fontFamily: "ApercuMedium", color: "#006736", textTransform: "lowercase", marginBottom: "1em"}}>photography@spicygreenbook.com</a>
                            </div>

                            <div className='issuesLink' style={{paddingBottom: '2em'}}>
                                <h3 style={{color: '#182026', fontWeight: 'normal', margin: '0'}}>Find an issue with the website?</h3>
                                <p style={{textTransform: 'none', color: '#182026', margin: '0'}}>Open a new issue / bug report on our GitHub page:</p>
                                <a href="https://github.com/spicygreenbook/greenbook-app" style={{fontFamily: "ApercuMedium", color: "#006736", textTransform: "lowercase", paddingBottom: "1em"}}>https://github.com/spicygreenbook/greenbook-app</a>
                            </div>

                            <div className='slackLink'>
                                <h3 style={{color: '#182026', fontWeight: 'normal', margin: '0'}}>Our slack chat:</h3>
                                <a href="https://spicy-green-book.slack.com" style={{fontFamily: "ApercuMedium", color: "#006736", textTransform: "lowercase", paddingBottom: "1em"}}>spicy-green-book.slack.com</a>
                            </div>
                            </div>

                            <br></br>
                            <img style={{filter: 'brightness(50%)', width: '80%', height: '30%',}}src="https://images.prismic.io/spicygreenbook/0714a83c-4d8b-4e17-8f00-f4aca81667ad_Olszewski_202010155393W.jpg?auto=compress,format"></img>
                        </div>
                        
                        <View style={styles.content}>
                        <div className="hb-p-5f0282b0a1f62a61eedd0881-2" style={{display: 'inline-block', maxWidth: '100%', minWidth: 600, boxSizing: 'border-box', width: 'fit-content'}}/>
                        <img height="1" width="1" style={{display:'none'}} src="https://www.honeybook.com/p.png?pid=5f0282b0a1f62a61eedd0881" />
                        </View>

                        </View>

                        <RichText render={content._body} isWeb={isWeb} />
                        {!isWeb && <Link style={{marginTop: 40}} href={'https://spicygreenbook.org/contact'} button={'button_green'} title="Go To Contact Form" />}
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