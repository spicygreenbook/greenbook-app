import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import List from '../screens/List';
import CustomHeader from './CustomHeader';
import Listing from '../screens/Listing';
import NativeCarousel from './NativeCarousel';
import { Platform, Text, StyleSheet } from 'react-native';
import { getStyles, Theme } from '../utils';
import { Icon } from 'native-base';

const Stack = createStackNavigator();

const BrowseStackNavigator = (props) => {
const styles = StyleSheet.create(getStyles('text_header3'));

return (
    <Stack.Navigator initialRouteName="Home" headerMode="screen">
      <Stack.Screen name="Home" component={List} options={{ header: () => <CustomHeader dark {...props} /> }} />
      <Stack.Screen name="Listing" component={Listing} options={{headerShown: false}} />
      <Stack.Screen name="ModalImages" component={NativeCarousel} 
        options={({ navigation, route }) => ({
          headerBackTitleVisible: false,
          headerTitle: <Text style={[styles.text_header3, {color: '#fff'}]}>{route.params.name}</Text>,
          headerTitleStyle: Platform.select({ android: { alignSelf: 'center', left: -20 } }),
          headerStyle: {backgroundColor: Theme.green, height: 110},
          headerLeft: () => <Icon type="FontAwesome5" name="arrow-left" style={{ fontSize: 24, marginLeft: 20, color: '#fff' }} onPress={() => navigation.goBack()} />
        })}
      />
    </Stack.Navigator>
  )
};

export default BrowseStackNavigator;