import React, { useState, useEffect, useRef } from 'react';
import { useStateValue } from "../components/State";
import { View, Text, StyleSheet, Button, Platform, ActivityIndicator, FlatList, TouchableOpacity} from 'react-native';
import { Link } from "../components/Link";
import { PageTitle } from "../components/PageTitle";
import { RichText } from "../components/RichText";
import { getStyles, Theme, getContent, getData } from '../utils';
import styled from 'styled-components';
import { ResponsiveImage } from "../components/ResponsiveImage"; 


function Page(props) {

    const [{ view, isWeb, dimensions }, dispatch] = useStateValue();
    const styles = StyleSheet.create(getStyles('text_header2, text_header3, button_green, button_green_text, text_header4, section, content', { isWeb }));

    const [pageLoading, setPageLoading] = useState(props.content ? false : true);
    const [content, setContent] = useState(props.content || {});
    const [bodyChanged, setBodyChanged] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const [loadingRoles, setLoadingRoles] = useState(!props.roles);
    const [errorRoles, setErrorRoles] = useState('');
    const [roles, setRoles] = useState(props.roles || []);

    if (!props.content) {
        useEffect(() => {
            getContent({ type: 'content', uid: 'volunteer' }).then(_content => {
                console.log('_content', _content)
                setContent(_content.content)
                setPageLoading(false);
            }).catch(err => {
                console.error(err);
            });
        }, [])
    }
    useEffect(() => {
        if (!props.roles) {
            getData({
                type: 'roles'
            }).then(_roles => {
                setLoadingRoles(false);
                setRoles(_roles)
            }).catch(err => {
                console.error(err);
                setLoadingRoles(false);
                setErrorRoles('Failed to load roles.');
            })
        }
    }, [])

    let state = {}
    roles.forEach((role, index) => {
        state[index] = false;
    })

    const [roleState, setRoleState] = useState({});
    console.log("STATE OF THE ROLE:", roleState);
    console.log("SELECTED ID: ", selectedId);

    let numColumns = dimensions.width < 800 ? 1 : 2
    let _photo = {value: []};
    let _use_content = content._body;
    if (isWeb && content._body) {
        _use_content = {
            value: content._body.value.filter(part => {
                console.log('part', part)
                if (part.type === 'image') {
                    _photo = {value: [part]};
                }
                return part && part.type !== 'image'
            })
        }
    }
    console.log('photo', _photo);

    const myRef = useRef(null);
    const executeScroll = () => {
        window.scrollTo(0, myRef.current.offsetTop);
    }

    return (
        <React.Fragment>
            { pageLoading || loadingRoles ?
                <View style={{ marginTop: 200, marginBottom: 200 }}>
                    <ActivityIndicator color={Theme.green} size="large" />
                </View>
                : (
                    <React.Fragment>

                        <PageTitle title={content.page_title} />
                        <View style={[styles.section]}>
                            <View style={[styles.content]}>
                                <RichText render={_use_content} isWeb={isWeb} markupStyle={'fancy'} bullet={'check'} />

                                {isWeb && <View style={{ width: "50%" }}>
                                    <Button
                                        nativeID="button"
                                        onPress={executeScroll}
                                        title="Scroll to Volunteer Form"
                                        color={Theme.green}
                                        style={styles.button_green}
                                    />
                                </View>}
                            </View>
                        </View>

                        <View style={[styles.section, { paddingTop: 0 }]}>
                            <View style={styles.content}>
                                <View style={dimensions.width < 900 ? {} : {flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                                    <View style={dimensions.width < 900 ? {} : {flex: 3}}>
                                        {_photo && _photo.value && _photo.value[0] && <ResponsiveImage
                                            style={{width: _photo.value[0].dimensions.width, resizeMode: 'contain', aspectRatio: _photo.value[0].dimensions.height/_photo.value[0].dimensions.width}}
                                            alt="Spicy Green Book"
                                            source={{uri: _photo.value[0].url}}
                                        />}
                                    </View>
                                    <View style={dimensions.width < 900 ? {paddingTop: 40} : {flex: 2, paddingLeft: 20}}>
                                        <FlatList
                                            nativeID="flatLIST"
                                            key={'cols' + numColumns}
                                            data={roles}
                                            extraData={selectedId}
                                            numColumns={1}
                                            renderItem={({ item, index, separators }) => (
                                                <View
                                                    key={'press' + index}
                                                    style={{
                                                        flex: 1,
                                                        margin: 10,
                                                    }}
                                                >
                                                    <TouchableOpacity onPress={(e) => {
                                                        console.log('pressed')
                                                        setRoleState(prevState => {
                                                            let newState = {};
                                                            newState[index] = prevState[index] ? false : true;
                                                            return {...prevState, ...newState}
                                                        });

                                                        console.log("INDEX CURRENTLY AT:", index)
                                                        console.log("PREVIOUS ID:", selectedId);
                                                        if (selectedId === 1) {
                                                            setSelectedId(0);
                                                        }
                                                        else {
                                                            setSelectedId(1)
                                                        }


                                                        // console.log("SET SELECTED INDEX TO:", selectedId)

                                                    }}>
                                                        <Text accessibilityRole="header" aria-level={3} style={[styles.text_header3, { marginTop: 40 }]}>
                                                            {roleState[index] ? '-' : '+'}{' '}{' '}{item.title}
                                                        </Text>
                                                    </TouchableOpacity>
                                                    {!!roleState[index] && <View>
                                                        <Text style={[styles.text_body, { marginTop: 10, fontStyle: 'italic' }]}>{item.location}</Text>
                                                        <RichText render={item._description} isWeb={isWeb} markupStyle={'fancy'} bullet={'check'} />
                                                    </View>}
                                                    
                                                </View>
                                            )}
                                            keyExtractor={(item, index) => 'press' + index}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View ref={myRef} nativeID="formBelow" style={[styles.section]}>
                            <View style={styles.content}>
                                <View style={[{ flex: 1, backgroundColor: '#000', width: '100%', flexDirection: dimensions.width < 900 ? 'column' : 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                                    <View style={{ flex: 3, padding: 20 }}>
                                        <Text style={[styles.text_header4, { color: '#fff' }]}>
                                            The biggest impact we can all have is by getting as many people as possible to patron a business that we have listed.
                                </Text>
                                    </View>
                                    <View style={{ flex: 1, padding: 20, justifyContent: 'flex-end' }}>
                                        <View style={{ flex: 1 }}>
                                            <Link contain href="https://forms.gle/vJ114r7J3JkE8jrs9" title="Volunteer Form">
                                                <View style={[styles.button_green]} >
                                                    <Text style={styles.button_green_text}>Volunteer Form</Text>
                                                </View>
                                            </Link>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
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
    },
})

export default Page;

