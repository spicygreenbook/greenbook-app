// @generated: @expo/next-adapter@2.1.0
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
//import { setGlobals } from '../utils';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';


export default function App() {

  //setGlobals();

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Text style={styles.text}>Welcome to Expo + Next.js 👋</Text>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
  },
});
