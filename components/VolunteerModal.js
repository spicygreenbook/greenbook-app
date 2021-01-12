import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, TouchableHighlight, View, Button } from 'react-native';
import { getStyles, Theme } from '../utils';
import { FontAwesome } from '@expo/vector-icons'; 
import { Link } from "../components/Link";

export default function App(props) {

  const { open, data, close, isWeb } = props;

  let _styles1 = getStyles('text_body2, text_header2, text_header3, button_green, button_green_text, text_header4, section, content', { isWeb });
  let _styles = {
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalView: {
      backgroundColor: 'white',
      padding: 20,
      alignItems: 'flex-start',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    }
  }
  const styles = StyleSheet.create({..._styles1, ..._styles});

  console.log('modal visible', open)

  function WebWrapper(props) {
    return props.isWeb ? 
      <View style={{
        zIndex: 3,
        elevation: 3,
        opacity: open ? 1 : 0,
        pointerEvents: open ? '': 'none',
        position: 'fixed',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
      }} onClick={e => {
        close();
      }}>
        <View style={{width: 500, maxWidth: '100%', margin: '0 auto'}} onClick={e => {
          e.stopPropagation();
        }}>
          {props.children}
        </View>
      </View>
     : (<React.Fragment>{props.children}</React.Fragment>)
  }

  return (
    <WebWrapper isWeb={isWeb}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={open}
        presentationStyle="overFullScreen"
        onRequestClose={() => {
          close()
        }} style={{borderColor: 'transparent'}}>
        <View style={[styles.centeredView, isWeb ? {width: '100%'} : {}]}>
          <View style={styles.modalView}>

            <View>
              <Text style={styles.text_header4}>{data.name}</Text>
            </View>
            <View>
              <Text style={styles.text_header4}>{data.role}</Text>
            </View>
            <View style={{marginTop: 10, marginBottom: 10}}>
              <Text style={styles.text_body2}>{data.description}</Text>
            </View>

            {!!data.date_started && <View>
              <Text style={styles.text_body2}>Started on {data.date_started}</Text>
            </View>}
            {!!data.amount && <View>
              <Text style={styles.text_body2}>${data.amount} in time volunteered</Text>
            </View>}

            {data.links && data.links.length > 0 && <View style={{flexDirection: 'row', marginTop: 20}}>
              {data.links.map(link => (
                  <View style={{flexDirection: 'row', alignItems: 'center', marginRight: 20}}>
                      <Link href={link.link}>

                          {link && link.link_title && link.link_title.toLowerCase().indexOf('instagram') > -1 && 
                            <FontAwesome name="instagram" size={16} color="#B56230" style={{marginRight: 10}} />}
                          {link && link.link_title && link.link_title.toLowerCase().indexOf('site') > -1 && 
                            <FontAwesome name="link" size={16} color="#B56230" style={{marginRight: 10}} />}

                          <Text style={styles.text_body2}>
                              {link.link_title}
                          </Text>
                      </Link>
                  </View>
              ))}
            </View>}

            {!!data.talents_donated && <View style={{borderTopWidth: 1, borderTopColor: '#999', marginTop: 20, marginBottom: 10, paddingTop: 20, paddingbottom: 20}}>
              <Text style={[styles.text_body2, {fontWeight: 'bold'}]}>SKILLS</Text>
              <View style={{marginTop: 10, flexDirection: 'row'}}>
                {data.talents_donated.map((talent, i, ar) => (<Text style={[styles.text_body2, {fontSize: 14}]}>{talent.talent}{i < ar.length-1 && ', '}</Text>))}
              </View>
            </View>}

            <View style={{marginTop: 20}}>
              <Button
                  onPress={close}
                  title="Close"
                  color={Theme.green}
                  style={styles.button_green}
              />
            </View>

          </View>
        </View>
      </Modal>
    </WebWrapper>
  );
}
