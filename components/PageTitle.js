import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useStateValue } from "../components/State";
import { getStyles, Theme } from '../utils';

export const PageTitle = ({ title }) => {

  const [{ isWeb }] = useStateValue();
  const styles = StyleSheet.create(getStyles('text_header2, section, content', { isWeb }));

  return (
    <View style={[ styles.section, { backgroundColor: Theme.green_bg, paddingTop: 180 }, !isWeb && { paddingTop: 20, paddingBottom: 20 }]}>
      <View style={[ styles.content, { flexDirection: 'column', alignItems: 'center' }]}>
          <Text accessibilityRole="header" aria-level="2" style={[ styles.text_header2, {color: '#fff'} ]}>{title}</Text>
      </View>
    </View>
  )
};