import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useStateValue } from "../components/State";
import { getStyles, Theme } from '../utils';
import { Link } from "../components/Link";

export const PageTitle = ({ navigation, title, button }) => {

  const [{ isWeb }] = useStateValue();
  const styles = StyleSheet.create(getStyles('text_header2, section, content, button_white, button_white_text', { isWeb }));

  return (
    <View style={[ styles.section, { backgroundColor: Theme.green_bg, paddingTop: 180 }, !isWeb && { paddingTop: 20, paddingBottom: 20 }]}>
      <View style={[ styles.content, { flexDirection: 'column', alignItems: 'center' }]}>
          <Text accessibilityRole="header" aria-level="2" style={[ styles.text_header2, {color: '#fff'} ]}>{title}</Text>
          {!!button && <View>
                <Link href={button.href} contain onPress={() => navigation.navigate(button.nav)} >
                    <View style={[styles.button_white, { marginTop: 40 }]} >    
                        <Text style={[styles.button_white_text]}>{button.title}</Text>
                    </View>
                </Link>
            </View>}
      </View>
    </View>
  )
};