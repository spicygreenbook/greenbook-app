import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useStateValue } from "../../components/State";
import { getStyles, Theme } from '../../utils';
import { Link } from '../../components/Link';
import { Fontisto } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

let currentIndexListing = 0;
const viewableItemsChangedListing = ({ viewableItems }) => {
  currentIndexListing = viewableItems && viewableItems[0] && viewableItems[0].index;
}

const Testimonial = ({ testimonials }) => {
  let testimonialListRef = useRef(null);
  const [{ isWeb, dimensions }, dispatch] = useStateValue();
  const navigation = !isWeb ? useNavigation() : null;
  const data = testimonials.filter(data => data?.image && data); // render testimonial that has image only, for now

  const deviceWidth = isWeb ? dimensions.width > 1083 ? 1024 : dimensions.width - 60 : dimensions.width - 40;
  const getItemLayout = (data, index) => ({ length: deviceWidth, offset: deviceWidth * index, index })

  const scrollToIndexListing = (obj, len) => {
    if (obj.index < 0) { obj.index = 0; }
    if (obj.index > len - 1) { obj.index = len - 1; }
    if (testimonialListRef.current) {
      testimonialListRef.current.scrollToIndex(obj)
    } else {
      console.log('no listing ref')
    }
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      let i;

      if (currentIndexListing < data.length - 1) {
        i = currentIndexListing + 1;
      } else {
        i = 0;
      }

      currentIndexListing = i;
      testimonialListRef.current.scrollToIndex({ animated: true, index: i });
    }, 5000);

    return () => clearInterval(intervalId)
  }, [data])


  return (
    <View style={[styles.section, { backgroundColor: Theme.green_bg, paddingBottom: 40, marginBottom: 40 }]}>
      <View style={styles.content}>
        <View style={[{ position: 'absolute', zIndex: 99, paddingTop: isWeb ? 20 : 40, paddingLeft: 0 }]}>
          <Text style={[styles.text_header5, { color: '#000', fontSize: isWeb ? 28 : 22 }]}>TESTIMONIALS</Text>
        </View>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data}
          ref={testimonialListRef}
          onViewableItemsChanged={viewableItemsChangedListing}
          getItemLayout={getItemLayout}
          renderItem={({ item }) => {
            const url = item.link !== undefined ? `/biz/${item.link.match(/[^/]*$/)}` : `/biz/undefined`

            return (
              <View style={[{
                width: dimensions.width - (isWeb ? 60 : 40),
                maxWidth: 1024,
                marginTop: isWeb ? 40 : 100,
                padding: isWeb ? dimensions.width < 900 ? 20 : 40 : 0,
                flexDirection: isWeb ? dimensions.width < 900 ? 'column' : 'row' : 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }]}>

                <ImageBackground style={isWeb ? { width: dimensions.width < 900 ? 280 : 380, height: dimensions.width < 900 ? 257 : 347, marginLeft: 40 } : { width: 250, height: 227 }} resizeMode='cover' alt={item.name} source={{ uri: item.image.url + '&w=600' }}>
                  <Image style={isWeb ? { flex: 1, width: dimensions.width < 900 ? 280 : 380, height: dimensions.width < 900 ? 257 : 347 } : { width: 250, height: 227 }} alt='Testimonial cover' source={isWeb ? '/images/testimonial.png' : require('../../public/images/testimonial.png')} />
                </ImageBackground>

                <View style={{ flex: 1, flexDirection: isWeb ? dimensions.width < 900 ? 'column' : 'row' : 'column', paddingHorizontal: isWeb ? dimensions.width < 900 ? 0 : 28 : 0, alignSelf: 'stretch' }}>
                  <Fontisto name="quote-left" size={isWeb ? dimensions.width < 900 ? 24 : 32 : 18} style={{ marginBottom: isWeb ? dimensions.width < 900 ? 10 : 0 : 10 }} />

                  <View style={{ flex: 1, justifyContent: isWeb ? 'space-between' : 'space-around' }}>
                    <Text style={[styles.text_quote, { paddingLeft: isWeb ? dimensions.width < 900 ? 0 : 20 : 0, color: '#fff', fontFamily: 'ApercuMedium', fontSize: isWeb ? 18 : 16, lineHeight: isWeb ? 26 : 22 }]}>{item.asdf[0]}</Text>

                    <View style={{ flex: 1, paddingLeft: isWeb ? dimensions.width < 900 ? 0 : 20 : 0, justifyContent: 'center', marginTop: dimensions.width < 900 ? 5 : 0 }}>
                      <Text style={{ color: '#fff', fontFamily: 'ApercuMedium', fontSize: 18 }}>{item.quote_credit}</Text>
                      <Text style={{ color: '#000', fontFamily: 'ApercuMedium', fontSize: 14, fontWeight: 'bold', marginBottom: 20 }}>{item.sub_title}</Text>

                      <Link href={url} contain
                        onPress={() => {
                          dispatch({ type: 'setView', view: url });
                          navigation.navigate('Browse', { screen: 'Listing' });
                        }} >
                        <View style={[styles.button_green, { borderColor: '#fff', height: 40 }]} >
                          <Text style={[styles.button_green_text, { fontSize: isWeb ? 16 : 12 }]}>SEE LISTING</Text>
                        </View>
                      </Link>
                    </View>
                  </View>
                </View>
              </View>
            );
          }}
          keyExtractor={(item, index) => 'tistimonial' + index}
        />

        <View style={{ position: 'absolute', top: isWeb ? dimensions.width < 900 ? '35%' : '50%' : '45%', width: '100%' }}>
          <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <View style={{ flex: 1, alignItems: 'flex-start' }}>
              <TouchableOpacity onPress={(e) => {

                scrollToIndexListing({ animated: true, index: currentIndexListing - 1 }, data.length)

              }}>
                <Entypo name="chevron-thin-left" size={isWeb ? 28 : 24} color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <TouchableOpacity onPress={(e) => scrollToIndexListing({ animated: true, index: currentIndexListing + 1 }, data.length)}>
                <Entypo name="chevron-thin-right" size={isWeb ? 28 : 24} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  ...getStyles(
    "section, text_body3, text_quote, content, text_header5, button_green, button_green_text, text_quote"
  )
});

export default Testimonial;
