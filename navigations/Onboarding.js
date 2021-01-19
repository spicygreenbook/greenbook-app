import React from "react";
import { View, SafeAreaView, Text, Dimensions, ScrollView, StatusBar, StyleSheet, PixelRatio, Image } from 'react-native';

const Onboarding = () => {

    const { width, height } = Dimensions.get('window');
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
            fontSize: 25,
            fontWeight: 'bold',
            color: 'white',
            bottom: 200

        },

        paragraph_white: {
            position: 'absolute',
            fontSize: 14,
            color: 'white',
            textAlign: 'center',
            bottom: 100,
            padding: 20,
        },

        header_black: {
            position: 'absolute',
            textAlign: 'center',
            fontSize: 25,
            fontWeight: 'bold',
            color: 'black',
            top: 455


        },

        paragraph_black: {
            position: 'relative',
            textAlign: 'center',
            fontSize: 14,
            color: 'black',
            top: 470,
            padding: 20,


        },
    });


    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView
                    style={{ flex: 1 }}
                    horizontal={true}
                    scrollEventThrottle={16}
                    pagingEnabled={true}
                >
                    <View style={{ width, height }}>
                        <View style={styles.wrapper}>
                            <Image source={require('../public/images/Screen1.png')} style={styles.imageStyle1} />
                            <Image source={require('../public/images/nav_resized_2.png')} style={styles.logo} />
                            <Text style={styles.header_white}>Discover and support over 150 local Black-owned Businesses</Text>
                            <Text style={styles.paragraph_white}>Spicy Green Book is a non-profit focused on helping black owned businessses succeed through
                            a netowrk of volunteer professionals
                            </Text>
                        </View>
                    </View>
                    <View style={{ width, height }}>
                        <View style={styles.wrapper}>
                            <Image source={require('../public/images/nav_resized_3.png')} style={styles.logo2} />
                            <Image source={require('../public/images/Screen2.png')} style={styles.imageStyle2} />
                            <Text style={styles.header_black}>Search for businessses that are located near you.</Text>
                            <Text style={styles.paragraph_black}>Tap on the Browse tab to discover and search for a specific
                            businesss. We are continuously adding more businesss to SGB.
                            </Text>
                        </View>
                    </View>
                    <View style={{ width, height }}>
                        <Text>Screen 3</Text>
                    </View>
                    <View style={{ width, height }}>
                        <Text>Screen 4</Text>
                    </View>
                    <View style={{ width, height }}>
                        <Text>Screen 5</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );

};

export default Onboarding;