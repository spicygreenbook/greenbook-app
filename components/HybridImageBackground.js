import React from 'react';
import { Platform, View, ImageBackground } from 'react-native';
import Image from 'next/image';
const isWeb = Platform.OS === 'web';

//<HybridImageBackground source={} require is needed for native, src needed for web.

export default function HybridImageBackground(props) {
    let src = props.src || props.source && props.source.uri
    return isWeb ? 
    <View {...props}>
      <Image
        src={src}
        layout="fill"
        objectFit="cover"
      />
      {props.children}
    </View>
    : <ImageBackground {...props}>{props.children}</ImageBackground>
}
