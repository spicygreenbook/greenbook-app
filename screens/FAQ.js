import React, {useState, useEffect, useRef} from 'react';
import { useStateValue } from "../components/State";
import {View, Text, StyleSheet, Button, Platform, ActivityIndicator, FlatList, Image, TouchableOpacity, Animated} from 'react-native';
import { Link } from "../components/Link";
import { PageTitle } from "../components/PageTitle"; 
import { RichText } from "../components/RichText"; 
import { getStyles, Theme, getContent, getData } from '../utils';
import { ResponsiveImage } from "../components/ResponsiveImage"
import { FontAwesome } from '@expo/vector-icons'; 

function Page(props) {

    const [{ view, isWeb, dimensions }, dispatch] = useStateValue();
    const styles = StyleSheet.create(getStyles('text_header2, text_header3, text_header4, text_header5, text_body, section, content, button_green, button_green_text', {isWeb}));

    const [ pageLoading, setPageLoading ] = useState(props.content ? false: true);
    const [ content, setContent ] = useState(props.content || {});

    const [ loadingFAQs, setLoadingFAQs ] = useState(!props.faqs);
    const [ errorFAQs, setErrorFAQs ] = useState('');
    const [ faqs, setFaqs ] = useState(props.faqs || []);

    const [ modalOpen, setModalOpen ] = useState(false);
    const [ modalData, setModalData ] = useState({});

    function closeModal() {
        setModalOpen(false);
    }

    if (!props.content) {
        useEffect(() => {
            getContent({type: 'content', uid: 'faq'}).then(_content => {
                setContent(_content.content)
                setPageLoading(false);
            }).catch(err => {
                console.error(err);
            });
        }, [])
    }

    useEffect( () => {
        if (!props.faqs) {
            getData({
                type: 'faq'
            }).then(_faqs => {
                setLoadingFAQs(false);
                setFaqs(_faqs)
            }).catch(err => {
                console.error(err);
                setLoadingFAQs(false);
                setErrorFAQs('Failed to load faqs.');
            })
        }
    }, [])

    console.log('faqs', faqs);

    function ListRow(props) {
        const { item } = props;
        const heightAnim = useRef(new Animated.Value(0)).current;

        const [ expanded, setExpanded ] = useState(false);

        const expand = () => {
            Animated.timing(heightAnim, {
                toValue: 1000,
                duration: 1000,
            }).start();
        };

        const collapse = () => {
            Animated.timing(heightAnim, {
                toValue: 0,
                duration: 200,
            }).start();
        };

        return (
           <View style={{marginBottom: 20}}>
                <TouchableOpacity onPress={e => {
                    setExpanded(cur => {
                        if (cur) {
                            collapse();
                            setExpanded(false);
                        } else {
                            expand();
                            setExpanded(true);
                        }
                    })
                }}>
                    <View style={{flexDirection: 'row'}}>
                        <FontAwesome name={expanded ? 'minus' : 'plus'} size={24} color={Theme.green} style={{marginRight: 10}}/>
                        <Text style={styles.text_header4}>{item.question}</Text>
                    </View>
                </TouchableOpacity>
                <Animated.View style={{maxHeight: heightAnim, overflow: 'hidden'}}>
                    <RichText render={item._answer} isWeb={isWeb} />
                </Animated.View>
            </View>
        );

    }

    let faqByCat = {};
    //let faqByCatName = {};
    faqs.forEach(faq => {
        let category = faq.category || 'General';
        if (!faqByCat[category]) {
            faqByCat[category] = [];
        }
        faqByCat[category].push(faq);
    })

    return (
        <React.Fragment>
        { pageLoading ?
            <View style={{marginTop: 200, marginBottom: 200}}>
                <ActivityIndicator color={Theme.green} size="large" />
            </View>
        : (
            <React.Fragment>
                <PageTitle navigation={props.navigation} title={content.page_title} />
                {loadingFAQs ? (
                    <ActivityIndicator color={Theme.green} size="large" />
                ) : errorFAQs ? (
                    <Text>{errorFAQs}</Text>
                ) : (
                    <React.Fragment>
                        <View style={[styles.section, {marginTop: 80}]}>
                            <View style={styles.content}>
                                {Object.keys(faqByCat).map((category, c) => (
                                    <View style={{marginTop: c > 0 ? 40 : 0}}>
                                        <Text style={[styles.text_header3, {marginBottom: 10}]}>{category}</Text>
                                        <FlatList
                                            data={faqByCat[category]}
                                            renderItem={({ item, index, separators }) => (<ListRow item={item} />)}
                                            keyExtractor={(item, index) => 'image' + index}
                                        />
                                    </View>
                                ))}
                            </View>
                        </View>
                        <View style={[styles.section, { paddingTop: 0 }]}>
                            <View style={styles.content}>
                                <View style={dimensions.width < 700 ? {} : {flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'center'}}>
                                    <View style={dimensions.width < 700 ? {} : {flex: 1, paddingRight: 20}}>
                                        <ResponsiveImage
                                            style={{width: 861, resizeMode: 'contain', aspectRatio: 0.57}}
                                            alt="FAQ Person"
                                            source={isWeb ? { uri: '/images/faq_person.png' } : require('../public/images/faq_person.png')}
                                        />
                                    </View>
                                    <View style={dimensions.width < 700 ? {paddingTop: 40} : {flex: 2, paddingLeft: 20}}>
                                        <Text style={[styles.text_body, {color: '#000'}]}>
                                            Can't find what you're looking for or still have doubts?
                                        </Text>
                                        <Link href="/contact" contain onPress={() => props.navigation.navigate('Contact')} >
                                            <View style={[styles.button_green, { marginTop: 40 }]} >    
                                                <Text style={[styles.button_green_text]}>Contact Us</Text>
                                            </View>
                                        </Link>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </React.Fragment>
                )}
            </React.Fragment>
        )}
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default Page;