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
            width: 400,
            position: 'relative',
            top: 80
        },


        logo: {
            position: 'absolute',
            width: 100,
            height: 30,
            top: 50

        },

        logo2: {
            position: 'absolute',
            width: 200,
            height: 40,
            top: 50

        },
        wrapper: {
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 30,
        },
        header: {
            position: 'absolute',
            textAlign: 'center',
            fontSize: 30,
            fontWeight: 'bold',
            color: 'white',
            bottom: 200

        },

        paragraph: {
            position: 'absolute',
            fontSize: 14,
            color: 'white',
            textAlign: 'center',
            bottom: 120
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
                            <Text style={styles.header}>Discover and support over 150 local Black-owned Businesses</Text>
                            <Text style={styles.paragraph}>Spicy Green Book is a non-profit focused on helping black owned businessses succeed through
                            a netowrk of volunteer professionals
                            </Text>
                        </View>
                    </View>
                    <View style={{ width, height }}>
                        <View style={styles.wrapper}>
                            <Text>Screen 2</Text>
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