import React, {useState, useEffect} from 'react';
import { useStateValue } from "../components/State";
import {View, Text, StyleSheet, ActivityIndicator, Linking, Image} from 'react-native';
import { Link } from "../components/Link"; 
import { PageTitle } from "../components/PageTitle"; 
// import { RichText } from "../components/RichText"; 
import { getStyles, Theme, getContent } from '../utils';
import Stripe from "../components/Stripe";
import { PayPalButton, DonateButtons } from "../components/DonateButtons";


function Page(props) {

    const [{ view, isWeb, dimensions }, dispatch] = useStateValue();
    const styles = StyleSheet.create(getStyles('text_header2, text_header3, section, content, button_green, button_green_text, text_body', {isWeb}));
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
                        <View style={dimensions.width < 900 ? {paddingTop: 40} : {paddingTop: 0}}>
                            <Text style={styles.text_body}>
                                As a donor and active volunteer, your role cannot be overstated. Spicy Green Book is a nonprofit organization that relies on volunteers and donations to continuously spark change in Black communities. More than just a donation, we welcome you to make an <Text style={{fontWeight: 'bold'}}>investment</Text>. An investment that will work to help a marginalized people. All contributions are put directly towards the upkeep and expansion of Spicy Green Book. Your contribution is will be used to directly aid our mission in abolishing social injustice, by providing promotional services to small businesses, or by aiding expansion into Black communities around the nation.  Encourage your networks to also support the mission of Spicy Green Book.
                            </Text>
                        </View>

                        <View style={{paddingTop: 40}}>
                            <View style={ isWeb ?  dimensions.width < 900 ? { flexDirection: 'column-reverse', flexGrow: 1 } : { flexDirection: 'row' } : { flexDirection: 'column-reverse' } }>
                                <View style={ isWeb ? dimensions.width < 900 ? { width: '99%', paddingTop: 60 } : { width: '70%', paddingRight: 20 } : { paddingTop: 60 } }>
                                    <Text style={styles.text_header3}>
                                        Transparency
                                    </Text>
                                    <Text style={styles.text_body}>
                                        Transparency is fundamental to our organization's purpose and success. It is important to us that our donors know exactly how we work to create change within their communities. We do not charge the businesses to be listed on Spicy Green Book. We are grateful for the support of our dedicated donors. Our work would not be possible without you. Your contributions will go to the upkeep of the site, and addition of new resources and events. 
                                        Spicy Green Book is a legally incorporated nonprofit organization pending our 501(c)(3) status.
                                    </Text>
                                </View>
                                <Image
                                    style={{ width: dimensions.width < 900 ? '100%' : 300, resizeMode: 'contain' }}
                                    alt="Spicy Green Book"
                                    source={isWeb ? { uri: '/images/search.png' } : require('../public/images/search.png')}
                                />
                            </View>
                        </View>

                        <View style={{paddingTop: 40}}>
                            <View style={ isWeb ?  dimensions.width < 900 ? { flexDirection: 'column' } : { flexDirection: 'row' } : { flexDirection: 'column' } }>
                                <Image
                                    style={{ width: dimensions.width < 900 ? '100%' : 300, resizeMode: 'contain' }}
                                    alt="Spicy Green Book"
                                    source={isWeb ? { uri: '/images/donate.png' } : require('../public/images/donate.png')}
                                />
                                <View style={ isWeb ? dimensions.width < 900 ? { width: '99%', paddingTop: 60 } : { width: '70%', paddingLeft: 20 } : { paddingTop: 60 } }>
                                    <Text style={styles.text_header3}>
                                        How Do I Donate?
                                    </Text>
                                    <Text style={styles.text_body}>
                                        Thank you for wanting to help support the growth of Spicy Green Book in helping our community. We are currently accepting donations and there are a few ways you can do that. To donate to our mission you may:
                                        {isWeb &&
                                            <Text>
                                                {"\n"}
                                                {"\n"}1.  Fill out the form at the bottom of the page
                                                {"\n"}2. Donate via PayPal with the donate button below
                                                {"\n"}3. Donate via Cash App with the button below
                                            </Text>
                                        }
                                    </Text>
                                </View>
                            </View>
                        </View>

                        {isWeb ? (
                            <View style={styles.content}>
                                <DonateButtons />
                            </View>
                            ) : (       
                            <View style={[styles.section]}>
                                <Link href="https://spicygreenbook.org/donate" contain onPress={() => Linking.openURL('https://spicygreenbook.org/donate')} >
                                    <View style={[styles.button_green, { marginTop: 65 }]} >    
                                    <Text style={[styles.button_green_text]}>Go To Online Donation Form</Text>
                                </View>
                                </Link>
                            </View>
                        )}

                         <View>
                            <Text style={styles.text_header3}>
                                I Want to Continue to Support the Growth of Spicy Green Book
                            </Text>
                        </View>

                        <View style={{paddingBottom: 40}}>
                            <Text style={styles.text_body}>
                                That is great news! For just as little as $5.00/month you can help sponsor the growth of Spicy Green Book. Spicy Green Book combines your monthly support with the support of other sponsors — creating a "ripple effect" of positive change and funding long term community development. Hit the donate button below where you can pick the recurring donation of your choice. 
                            </Text>
                        </View>


                        {/* <RichText render={content._body} isWeb={isWeb} /> */}
                        {!isWeb && <Link style={{marginTop: 40}} href={'https://spicygreenbook.org/donate'} button={'button_green'} title="Go To Donation Form" />}
                    </View>
                    {isWeb && <View style={styles.content}>
                        <PayPalButton />
                        <Stripe form="donate" />
                    </View>}
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