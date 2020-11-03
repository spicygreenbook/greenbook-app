import React, { useEffect } from 'react';
import { useStateValue } from "../components/State";
import { getStyles, Theme } from '../utils';
import { Animated, View, Text, Image, StyleSheet, FlatList, ImageBackground, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons'; 
import { EvilIcons } from '@expo/vector-icons'; 
import { responsiveImageWidthCDN } from '../utils';

let currentIndexImage = 0;
const viewableItemsChangedImage = ({ viewableItems, changed }) => {
    //console.log("Visible items are", viewableItems);
    //console.log("Changed in this iteration", changed);
    currentIndexImage = viewableItems && viewableItems[0] && viewableItems[0].index;
}
const viewableItemsChangedConfigImage = {
    itemVisiblePercentThreshold: 50
};

export default function(props) {

    const { images, firstIndex } = props;

    const [{ view, isWeb, dimensions }, dispatch] = useStateValue();
    //const styles = StyleSheet.create(getStyles('text_body', {isWeb}));

    console.log('lightbox props', props)
    console.log('lightbox props', images.map(image => image.image))

    let imageRefTop;
    let imageRefBottom;
    const scrollToIndexImage = (obj, len) => {
        if (obj.index < 0) { obj.index = 0; }
        if (obj.index > len-1) { obj.index = len-1; }
        if (imageRefTop) {
            imageRefTop.scrollToIndex(obj)
        } else {
            console.log('no imageRef')
        }
        if (imageRefBottom) {
            imageRefBottom.scrollToIndex(obj)
        } else {
            console.log('no imageRef')
        }
    }

    let config = {
        top: {
            height: dimensions.height * 0.8,
            width: dimensions.width
        },
        bottom: {
            height: dimensions.height * 0.2,
            width: dimensions.height * 0.2
        }
    }
    console.log('images', images)

    useEffect(() => {
        setTimeout(() => {
            if (firstIndex) {
                scrollToIndexImage({animated: true, index: firstIndex}, images.length)
            }
        }, 10)
    }, [])

    return <View style={{position: 'absolute', left: 0, top:0, bottom:0, right:0, backgroundColor: '#000', zIndex: 6}}>
        <View style={{position: 'absolute', top: 0, left: 0, right:0, height: '80%'}}>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={images}
                ref={(ref) => { imageRefTop = ref; }}
                onViewableItemsChanged={viewableItemsChangedImage}
                viewabilityConfig={viewableItemsChangedConfigImage}
                renderItem={({ item, index, separators }) => (
                    <ImageBackground source={{uri: item.url + '&w=' + responsiveImageWidthCDN({containerWidth: config.top.width})}} style={{flex:1, width: config.top.width, height: '100%'}} resizeMode={'contain'} />
                )}
                keyExtractor={(item, index) => 'image' + index}
            />
        </View>
        <View style={{position: 'absolute', bottom: 0, left: 0, right:0, height: '20%'}}>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={images}
                ref={(ref) => { imageRefBottom = ref; }}
                onViewableItemsChanged={viewableItemsChangedImage}
                viewabilityConfig={viewableItemsChangedConfigImage}
                renderItem={({ item, index, separators }) => (
                    <View>
                        <TouchableOpacity onPress={e => {
                            scrollToIndexImage({animated: true, index: index}, images.length)
                        }}>
                            <ImageBackground source={{uri: item.url + '&w=400'}} style={{width: config.bottom.width, height: config.bottom.height}}>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                )}
                keyExtractor={(item, index) => 'image' + index}
            />
            <View style={{position: 'absolute', top: '50%', marginTop: -24, left:10, right:10, height: 0, flex: 1}}>
                <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                    <View style={{width:48, height:48}}>
                        <TouchableOpacity onPress={(e) => scrollToIndexImage({animated: true, index: currentIndexImage-1}, 10)}>
                            <Entypo name="chevron-thin-left" size={48} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    <View style={{width:48, height:48, alignItems: 'flex-end'}}>
                        <TouchableOpacity onPress={(e) => scrollToIndexImage({animated: true, index: currentIndexImage+1}, 10)}>
                            <Entypo name="chevron-thin-right" size={48} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
        <View style={{position: 'absolute', top: isWeb ? 10 : 80, right: 10}}>
            <TouchableOpacity onPress={e => {
                dispatch({type: 'lightbox', value: false})
            }}>
                <EvilIcons name="close" size={48} color="#fff" />
            </TouchableOpacity>
        </View>
    </View>
}
