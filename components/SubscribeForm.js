import React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useStateValue } from './State';
import fetch from 'isomorphic-unfetch';

export default ({ showTitle = true }) => {
  const [{ dimensions }] = useStateValue();
  const [status, setStatus] = useState({ success: false, error: null, loading: null });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const onSubmit = async () => {
    try {
      setStatus({ ...status, loading: true, error: null });
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        body: JSON.stringify({ email, name }),
      });
      if (!response.ok) {
        const { error } = await response.json();
        setStatus({ ...status, loading: false, error });
      } else {
        setStatus({ success: true, error: null, loading: false });
      }
    } catch (e) {
      setStatus({ ...status, loading: false, error: 'Unknown Error' });
    }
  };

  const { error, success } = status;

  return (
    <View style={styles.wrapper}>
      {showTitle && <Text style={styles.header}>
          {'Subscribe to get our newsletter'.toUpperCase()}
      </Text>}
      {!success && (
        <View style={[styles.inner, dimensions.width > 980 ? { flexDirection: 'row' } : { flexDirection: 'column' }]}>
          <TextInput
              style={styles.input}
              placeholder="Enter Full Name"
              placeholderTextColor="#ebebeb"
              onChangeText={e => setName(e)}
              value={name}
          />
          <TextInput
              style={styles.input}
              placeholder="Enter Email"
              placeholderTextColor="#ebebeb"
              onChangeText={e => setEmail(e)}
              value={email}
          />
          <TouchableOpacity disabled={status.loading} onPress={onSubmit} style={styles.btn}>
              <Text style={styles.btnLabel}>
                  {`Subscribe`.toUpperCase()}
              </Text>
          </TouchableOpacity>
      </View>
      )}
      {error && (<Text style={styles.errorMsg}>
        {error}
      </Text>)}
      {success && (<Text style={styles.successMsg}>
        Thanks for subscribing!
      </Text>)}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 24,
    paddingLeft: 12,
    paddingTop: 48,
  },
  header: {
      color: '#fff',
      fontSize: 24,
      paddingLeft: 12,
      fontWeight: "700",
      paddingBottom: 24,
  },
  inner: {
      flexDirection: 'row',
  },
  input: {
      borderColor: '#fff',
      color: '#fff',
      borderStyle: 'solid',
      borderWidth: 1,
      padding: 12,
      margin: 12,
      flex: 2,
  },
  btn: {
      alignItems: "center",
      backgroundColor: "#006233",
      padding: 12,
      margin: 12,
      alignContent: 'center',
      justifyContent: 'center',
      flex: 1,
  },
  btnLabel: {
      color: '#fff',
      borderWidth: 2,
      borderStyle: 'solid',
      borderColor: '#006233',
      fontWeight: "700",
  },
  errorMsg: {
    color: '#dc3545',
    opacity: .9,
    paddingTop: 12,
    paddingLeft: 12,
  },
  successMsg: {
    color: '#006233',
    opacity: .9,
    paddingTop: 12,
    paddingLeft: 12,
  }
});
