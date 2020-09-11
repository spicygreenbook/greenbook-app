import React, {useState, useEffect} from 'react';
import { useStateValue } from "../components/State";
import { StyleSheet, View, Text, Button, Image, ImageBackground, ActivityIndicator} from 'react-native';
import { Link } from "../components/Link"; 
import { getStyles, Theme, getDataAsync, GridWidth } from '../utils';

function Page(props) {

    const [{ view, isWeb, dimensions }, dispatch] = useStateValue();
    const styles = StyleSheet.create(getStyles('middle_all, text_hero, text_header, text_body, section', {isWeb}));

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
            <View style={{backgroundColor: Theme.green_bg, flexDirection: 'row', flexWrap: 'wrap'}}>
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
            <View style={styles.section}>
                <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                    <View style={{flex: 1}}>
                        <Image
                            style={{width: '100%', resizeMode: 'contain'}}
                            alt="Spicy Green Book"
                            source={isWeb ? {uri: '/images/home_green_book.png'} : require('../public/images/home_green_book.png')}
                        />
                    </View>
                    <View style={{flex: 2}}>
                        <Text style={[styles.text_header, {marginBottom: 30}]}>ABOUT SGB</Text>
                        <Text style={styles.text_body}>
                            Inspired by Victor Green, Spicy Green Book is a team of volunteers committed to help complie a directory of black owned businesses.
                             
                            Our mission is to establish a space to help people who seek to create change within their communities.
                        </Text>
                    </View>
                </View>
            </View>
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