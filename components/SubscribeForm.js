import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useStateValue } from './State';
import fetch from 'isomorphic-unfetch'

export default () => {
  const [{ dimensions }] = useStateValue();
  const [status, setStatus] = useState({ success: false, error: null, loading: null });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // TODO: Implement the API
  const onSubmit = () => {
    setStatus({
      status: null,
      error: null,
      loading: true, 
    });
    fetch('/api/subscribe', {
      body: JSON.stringify({ name, email })
    }).then(res => res.json())
      .then(() => {
        setStatus({ ...status, success: true })
      }).catch(e => {
        setStatus({ error: e.message })
      }).finally(() => {
        setStatus({ ...status, loading: false  })
      })
  };

  const { error } = status;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.header}>
          {'Subscribe to get our newsletter'.toUpperCase()}
      </Text>
      <View style={[styles.inner, dimensions.width > 980 ? { flexDirection: 'row' } : { flexDirection: 'column' }]}>
          <TextInput
              style={styles.input}
              placeholder="Enter Full Name"
              onChangeText={e => setName(e)}
              value={name}
          />
          <TextInput
              style={styles.input}
              placeholder="Enter Email"
              onChangeText={e => setEmail(e)}
              value={email}
          />
          <TouchableOpacity onPress={onSubmit} style={styles.btn}>
              <Text style={styles.btnLabel}>
                  {`Subscribe`.toUpperCase()}
              </Text>
          </TouchableOpacity>
      </View>
      {error && (<Text style={styles.errorMsg}>
        {error}
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
      fontWeight: 700,
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
      border: 2,
      borderStyle: 'solid',
      borderColor: '#006233',
      fontWeight: 700,
  },
  errorMsg: {
    color: '#dc3545',
    opacity: .9,
    paddingTop: 12,
    paddingLeft: 12,
  }
});