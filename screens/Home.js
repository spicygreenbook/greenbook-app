import React, {useState, useEffect} from 'react';
import { useStateValue } from "../components/State";
import { StyleSheet, View, ScrollView, Text, Button, SGBButton, Image, ImageBackground, ActivityIndicator} from 'react-native';
import { Link } from "../components/Link"; 
import { ResponsiveImage } from "../components/ResponsiveImage"; 
import { getStyles, Theme, getDataAsync, GridWidth } from '../utils';

function Page(props) {

    const [{ view, isWeb, dimensions }, dispatch] = useStateValue();
    const styles = StyleSheet.create(getStyles('middle_all, text_hero, text_header, text_header2, text_header3, text_body, section', {isWeb}));

    const [ loadingPress, setLoadingPress ] = useState(true);
    const [ errorPress, setErrorPress ] = useState('');
    const [ press, setPress ] = useState([]);

    useEffect( () => {
        getDataAsync({
            type: 'press'
        }).then(press => {
            console.log('press izz', press)
            setLoadingPress(false);
            setPress(press)
        }).catch(err => {
            console.error(err);
            setLoadingPress(false);
            setErrorPress('Failed to load latest press updates.');
        })
    }, [])

    return (
        <View>
            <View style={{height: 700, backgroundColor: '#000'}}>
                <ImageBackground source={require('../public/images/home_hero.png')} style={{height: 700}}>
                    <View style={[styles.middle_all, {flex: 1, alignItems: 'stretch', padding: 20}]}>
                        <Text style={styles.text_hero}>
                            Support{"\n"}
                            Black Owned{"\n"}
                            Businesses
                        </Text>
                    </View>
                </ImageBackground>
            </View>
            <View style={{backgroundColor: Theme.green_bg, padding: 20, paddingTop: 80, paddingBottom: 80}}>
                <View style={{justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap'}}>
                    {loadingPress ? (
                        <ActivityIndicator size="large" />
                    ) : errorPress ? (
                        <Text>{errorPress}</Text>
                    ) : (
                        <React.Fragment>
                            {press.map((pressRow, p) => 
                                (<View style={{width: GridWidth({minWidth: 140})}} key={'press' + p}>
                                    <Link href={pressRow.link}>
                                        <Image source={{uri: pressRow.press_site_logo.url + '&w=300'}} style={{height: 40, resizeMode: 'contain'}} />
                                    </Link>
                                </View>)
                            )}
                        </React.Fragment>
                    )
                    }
                </View>
            </View>
            <View style={styles.section}>
                <View style={dimensions.window.width < 700 ? {} : {flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center'}}>
                    <View style={dimensions.window.width < 700 ? {paddingLeft: 40, paddingRight: 40} : {flex: 1, paddingLeft: 80, paddingRight: 80}}>
                        <ResponsiveImage
                            style={{width: 804, resizeMode: 'contain', aspectRatio: 1.37245}}
                            alt="Spicy Green Book"
                            source={isWeb ? {uri: '/images/home_green_book.png'} : require('../public/images/home_green_book.png')}
                        />
                    </View>
                    <View style={dimensions.window.width < 700 ? {paddingTop: 40} : {flex: 2, paddingLeft: 20}}>
                        <Text style={[styles.text_header, {marginBottom: 30}]}>ABOUT SGB</Text>
                        <Text style={styles.text_body}>
                            Inspired by Victor Green, Spicy Green Book is a team of volunteers committed to help complie a directory of black owned businesses.
                             
                            Our mission is to establish a space to help people who seek to create change within their communities.
                        </Text>
                    </View>
                </View>
            </View>

            <ScrollView style={{height: 700, backgroundColor: '#000', position: 'relative'}}>
                <ImageBackground source={require('../public/images/home_hero.png')} style={{height: 700}}>
                </ImageBackground>
                <View style={{
                    position: 'absolute', left: 0, top: 0, bottom: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.5)', paddingTop: 80, paddingBottom: 80, paddingLeft: 20, paddingRight: 20,
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                }}>
                    <View style={{flex: 2}}>
                        <Text style={[styles.text_header3, {color: '#fff'}]}>
                            NEW LISTING
                        </Text>
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={{color: '#fff'}}>arrow</Text>
                    </View>
                    <View style={{flex: 2}}>
                        <Text style={[styles.text_header2, {color: '#fff'}]}>
                            ALAMAR KITCHEN AND BAR
                        </Text>
                        <Link button={'button_white'} title={'Learn More'} href="/" style={{marginTop: 40}}/>
                    </View>
                </View>
            </ScrollView>

            <View>
                <Link href="/about" title="About Screen" />
            </View>

            <View style={{height: 100}}>
                <Text>hi</Text>
            </View>
        </View>
    );
}

export default Page;