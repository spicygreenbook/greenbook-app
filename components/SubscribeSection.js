import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { getStyles } from '../utils';
import SubscribeForm from './SubscribeForm';

export default () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../public/images/SigningUp.png')} style={styles.image} imageStyle={{ opacity: .45 }}>
        <View style={styles.section}>
          <View style={[styles.content, { flex: 1, paddingTop: 80 }]}>
            <View style={{ alignItems: 'center' }}>
              <Text style={[styles.text_header2, { color: 'white', textAlign: 'center' }]}>Subscribe To Get Our Newsletter</Text>
              <Text style={[styles.text_body, { color: 'white', maxWidth: 650, lineHeight: 40, textAlign: 'center' }]}>Want to keep up with the latest SGB news and information? Join the club and don’t miss out on any news</Text>
            </View>
            <SubscribeForm showTitle={false} />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  ...getStyles('text_header2, text_body, section, content'),
  container: {
    flex: 1,
    backgroundColor: '#000',
    flexDirection: 'column',
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
})