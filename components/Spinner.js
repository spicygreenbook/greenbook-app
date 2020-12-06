import React from 'react'
import { View, ActivityIndicator } from 'react-native';
import { Theme } from '../utils';

const Spinner = () => {
  return (
    <View style={{marginTop: 200, marginBottom: 200}}>
      <ActivityIndicator color={Theme.green} size="large" />
    </View>
  );
};

export default Spinner;