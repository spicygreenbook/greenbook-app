import React, { useEffect, useState } from 'react';
import { useStateValue } from "../components/State";
import { getStyles, Theme } from '../utils';
import { Animated, View, Text, Image, StyleSheet, FlatList, ImageBackground, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { responsiveImageWidthCDN } from '../utils';
import { BlurView } from 'expo-blur';
import styled from 'styled-components';

let currentIndexImage = 0;
const viewableItemsChangedImage = ({ viewableItems, changed }) => {
    //console.log("Visible items are", viewableItems);
    //console.log("Changed in this iteration", changed);
    currentIndexImage = viewableItems && viewableItems[0] && viewableItems[0].index;
}
const viewableItemsChangedConfigImage = {
    itemVisiblePercentThreshold: 50
};

export default function (props) {

    const { images, firstIndex } = props;

    const [{ view, isWeb, dimensions }, dispatch] = useStateValue();
    const [selectedId, setSelectedId] = useState(null);
    //const styles = StyleSheet.create(getStyles('text_body', {isWeb}));


    let imageRefTop;
    let imageRefBottom;
    const scrollToIndexImage = (obj, len) => {
        if (obj.index < 0) { obj.index = 0; }
        if (obj.index > len - 1) { obj.index = len - 1; }
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
            height: dimensions.height * 0.70,
            width: dimensions.width
        },
        bottom: {
            height: dimensions.height * 0.2,
            width: dimensions.height * 0.2
        }
    }

    useEffect(() => {
        setTimeout(() => {
            if (firstIndex) {
                scrollToIndexImage({ animated: true, index: firstIndex }, images.length)
            }
        }, 10)
    }, [])

    const styles = StyleSheet.create({
        thumbnail: {
            position: 'absolute',
            display: 'block',
            bottom: 0,
            left: 0,
            right: 0,
            height: '30%',
            backgroundColor: '#191919'
        },

        thumbnailImages: {
            paddingLeft: '20px',
            paddingRight: '20px',
            paddingTop: '25px'
        },

        thumbnailBackground: {
            width: config.bottom.width,
            height: config.bottom.height,
            marginTop: '15px',
            marginBottom: '40px',
            boxShadow: 'black 7px 10px 10px 4px'

        },

        thumbnailBackgroundClicked: {
            width: config.bottom.width,
            height: config.bottom.height,
            marginTop: '15px',
            marginBottom: '40px',
            boxShadow: 'black 7px 10px 10px 4px',
            opacity: '.5'

        },

        chevronLeft: {
            backgroundColor: 'black',
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '50%',
            textAlign: 'center',
            paddingTop: '0.6rem',
            paddingRight: '0.2rem',
            opacity: '.7'
        },

        chevronRight: {
            backgroundColor: 'black',
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '50%',
            textAlign: 'center',
            paddingTop: '0.6rem',
            paddingLeft: '0.2rem',
            opacity: '.7'
        },
    })

    const Hover = styled.div`
        &:hover {
            transform: scale(1.2);
        }
        
        &:active {
            opacity: .5;
        }

    `;

    return <View style={{ position: 'absolute', left: 0, top: 0, bottom: 0, right: 0, backgroundColor: '#000', zIndex: 6 }}>
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '70%' }}>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={images}
                extraData={selectedId}
                ref={(ref) => { imageRefTop = ref; }}
                onViewableItemsChanged={viewableItemsChangedImage}
                viewabilityConfig={viewableItemsChangedConfigImage}
                renderItem={({ item, index, separators }) => (
                    <View style={{ position: 'relative' }}>
                        {isWeb && <React.Fragment>
                            <ImageBackground source={{ uri: item.url + '&w=' + responsiveImageWidthCDN({ containerWidth: config.top.width }) }} style={StyleSheet.absoluteFill} resizeMode={'cover'} />
                            <BlurView intensity={100} style={StyleSheet.absoluteFill}>
                            </BlurView>
                        </React.Fragment>
                        }
                        <ImageBackground source={{ uri: item.url + '&w=' + responsiveImageWidthCDN({ containerWidth: config.top.width }) }} style={{ flex: 1, width: config.top.width, height: '100%' }} resizeMode={'contain'} />
                    </View>
                )}
                keyExtractor={(item, index) => 'image' + index}
            />
        </View>
        <View style={styles.thumbnail}>
            <FlatList
                style={{ flexShrink: '0' }}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={images}
                ref={(ref) => { imageRefBottom = ref; }}
                onViewableItemsChanged={viewableItemsChangedImage}
                viewabilityConfig={viewableItemsChangedConfigImage}
                renderItem={({ item, index, separators }) => (
                    <View style={styles.thumbnailImages}>
                        <TouchableOpacity onPress={e => {
                            scrollToIndexImage({ animated: true, index: index }, images.length)
                            setSelectedId(index);
                        }}>
                            <Hover>
                                <ImageBackground source={{ uri: item.url + '&w=400' }} style={
                                    index === selectedId ? styles.thumbnailBackgroundClicked : styles.thumbnailBackground
                                }>
                                </ImageBackground>
                            </Hover>
                        </TouchableOpacity>
                    </View>
                )}
                keyExtractor={(item, index) => 'image' + index}
            />
            <View style={{ backgroundColor: '#191919', height: '0%' }}>
                <View style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    top: '-35rem',
                    marginLeft: '1rem',
                    marginRight: '1rem',
                }}>
                    <View style={{ width: 100, height: 100, alignItems: 'flex-start' }}>
                        <TouchableOpacity onPress={(e) => scrollToIndexImage({ animated: true, index: currentIndexImage - 1 }, images.length)}>
                            <Entypo name="chevron-thin-left" size={18} color="#fff" style={styles.chevronLeft} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: 100, height: 100, alignItems: 'flex-end' }}>
                        <TouchableOpacity onPress={(e) => scrollToIndexImage({ animated: true, index: currentIndexImage + 1 }, images.length)}>
                            <Entypo name="chevron-thin-right" size={18} color="#fff" style={styles.chevronRight} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
        <View style={{ position: 'absolute', top: isWeb ? 10 : 80, right: 10 }}>
            <TouchableOpacity onPress={e => {
                dispatch({ type: 'lightbox', value: false })
            }}>
                <EvilIcons name="close" size={32} color="#fff" />
            </TouchableOpacity>
        </View>
    </View>
}
