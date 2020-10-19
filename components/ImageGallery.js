import React, { useEffect } from 'react';
import { useStateValue } from "../components/State";
import { getStyles, Theme } from '../utils';
import { Animated, View, Text, Image, StyleSheet} from 'react-native';

export default function(props) {

    const { images } = props;

    const [{ view, isWeb, dimensions }, dispatch] = useStateValue();
    //const styles = StyleSheet.create(getStyles('text_body', {isWeb}));

    console.log('lightbox props', props)
    console.log('lightbox props', images.map(image => image.image))

    return <View style={{position: 'absolute', left: 0, top:0, bottom:0, right:0, backgroundColor: Theme.green}}>
        {images.map(image => image.image).map(image => (
            <View style={{flex: 1}}>
                <Image source={{uri: image.url + '&w=400', width: '100%', height: '100%', resizeMode: 'cover', aspectRatio: 1}} />
            </View>
        ))}
    </View>
}
