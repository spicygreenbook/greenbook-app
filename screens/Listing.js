import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Share } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { useStateValue } from "../components/State";
import { Link } from "../components/Link";
import { RichText } from "../components/RichText";
import { getStyles, Theme, getContent } from '../utils';
import Map from "../components/Map";
//import MapView from 'react-native-maps'; this breaks web still
import Attribution from "../components/Attribution";
import Spinner from '../components/Spinner';
import SharingModal from '../components/SharingModal';
import { FontAwesome } from '@expo/vector-icons';

function Page(props) {

    const [{ view, isWeb, dimensions }, dispatch] = useStateValue();
    const styles = StyleSheet.create(getStyles('text_header2, text_body, text_body2, section, content, text_link', { isWeb }));

    const [pageLoading, setPageLoading] = useState(!props.content);
    const [content, setContent] = useState(props.content);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState({});

    const mapKeys = ['geocoordinates', 'name', 'address'];
    const [mapInfoStr, setMapStr] = useState('');
    const mapInfo = {};

    const navigation = !isWeb ? useNavigation() : null;

    function closeModal() {
        setModalOpen(false);
    }

    useEffect(() => {
        setPageLoading(true);
        getContent({
            type: 'listing',
            uid: view.split('/')[2]
        }).then(_data => {
            setContent(_data.content)
            setPageLoading(false);
        }).catch(err => {
            console.error(err);
        });
    }, [view])

    useEffect(() => {
        if (content && typeof content === 'object') {
            mapKeys.forEach(key => {
                mapInfo[key] = content[key];
            })
            setMapStr(encodeURIComponent(JSON.stringify(mapInfo)));
            console.log('sendinfostr', mapInfoStr);
        }
    }, [content])

    function clickImage(index) {
        const images = content.images.filter(image => image.image).map(image => image.image);

        if (!isWeb) {
            navigation.navigate('ModalImages', { images, name: content.name });
            return;
        }

        dispatch({
            type: 'lightboxConfig', value: {
                index: index || 0,
                images
            }
        })
        dispatch({ type: 'lightbox', value: true })
    }

    let primaryImages = content ? content.images.filter(_image => _image.image).map(_image => {
        let image = _image.image;
        //console.log('image', image)
        image.ratio = image.height / image.width;
        let ratioScore = Math.round(Math.abs(0.56 - image.ratio) * 1.3);
        image.imageScore = ratioScore
        return image
    }).sort((a, b) => {
        return a.imageScore - b.imageScore
    }) : []
    /*primaryImages.forEach((image, i) => {
        console.log('i', i, 'score', image.imageScore, 'ratio', image.ratio, 'widthxh', image.width, image.height)
    })*/

    const share = async () => {
        let sharingUrl = `https://spicygreenbook.org/biz/${content.uid}`;
        await Share.share({
            title: `${content.name}`,
            dialogTitle: `${content.name}`,
            url: sharingUrl,
            subject: `Check out ${content.name} on Spicy Green Book`,
            message: `Check out ${content.name} on Spicy Green Book at ${sharingUrl}`
        })
    }

    return (
        <ScrollView>
            {pageLoading ?
                <Spinner />
                : (
                    <React.Fragment>
                        <View style={{ paddingTop: isWeb ? 120 : 0 }} />
                        <View style={{ flexDirection: 'row', backgroundColor: Theme.green_bg }}>
                            <View style={{ flex: 2, borderRightWidth: 2, borderColor: '#fff' }}>
                                <TouchableOpacity onPress={e => clickImage(0)}>
                                    <Image source={{ uri: primaryImages[0].url + '&w=1200' }} style={{ width: '100%', height: dimensions.width < 600 ? 302 : dimensions.width < 900 ? 402 : 602 }} resizeMode="cover" />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1 }}>
                                {primaryImages.slice(1, 3).map(({ url }, i) => (
                                    <View key={'url' + i} style={{ flex: 1, borderBottomWidth: i === 0 ? 2 : null, borderColor: i === 0 ? '#fff' : null }}>
                                        <TouchableOpacity onPress={() => clickImage(i + 1)}>
                                            <Image source={{ uri: url + '&w=600' }} style={{ width: '100%', height: dimensions.width < 600 ? 150 : dimensions.width < 900 ? 200 : 300 }} resizeMode="cover" />
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </View>
                        </View>
                        <View style={[dimensions.width < 600 ? {} : { flexDirection: 'row' }, { backgroundColor: Theme.green_bg, borderTopWidth: 2, borderColor: '#fff' }]}>
                            <View style={[dimensions.width < 600 ? {} : { flex: 2 }, { borderRightWidth: 2, borderColor: '#fff', alignItems: 'flex-end' }]}>
                                <TouchableOpacity
                                    onPress={(e) => {
                                        if (isWeb) {
                                            console.log(content);
                                            setModalData(content);
                                            setModalOpen(true);
                                        } else {
                                            share();
                                        }
                                    }}
                                >
                                    <View style={{ padding: 20, paddingBottom: 0, marginRight: 10, flexDirection: 'row' }}>

                                        <View style={{ marginRight: 10 }} >
                                            <FontAwesome name="share" size={24} color="#fff" />
                                        </View>
                                        <Text style={[styles.text_body, { color: '#fff', borderBottomWidth: 2, borderColor: '#fff', fontSize: 18, fontWeight: '700', textTransform: 'uppercase' }]}>Share</Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={{ padding: 20, paddingBottom: dimensions.width < 600 ? 0 : 40, width: 795, maxWidth: '100%', marginLeft: 10 }}>
                                    <Text style={[styles.text_header2, { color: '#fff', textTransform: 'none', paddingBottom: 20 }]}>{content.name}</Text>
                                    {content.address &&
                                        <Link href={`https://www.google.com/maps/dir//${content.address.join(' ').split(/\s/g).join('+')}`} target="_blank">
                                            <Text style={[styles.text_body, { color: '#fff', paddingBottom: 20 }]}>{content.address}</Text>
                                        </Link>
                                    }
                                    {content.hours && content.hours.length &&
                                        content.hours.map((line, l) => (
                                            <Text key={'hoursline' + l} style={[styles.text_body, { color: '#fff', fontSize: 18 }]}>{line}</Text>
                                        ))
                                    }
                                </View>
                            </View>
                            <View style={[dimensions.width < 600 ? {} : { flex: 1 }, { alignItems: 'flex-start', justifyContent: 'center' }]}>
                                <View style={{ padding: 20 }}>
                                    {content.phone_number &&
                                        <Link href={'tel:' + content.phone_number}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                                                <View style={{ marginRight: 10 }}>
                                                    <FontAwesome name="phone" size={24} color="#fff" />
                                                </View>
                                                <View>
                                                    <Text style={[styles.text_body, { color: '#fff', fontSize: 18 }]}>{content.phone_number}</Text>
                                                </View>
                                            </View>
                                        </Link>
                                    }
                                    {content.instagram &&
                                        <Link href={'https://instagram.com/' + (content.instagram.indexOf('@') > -1 ? content.instagram.slice(1) : content.instagram)}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginTop: 10 }}>
                                                <View style={{ marginRight: 10 }}>
                                                    <FontAwesome name="instagram" size={24} color="#fff" />
                                                </View>
                                                <View>
                                                    <Text style={[styles.text_body, { color: '#fff', fontSize: 18 }]}>{content.instagram.substr(1)}</Text>
                                                </View>
                                            </View>
                                        </Link>
                                    }
                                    {content.website_url &&
                                        <Link href={content.website_url}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginTop: 10 }}>
                                                <View style={{ marginRight: 10 }}>
                                                    <FontAwesome name="link" size={24} color="#fff" />
                                                </View>
                                                <View>
                                                    <Text style={[styles.text_body, { color: '#fff', fontSize: 18 }]}>{content.website_url
                                                        .replace(
                                                            "https://",
                                                            ""
                                                        )
                                                        .replace(
                                                            "http://",
                                                            ""
                                                        )
                                                        .replace(
                                                            "www.",
                                                            ""
                                                        ).split('/')[0]}</Text>
                                                </View>
                                            </View>
                                        </Link>
                                    }
                                    {content.online_ordering_link &&
                                        <Link href={content.online_ordering_link}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginTop: 10 }}>
                                                <View style={{ marginRight: 10 }}>
                                                    <FontAwesome name="link" size={24} color="#fff" />
                                                </View>
                                                <View>
                                                    <Text style={[styles.text_body, { color: '#fff', fontSize: 18 }]}>Online Ordering</Text>
                                                </View>
                                            </View>
                                        </Link>
                                    }
                                    {content.cuisines && !!content.cuisines.length && <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginTop: 10 }}>
                                        <View style={{ marginRight: 10 }}>
                                            <FontAwesome name="tags" size={24} color="#fff" />
                                        </View>
                                        <View>
                                            <Text style={[styles.text_body, { color: '#fff', fontSize: 18 }]}>
                                                {content.cuisines.map(cuisine => cuisine.cuisine).filter(cuisine => cuisine).join(', ')}
                                            </Text>
                                        </View>
                                    </View>}
                                </View>
                            </View>
                        </View>
                        {dimensions.width < 600 ? (
                            <React.Fragment>
                                {isWeb ? <Map list={[content]} single mode="m" /> : <WebView style={{ height: 200 }} source={{ uri: 'https://spicygreenbook.org/map?info=' + mapInfoStr }} />}
                            </React.Fragment>
                        ) : null}
                        {content.youtube_video && <View style={[styles.section, { paddingBottom: 0 }]}>
                            <View style={[styles.content, isWeb ? {} : { height: 300, marginTop: 20 }]}>
                                {isWeb ? (
                                    <div style={{ position: 'relative' }}>
                                        <div style={{ paddingTop: (100 * ((content.youtube_video.height || 360) / (content.youtube_video.width || 480))) + '%' }} />
                                        <div
                                            style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }}
                                            dangerouslySetInnerHTML={{
                                                __html: `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${content.youtube_video.embed_url.split(/youtu.be\/|youtube.com\//)[1] || ''}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
                                            }} />
                                    </div>
                                ) : (
                                    <WebView
                                        javaScriptEnabled={true}
                                        domStorageEnabled={true}
                                        source={{ uri: 'https://www.youtube.com/embed/' + (content.youtube_video.embed_url.split(/youtu.be\/|youtube.com\//)[1] || '') + '?rel=0&autoplay=0&showinfo=0&controls=0' }}
                                    />
                                )}
                            </View>
                        </View>}
                        <View style={[styles.section]}>
                            <View style={[styles.content]}>
                                <RichText render={content._bio} isWeb={isWeb} />
                                {!!(content.attribution && content.attribution.length) && <Attribution attribution={content.attribution} />}
                            </View>
                        </View>
                        {isWeb ?
                            <SharingModal
                                open={modalOpen}
                                data={modalData}
                                close={closeModal}
                                isWeb={isWeb}
                            />
                            : null
                        }
                    </React.Fragment>
                )}
        </ScrollView>
    )
}

export default Page;
