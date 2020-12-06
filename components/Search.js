import React, { useState, useEffect, useCallback } from 'react';
import { useStateValue } from "../components/State";
import { Text, StyleSheet, ActivityIndicator, View, TextInput, TouchableOpacity } from 'react-native';
import { getStyles, Theme } from '../utils';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'next/router';
import getUserLocation from '../utils/getUserLocation';
import { addRootClickHandler, removeRootClickHandler } from '../utils/rootClickHandler';

const Search = ({
  city,
  state,
  mode,
  includeUseLocationOption = false,
  navigation
}) => {
  const [{ isWeb, dimensions, searchConfig }, dispatch] = useStateValue();
  const router = useRouter();
  // console.log('search config', searchConfig)

  let staticCityState = '';
  if (city && state) {
      staticCityState = city + ', ' + state;
  }

  const [query, setQuery] = useState(searchConfig.q || '');
  const [near, setNear] = useState(staticCityState || searchConfig.near || '');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loadingUserLocation, setLoadingUserLocation] = useState(false);

  const small = dimensions.width < 900 || mode === 'results';
  const styles = StyleSheet.create(getStyles('text_body', { isWeb }));

  const onRootClick = useCallback((e) => {
    setDropdownOpen(false);
  });

  const onCurrentLocationPress = async () => {
    try {
      setLoadingUserLocation(true);
      const location = await getUserLocation();
      submitSearch({ q: query, near: location.city });
    } catch (reason) {
      alert('Could not get location data');
      setDropdownOpen(false);
      setLoadingUserLocation(false);
      console.error(reason);
    }
  };

  useEffect(() => {
    addRootClickHandler(onRootClick);
    return () => removeRootClickHandler(onRootClick);
  }, []);

  const submitSearch = (q) => {

    if(searchConfig.near === near && searchConfig.q === query) return;

    dispatch({ type: 'loading', value: true });
    dispatch({ type: 'searchConfig', value: q });

    if (isWeb) {
      if(router.route !== '/search') {
        const url = `/search?${new URLSearchParams(q).toString()}`;
        router.push(url);
      }
      return;
    }

    navigation.navigate('Browse', { screen: 'Home'})
    dispatch({ type: 'setView', view: '/search' })
  };

  const onSubmit = () => {
    submitSearch({ q: query, near });
  };

  const searchForm = (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'center',
      minHeight: includeUseLocationOption ? 140 : 0,
    }}>
      <View
        onStartShouldSetResponder={() => true}
        style={{ flex: 1, maxWidth: 840 }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: mode === 'results' ? 1 : 0,
          borderColor: Theme.green,
          backgroundColor: '#fff',
          borderRadius: 40,
          paddingTop: 6,
          paddingBottom: 6,
        }}>
          <View style={{
            flex: 2,
            marginLeft: 25,
          }}>
            {!small &&
              <Text style={[styles.text_body, {
                fontSize: 16,
                color: '#000',
                fontWeight: 'bold',
              }]}>Find</Text>
            }
            <TextInput key="searchQuery" name="q" value={query} style={[styles.text_body, { height: 30, fontSize: 16 }]} placeholder={small ? 'Find' : "BBQ, Mexican, Seafood, etc."} onChangeText={text => setQuery(text)} />
          </View>
          <View style={{ width: 1, borderRightWidth: 1, height: 48, borderColor: 'rgba(0, 0, 0, 0.5)', marginLeft: 15, marginRight: 15 }} />
          <View style={{
            flex: 4,
            marginRight: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <View style={{
              flex: 1,
            }}>
              {!small &&
                <Text style={[styles.text_body, { fontSize: 16, color: '#000', fontWeight: 'bold', marginRight: 10 }]}>Near</Text>
              }
              <TextInput
                style={{ flex: 1 }}
                key="searchNear"
                name="near"
                value={near}
                style={[styles.text_body, { height: 30, fontSize: 16 }]}
                placeholder={small ? 'Near' : "Address, city, zip, state or neighborhood"}
                onChangeText={text => setNear(text)}
                onFocus={(e) => {
                  if (isWeb) e.target.setAttribute('autocomplete', 'off');
                  setDropdownOpen(true);
                }} />
            </View>
            <TouchableOpacity onPress={() => onSubmit()}>
              {small ? (
                <View style={{ backgroundColor: Theme.green_bg, borderRadius: 40, padding: 10 }}>
                  <FontAwesome name="search" size={24} color="#fff" />
                </View>
              ) : (
                  <View style={{ backgroundColor: '#E5E5E5', borderRadius: 40, height: 55, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingLeft: 20, paddingRight: 20 }}>
                    <FontAwesome name="search" size={24} color="black" />
                    <Text style={[styles.text_body, { fontSize: 16, color: '#000', marginLeft: 10 }]}>Search</Text>
                  </View>
                )}
            </TouchableOpacity>
            {isWeb && <div style={{ width: 0, height: 0, overflow: 'hidden' }}><input type="submit" /></div>}
          </View>
        </View>
        {(includeUseLocationOption && dropdownOpen && !near) ? (
          <View style={{
            flexDirection: 'row',
          }}>
            {!small ? (
              <>
                <View style={{
                  flex: 2,
                  marginLeft: 15,
                  marginRight: 15,
                }} />
              </>
            ) : null}
            <TouchableOpacity
              onPress={() => onCurrentLocationPress()}
              style={{
                flex: 4,
                marginLeft: 15,
                marginRight: 15,
              }}>
              <View style={{
                  zIndex: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 15,
                  marginTop: 5,
                  backgroundColor: 'white',
                  shadowOpacity: 0.4,
                  shadowRadius: 10,
                  cursor: 'pointer',
                }} >
                {loadingUserLocation ? (
                  <ActivityIndicator
                    style={{ marginRight: 10, }}
                    color={Theme.green} />
                ) : (
                  <FontAwesome
                    style={{ marginRight: 10, }}
                    name="location-arrow"
                    size={24}
                    color={Theme.green} />
                )}
                <Text style={[styles.text_input, { flex: 1, color: Theme.green }]}>Current Location</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </View> 
  );

  return (
    isWeb ? (
      <form
        style={{
          width: '100%',
        }}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}>
        {searchForm}
      </form>
    ) : searchForm
  )
};

export default Search;