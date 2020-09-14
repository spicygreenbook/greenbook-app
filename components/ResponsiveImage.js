import React, { useState } from 'react';
import { View, Image } from 'react-native';

export function ResponsiveImage(props) {

    const [ width, setWidth ] = useState()
    const [ height, setHeight ] = useState()

    return (
        <View onLayout={(event) => {
            let w = props.style.width;
            console.log('w', w, 'layout view width', event.nativeEvent.layout.width)
            if (w > event.nativeEvent.layout.width) {
                console.log('force smaller width')
                w = event.nativeEvent.layout.width
            }
            setWidth(w);
            console.log('set height', w, props.style.aspectRatio)
            setHeight(w * (props.style.aspectRatio || 0.72));
        }}>
            <Image
                { ...props }
                style={{width: width, height: height}}
            />
        </View>

    )

}
