import React, { useState, useEffect, useCallback } from 'react';
import { useStateValue } from "../components/State";
import { Text, StyleSheet, ActivityIndicator, View, TextInput, TouchableOpacity, Picker} from 'react-native';
import { getStyles, Theme } from '../utils';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'next/router';
import getUserLocation from '../utils/getUserLocation';
import { addRootClickHandler, removeRootClickHandler } from '../utils/rootClickHandler';
import { useNavigation } from '@react-navigation/native';
import { getSetSearchInfo } from '../utils/getData';

const Search = ({
  city,
  state,
  mode,
  handleSortChange,
  sortOption,
  includeUseLocationOption = false
}) => {
  const [{ isWeb, dimensions, searchConfig }, dispatch] = useStateValue();
  const router = useRouter();
  const navigation = !isWeb ? useNavigation() : null
  // console.log('search config', searchConfig)

  let staticCityState = '';
  if (city && state) {
      staticCityState = city + ', ' + state;
  }

  const [query, setQuery] = useState((searchConfig.q || '').replace(/\+/g, ' '));
  const [near, setNear] = useState((staticCityState || searchConfig.near || '').replace(/\+/g, ' '));
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loadingUserLocation, setLoadingUserLocation] = useState(false);
  const [searchInfoCache, setSearchInfoCache] = useState();

  const small = dimensions.width < 900 || mode === 'results';
  const smallSize = dimensions.width < 1400;
  const tablet = dimensions.width < 1700;
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
      setSearchInfoCache()
      alert('Could not get location data');
      setDropdownOpen(false);
      setLoadingUserLocation(false);
      console.error(reason);
    }
  };

  useEffect(() => {
    async function fetchSearchInfo() {
      setSearchInfoCache(await getSetSearchInfo());
    }
    fetchSearchInfo()
    addRootClickHandler(onRootClick);
    return () => removeRootClickHandler(onRootClick);
  }, []);

  useEffect(() => {
    console.log('search info', searchInfoCache);
    if (searchInfoCache && typeof searchInfoCache === 'object') {
      if (!near && searchInfoCache.near) {
        setNear(searchInfoCache.near);
      } else if (searchInfoCache.city && searchInfoCache.state && !near) {
        setNear(searchInfoCache.city + ', ' + searchInfoCache.state)
      }
      if (!query && searchInfoCache.q) {
        setQuery(searchInfoCache.q);
      }
    }
  }, [searchInfoCache])

  const submitSearch = (q) => {

    if(searchConfig.near === near && searchConfig.q === query) return;

    if (q.near) {
      q.near = q.near.replace(/\+/g, ' ')
    }
    dispatch({ type: 'loading', value: true });
    dispatch({ type: 'searchConfig', value: q });

    getSetSearchInfo({
      q: q.q || '',
      near: q.near || '',
      city: searchInfoCache && searchInfoCache.city,
      state: searchInfoCache && searchInfoCache.state
    })

    if (isWeb) {
      const url = `/search?${new URLSearchParams(q).toString()}`;
      router.push(url);
      return;
    }

    navigation.navigate('Directory', { screen: 'Home'})
    dispatch({ type: 'setView', view: '/search' })
  };

  const onSubmit = () => {
    submitSearch({ q: query, near });
  };

  let onStartProp = isWeb ? {} : {
    onStartShouldSetResponder:() => true
  }

  const searchForm = (
    <View style={{
      flexDirection: mode === 'results' ? 'column' : 'row',
      justifyContent: 'center',
      width: '100%',
      minHeight: includeUseLocationOption ? 140 : 0,
    }}>
      <View
        {...onStartProp}
        style={{ flex: 1, flexDirection: 'row', alignItems: 'center', maxWidth: mode === 'results' ? '100%' : 840}}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          flex: small || mode !== 'results' ? 1 : tablet ? 0.75 : 0.70,
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
        {smallSize ? null : (
          <View style={{
            display: mode === 'results' ? '' : 'none',
            flex: tablet ? 0.25 : 0.30,
            flexDirection: tablet ? 'column' : 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Text style={[styles.text_body, {color: Theme.green, fontWeight: 'bold', flex: 1, marginLeft: 10, marginRight: 5}]}>Sort By:</Text>
            <View style={{flex: 1}}>
              <Picker
                selectedValue={sortOption}
                onValueChange={value => {handleSortChange(value)}}
              >
                <Picker.Item label="Relevance" value="relevance" />
                <Picker.Item label="A-Z" value="asc" />
                <Picker.Item label="Z-A" value="desc" />
              </Picker>
            </View>
          </View>
        )}
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
      {smallSize ? (
        <View style={{
          display: mode === 'results' ? 'flex' : 'none',
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 10
        }}>
          <Text style={[styles.text_body, {color: Theme.green, fontWeight: 'bold', flex: 1, marginLeft: 10, marginRight: 10}]}>Sort By:</Text>
          <View style={{flex: 1}}>
            <Picker
              selectedValue={sortOption}
              onValueChange={value => {handleSortChange(value)}}
            >
              <Picker.Item label="Relevance" value="relevance"/>
              <Picker.Item label="A-Z" value="asc"/>
              <Picker.Item label="Z-A" value="desc"/>
            </Picker>
          </View>
        </View>
      ) : null}
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
