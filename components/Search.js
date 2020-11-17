import React, { useState, useRef } from 'react';
import { useStateValue } from "../components/State";
import { Text, StyleSheet, Button, View, TextInput, TouchableOpacity } from 'react-native';
import { getStyles, Theme } from '../utils';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'next/router';

const Search = ({
  mode,
}) => {
  const [{ isWeb, dimensions, searchConfig }, dispatch] = useStateValue();
  const router = useRouter();

  const [query, setQuery] = useState(searchConfig.q || '');
  const [near, setNear] = useState(searchConfig.near || '');

  const small = dimensions.width < 900 || mode === 'results';
  const styles = StyleSheet.create(getStyles('text_body', { isWeb }));

  function submitSearch() {

    dispatch({
      type: 'searchConfig', value: {
        q: query,
        near: near
      }
    })

    if (isWeb) {
      const { protocol, host, port } = window.location;
      let searchUrl = '/search';
      if (query) {
        if (searchUrl === '/search') { searchUrl += '?' } else { searchUrl += '&'; }
        searchUrl += 'q=' + encodeURIComponent(query);
      }
      if (near){
        if (searchUrl === '/search') { searchUrl += '?' } else { searchUrl += '&'; }
        searchUrl += 'near=' + encodeURIComponent(near);
      }
        //console.log('going to', searchUrl)
      router.push(searchUrl, searchUrl, {shallow: true});
      return;
    }

    dispatch({ type: 'setView', view: '/search' })
  }

  const searchForm = (
    <View style={{ borderWidth: mode === 'results' ? 1 : 0, borderColor: Theme.green, backgroundColor: '#fff', borderRadius: 40, maxWidth: 840, paddingLeft: 40, paddingRight: 20, paddingTop: 6, paddingBottom: 6 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ width: small ? 100 : 200 }}>
          {!small &&
            <View>
              <Text style={[styles.text_body, { fontSize: 16, color: '#000', fontWeight: 'bold' }]}>Find</Text>
            </View>
          }
          <View>
            <TextInput key="searchQuery" name="q" value={query} style={[styles.text_body, { height: 30, fontSize: 16 }]} placeholder={small ? 'Find' : "BBQ, Mexican, Seafood, etc."} onChangeText={text => setQuery(text)} />
          </View>
        </View>
        <View style={{ width: 1, borderRightWidth: 1, height: 48, borderColor: 'rgba(0, 0, 0, 0.5)', marginLeft: 20, marginRight: 20 }} />
        <View style={{ width: small ? 100 : 440 }}>
          {!small &&
            <View>
              <Text style={[styles.text_body, { fontSize: 16, color: '#000', fontWeight: 'bold' }]}>Near</Text>
            </View>
          }
          <View>
            <TextInput key="searchNear" name="near" value={near} style={[styles.text_body, { height: 30, fontSize: 16 }]} placeholder={small ? 'Near' : "Address, city, zip, state or neighborhood"} onChangeText={text => setNear(text)} />
          </View>
        </View>
        <View>
          <TouchableOpacity onPress={e => { submitSearch(query, near) }}>
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
        </View>
        {isWeb && <div style={{ width: 0, height: 0, overflow: 'hidden' }}><input type="submit" /></div>}
      </View>
    </View>
  );

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', maxWidth: '100%' }}>
      {isWeb ? (
        <form onSubmit={(e) => {
          e.preventDefault();
          submitSearch();
        }}>
          {searchForm}
        </form>
      ) : searchForm}
    </View>
  )
};

export default Search;
