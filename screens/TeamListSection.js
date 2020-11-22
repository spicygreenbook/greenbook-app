import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native';
import { RichText } from '../components/RichText'
import { useStateValue } from "../components/State";
import { getStyles, Theme } from '../utils';

const TeamListSection = ({ item, reverse }) => {
  const [{ isWeb, dimensions }] = useStateValue();
  console.log(dimensions)
  const styles = StyleSheet.create(getStyles('text_header3, text_header4', { isWeb }));

  return (
    <View style={[ isWeb && dimensions.width > 752 && { flexDirection: reverse ? 'row-reverse' : 'row' }, { marginBottom: 72 }]} >
      <View style={[ isWeb ? { ...defaultStyles.imageContainerWeb, flexDirection: reverse ? 'row' : 'row-reverse', flex: 1, marginBottom: dimensions.width < 752 ? 24 : 0} : defaultStyles.imageContainerMobile ]}>
        { isWeb && <View style={{ width: 8, backgroundColor: Theme.green, height: 150, alignSelf: 'flex-start', position: 'relative', top: 110 }}/> }
        <Image style={{width: isWeb ? '100%' : 200, height: isWeb ? 500 : 200, aspectRatio: 1}} source={{ uri: item.image.url + '&w=800' }} />
      </View>

      <View style={[ defaultStyles.infoContainer, isWeb && { paddingLeft: reverse ? 0 : 20, paddingRight: reverse ? 20 : 0 } ]}>
        <Text style={[ styles.text_header3, { textAlign: 'center', marginTop: 24, fontSize: 38 }, isWeb && { marginTop: 0 } ]}>{ item.title }</Text>
        <Text style={[ styles.text_header4, { textAlign: 'center' } ]}>{item.name}</Text>
        <RichText render={item._description} isWeb={isWeb} />
      </View>
    </View>
  )
};  

const defaultStyles = StyleSheet.create({
  imageContainerMobile: {
    alignSelf: "center",
    marginBottom: 24,
  },

  imageContainerWeb: {
    display: 'flex',
  },

  infoContainer: {
    flex: 1
  },
});

export default TeamListSection;