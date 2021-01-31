import React, { useState } from "react";
import { View, SafeAreaView, Text, Dimensions, ScrollView, StatusBar, StyleSheet, Image, Button } from 'react-native';

const Onboarding = (props) => {

    const [slider, setslider] = useState({ currentPage: 0 });
    const { width, height } = Dimensions.get('window');

    const setSliderPage = (event) => {
        const { currentPage } = slider;
        const { x } = event.nativeEvent.contentOffset;
        const indexOfNextScreen = Math.floor(x / width);
        if (indexOfNextScreen !== currentPage) {
            setslider({
                ...slider,
                currentPage: indexOfNextScreen,
            });
        }
    };


    const styles = StyleSheet.create({
        imageStyle1: {
            height: height,
            width: width,
            position: 'relative',
        },

        imageStyle2: {
            height: 400,
            width: width,
            position: 'absolute',
            top: 50
        },


        logo: {
            position: 'absolute',
            width: 100,
            height: 30,
            top: 30

        },

        logo2: {
            position: 'relative',
            width: 100,
            height: 30,
            top: 10

        },

        wrapper: {
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 30,
        },

        header_white: {
            position: 'absolute',
            textAlign: 'center',
            fontSize: 30,
            fontWeight: 'bold',
            fontFamily: 'KnockoutWelterWeight',
            color: 'white',
            bottom: 200,

        },

        paragraph_white: {
            position: 'absolute',
            fontSize: 14,
            fontFamily: 'ApercuMedium',
            color: 'white',
            textAlign: 'center',
            bottom: 100,
            padding: 20,
        },

        header_black: {
            position: 'absolute',
            fontFamily: 'KnockoutWelterWeight',
            textAlign: 'center',
            fontSize: 30,
            fontWeight: 'bold',
            color: 'black',
            top: 455


        },

        paragraph_black: {
            position: 'relative',
            textAlign: 'center',
            fontSize: 14,
            fontFamily: 'ApercuMedium',
            color: 'black',
            top: 480,
            padding: 20,


        },

        paginationWrapper: {
            position: 'absolute',
            bottom: 80,
            left: 0,
            right: 0,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
        },

        paginationDots: {
            height: 10,
            width: 10,
            borderRadius: 10 / 2,
            backgroundColor: '#006233',
            marginLeft: 10,
        },

        button: {
            position: 'absolute',
            bottom: 20,
            left: 50,
            height: 50,
            width: 325,
            backgroundColor: "#006233",
            justifyContent: 'center',
            textAlign: 'center'
        },

        button_white: {
            fontSize: 20,
            fontFamily: 'ApercuMedium',
            fontWeight: 'bold',
            color: 'white',
        },
    });

    const { currentPage: pageIndex } = slider;

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView
                    style={{ flex: 1 }}
                    horizontal={true}
                    scrollEventThrottle={16}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    onScroll={(event) => {
                        setSliderPage(event)
                    }}
                >
                    <View style={{ width, height }}>
                        <View style={styles.wrapper}>
                            <Image source={require('../public/images/Screen1.png')} style={styles.imageStyle1} />
                            <Image source={require('../public/images/nav_resized_2.png')} style={styles.logo} />
                            <Text style={styles.header_white}>Discover and support over 150 local {"\n"} Black-owned Businesses</Text>
                            <Text style={styles.paragraph_white}>Spicy Green Book is a non-profit focused on helping black owned businessses succeed through
                            a netowrk of volunteer professionals
                            </Text>
                        </View>
                    </View>
                    <View style={{ width, height }}>
                        <View style={styles.wrapper}>
                            <Image source={require('../public/images/nav_resized_3.png')} style={styles.logo2} />
                            <Image source={require('../public/images/Screen2.png')} style={styles.imageStyle2} />
                            <Text style={styles.header_black}>Search for businessses that are {"\n"} located near you.</Text>
                            <Text style={styles.paragraph_black}>Tap on the Browse tab to discover and search for a specific
                            businesss. We are continuously adding more businesss to SGB.
                            </Text>
                        </View>
                    </View>
                    <View style={{ width, height }}>
                        <View style={styles.wrapper}>
                            <Image source={require('../public/images/nav_resized_3.png')} style={styles.logo2} />
                            <Image source={require('../public/images/Screen3.png')} style={styles.imageStyle2} />
                            <Text style={styles.header_black}>Learn about each businesss and {"\n"} their story</Text>
                            <Text style={styles.paragraph_black}>Choose a business to learn about what they do, how to get in contact,
                            and how to support them.
                            </Text>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.paginationWrapper}>
                    {Array.from(Array(3).keys()).map((key, index) => (
                        <View style={[styles.paginationDots, { backgroundColor: pageIndex === index ? '#006233' : 'grey' }]} key={index} />
                    ))}
                </View>
                <View style={styles.button}>
                    <Button color="white" title="Get Started" onPress={(event) => props.onChange(event.target)} />
                </View>


            </SafeAreaView>
        </>
    );

};

export default Onboarding;