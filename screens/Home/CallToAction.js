import React from 'react';
import { View, Text, StyleSheet, Image, Platform } from 'react-native';
import { Entypo } from '@expo/vector-icons'; 
import { useStateValue } from "../../components/State";
import { getStyles, Theme } from '../../utils';
import { Link } from '../../components/Link';
import { useNavigation } from '@react-navigation/native';

const CallToAction = () => {
  const [{ isWeb, dimensions }] = useStateValue();
  const navigations = !isWeb ? useNavigation() : null;

  const data = [
    {
      url: isWeb ? '/images/happylady.jpg' : require('../../public/images/happylady.jpg'),
      call: 'Become a member',
      q: 'Are you a Black business looking to reach a larger audience?',
      btnText: 'JOIN NOW',
      link: '/add',
      navigate: 'Add Listing'
    },
    {
      url: isWeb ? '/images/piggy.png' : require('../../public/images/piggy.png'),
      call: 'Become a donor',
      q: 'Support a Black-owned business.',
      btnText: 'DONATE NOW',
      link: '/donate',
      navigate: 'Donate'
    },
    {
      url: isWeb ? '/images/together.jpg' : require('../../public/images/together.jpg'),
      call: 'Become a volunteer',
      q: `Help your community succeed`,
      btnText: 'JOIN NOW',
      link: '/volunteer',
      navigate: 'Volunteer'
    },
  ]

  return (
    <View style={[styles.section]}>
      <View style={[styles.content, isWeb ? {flexDirection: dimensions.width < 900 ? 'column' : 'row'} : {} ]}>
        {
          data.map((d, i) => (
            <View key={i} style={styles.container}>
              <Image
                style={[styles.image, {width: isWeb ? 'inherit' : '100%', top: i === 1 ? -4 : 0}]}
                alt={d.call}
                source={d.url}
              />
      
              <Text style={[styles.text_body3, styles.call]}>{d.call}</Text>
              <Text style={styles.q}>{d.q}</Text>
      
              <Link href={d.link} onPress={() => navigations.navigate(d.navigate)} >
                <View style={{marginBottom: 10, flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{color: Theme.green, fontWeight: 'bold', fontSize: 18}}>{d.btnText}</Text>
                  <Entypo name="chevron-right" size={24} color={Theme.green} />
                </View>
              </Link>
            </View>
          ))
        }
      </View>
    </View> 
  ) 
};

const styles = StyleSheet.create({
  ...getStyles('section, text_body3, text_quote, content'),
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    width: '100%', 
    padding: 8, 
    justifyContent: 'flex-start',
  },

  image: {
    height: 266, 
    resizeMode: 'contain'
  },

  call: {
    color: '#000', 
    fontWeight: 'bold', 
    fontSize: 24, 
    marginTop: 16,
    textTransform: 'uppercase',
  },

  q: {
    fontFamily: 'ApercuLight', 
    lineHeight: 25, 
    color: '#000', 
    fontSize: 18, 
    textAlign: 'center', 
    marginVertical: 24, 
    height: Platform.OS === 'web' ? 46 : 'auto'
  }
});

export default CallToAction;