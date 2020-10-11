import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { responsiveImageWidthCDN } from '../utils';

export function ResponsiveImage(props) {

    const [ width, setWidth ] = useState()
    const [ height, setHeight ] = useState()
    const [ uri, setURI ] = useState()

    let set = {};
    if (uri) {
        set = {
            source: { uri: uri }
        }
    }

    return (
        <View onLayout={(event) => {
            let w = props.style.width;
            //console.log('w', w, 'layout view width', event.nativeEvent.layout.width)
            if (w > event.nativeEvent.layout.width) {
                w = event.nativeEvent.layout.width
            }
            setWidth(w);
            //console.log('set height', w, props.style.aspectRatio)
            setHeight(w * (props.style.aspectRatio || 0.72));
            if (props.cdn && props.source) {
                setURI(props.source.uri + '&w=' + responsiveImageWidthCDN({containerWidth: w}));
            }
        }}>
            <Image
                { ...props }
                { ...set }
                style={{width: width, height: height}}
            />
        </View>

    )

}
