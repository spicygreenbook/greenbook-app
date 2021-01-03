import React, {useState, useEffect} from 'react';
import { useStateValue } from "../components/State";
import {View, Text, StyleSheet, Button, Platform, ActivityIndicator, Linking} from 'react-native';
import { Link } from "../components/Link";
import { PageTitle } from "../components/PageTitle"; 
import { RichText } from "../components/RichText"; 
import { getStyles, Theme, getContent } from '../utils';


function Page(props) {

    const [{ view, isWeb, dimensions }, dispatch] = useStateValue();
    const styles = StyleSheet.create(
      getStyles("text_header2, text_header3, section, content, button_green, button_green_text", {
        isWeb,
      })
    );
    //console.log('page props', props)

    const [ pageLoading, setPageLoading ] = useState(false);
    const [ content, setContent ] = useState(props.content || {});

    return (
        <React.Fragment>
        { pageLoading ?
            <View style={{marginTop: 200, marginBottom: 200}}>
                <ActivityIndicator color={Theme.green} size="large" />
            </View>
        : (
            <View>
                <PageTitle title={"Shop Our Merch"} />
                <View style={[styles.section]}>
                    <Link href="https://shop.spicygreenbook.org" contain onPress={() => Linking.openURL('https://shop.spicygreenbook.org')} >
                        <View style={[styles.button_green, { marginTop: 40 }]} >    
                            <Text style={[styles.button_green_text]}>Go To Online Store</Text>
                        </View>
                    </Link>
                </View>
            </View>
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