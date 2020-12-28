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
    let  { aspectRatio } = props.style;
    if (props.style.width && props.style.height && !aspectRatio) {
        aspectRatio = props.style.width / props.style.height;
        //console.log('calc aspectRatio iresponsive image', aspectRatio)
    }
    //console.log('set', set)

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
            if (props.cdn && props.source && props.source.uri && props.source.uri.indexOf('prismic-io.s3.amazonaws.com/spicygreenbook') > -1) {
                setURI(props.source.uri + '?w=' + responsiveImageWidthCDN({containerWidth: w}));
            }
        }} style={{position: 'relative'}}>
            <Image
                { ...props }
                { ...set }
                style={{width: width, height: height}}
            />
            {props.layerColor && <View style={{position: 'absolute', left: 0, top: 0, width: width, height: height, backgroundColor: props.layerColor}} />}
        </View>

    )

}
