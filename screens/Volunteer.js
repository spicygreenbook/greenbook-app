import React, {useState, useEffect} from 'react';
import { useStateValue } from "../components/State";
import {View, Text, StyleSheet, Button, Platform, ActivityIndicator, FlatList} from 'react-native';
import { Link } from "../components/Link"; 
import { PageTitle } from "../components/PageTitle"; 
import { RichText } from "../components/RichText"; 
import { getStyles, Theme, getContent, getData } from '../utils';


function Page(props) {

    const [{ view, isWeb, dimensions }, dispatch] = useStateValue();
    const styles = StyleSheet.create(getStyles('text_header2, text_header3, button_green, button_green_text, text_header4, section, content', {isWeb}));
    //console.log('page props', props)

    const [ pageLoading, setPageLoading ] = useState(props.content ? false: true);
    const [ content, setContent ] = useState(props.content || {});

    const [ loadingRoles, setLoadingRoles ] = useState(!props.roles);
    const [ errorRoles, setErrorRoles ] = useState('');
    const [ roles, setRoles ] = useState(props.roles || []);

    if (!props.content) {
        useEffect(() => {
            getContent({type: 'content', uid: 'volunteer'}).then(_content => {
                console.log('_content', _content)
                setContent(_content.content)
                setPageLoading(false);
            }).catch(err => {
                console.error(err);
            });
        }, [])
    }
    useEffect( () => {
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

    let numColumns = dimensions.width < 800 ? 1 : 2

    return (
        <React.Fragment>
        { pageLoading || loadingRoles ?
            <View style={{marginTop: 200, marginBottom: 200}}>
                <ActivityIndicator color={Theme.green} size="large" />
            </View>
        : (
            <React.Fragment>
                <PageTitle title={content.page_title} />
                <View style={[styles.section, {paddingBottom: 0, paddingTop: dimensions.width < 900 ? 40 : 80}]}>
                    <View style={styles.content}>
                        <RichText render={content._body} isWeb={isWeb} markupStyle={'fancy'} bullet={'check'}/>
                    </View>
                </View>
                <View style={[styles.section]}>
                    <View style={styles.content}>
                        <FlatList
                            key={'cols' + numColumns}
                            data={roles}
                            numColumns={numColumns}
                            renderItem={({ item, index, separators }) => (
                                <View
                                style={{ flexDirection: "row" }}
                                key={'press' + index}
                                style={{
                                    flex: 1/numColumns,
                                    margin: 10,
                                }}
                                >
                                    <Text accessibilityRole="header" aria-level={3} style={[styles.text_header3, {marginTop: 40}]}>- {' '}{' '}{item.title}</Text>
                                    <Text style={[styles.text_body, {marginTop: 10, fontStyle: 'italic'}]}>{item.location}</Text>
                                    <RichText render={item._description} isWeb={isWeb} markupStyle={'fancy'} bullet={'check'}/>
                                </View>
                            )}
                            keyExtractor={(item, index) => 'press' + index}
                        />
                    </View>
                </View>
                <View style={[styles.section]}>
                    <View style={styles.content}>
                        <View style={[{flex: 1, backgroundColor: '#000', width: '100%', flexDirection: dimensions.width < 900 ? 'column': 'row', justifyContent: 'space-between', alignItems: 'center'}]}>
                            <View style={{flex: 3, padding: 20}}>
                                <Text style={[styles.text_header4, {color: '#fff'}]}>
                                    The biggest impact we can all have is by getting as many people as possible to patron a business that we have listed.
                                </Text>
                            </View>
                            <View style={{flex: 1, padding: 20, justifyContent: 'flex-end'}}>
                                <View style={{flex: 1}}>
                                    <Link contain href="https://forms.gle/vJ114r7J3JkE8jrs9" title="Volunteer Form">
                                        <View style={[styles.button_green, { marginTop: 40}]} >    
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
    }
})

export default Page;