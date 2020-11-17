import React, {useState, useEffect} from 'react';
import { useStateValue } from "../components/State";
import {View, Text, StyleSheet, Button, Platform, ActivityIndicator, FlatList, Image} from 'react-native';
import { Link } from "../components/Link";
import { PageTitle } from "../components/PageTitle"; 
import { RichText } from "../components/RichText"; 
import { getStyles, Theme, getContent, getData } from '../utils';
import { ResponsiveImage } from "../components/ResponsiveImage"; 
import TeamListSection from './TeamListSection';


function Page(props) {

    const [{ view, isWeb, dimensions }, dispatch] = useStateValue();
    const styles = StyleSheet.create(getStyles('text_header2, text_header3, text_header4, section, content, tagline', {isWeb}));
    console.log('page props', props)

    const [ pageLoading, setPageLoading ] = useState(props.content ? false: true);
    const [ content, setContent ] = useState(props.content || {});

    const [ loadingStaff, setLoadingStaff] = useState(!props.staff);
    const [ errorStaff, setErrorStaff ] = useState('');
    const [ staff, setStaff ] = useState(props.staff || []);

    if (!props.content) {
        useEffect(() => {
            getContent({type: 'content', uid: 'staff'}).then(_content => {
                console.log('_content', _content)
                setContent(_content.content)
                setPageLoading(false);
            }).catch(err => {
                console.error(err);
            });
        }, [])
    }

    useEffect( () => {
        if (!props.staff) {
            getData({
                type: 'staff'
            }).then(staff => {
                console.log('staff izz', staff)
                setLoadingStaff(false);
                setStaff(staff)
            }).catch(err => {
                console.error(err);
                setLoadingStaff(false);
                setErrorStaff('Failed to load team members.');
            })
        }
    }, [])


   
    return (
        <React.Fragment>
        { pageLoading ?
            <View style={{marginTop: 200, marginBottom: 200}}>
                <ActivityIndicator color={Theme.green} size="large" />
            </View>
        : (
            <React.Fragment>
                <PageTitle title={content.page_title} />
                <View style={styles.tagline}>
                    <View style={styles.content}>
                        <RichText render={content._body} isWeb={isWeb} />
                    </View>
                </View>
                <View style={styles.section}>
                    <View style={[styles.content]}>
                        {loadingStaff ? (
                            <ActivityIndicator color={Theme.green} size="large" />
                        ) : errorStaff ? (
                            <Text>{errorStaff}</Text>
                        ) : (
                            staff.map((item, index) => <TeamListSection key={ 'update' + index } item={item} reverse={index % 2 === 0 ? true : false } />)
                            
                            // <FlatList
                            //     data={staff}
                            //     ItemSeparatorComponent={highlighted => <View style={{paddingTop: isWeb ? 120 : 80}}></View>}
                            //     renderItem={({ item, index, separators }) => (
                            //         <TeamListSection sKey={ 'update' + index } item={item} reverse={index % 2 === 0 ? true : false } />
                            //         // // Body start here
                            //         // <View style={{
                            //         //     display: 'flex', 
                            //         //     flexDirection: 'row', 
                            //         // }} key={'update' + index}>
                            //         //     <View style={{flex: 1, height: 400 }}>
                            //         //         <ResponsiveImage style={{width: item.image.width, height: item.image.height, aspectRatio: 1}} source={{uri: item.image.url + '&w=800'}} />
                            //         //     </View>

                            //         //     <View style={{flex: 3, paddingLeft: 20}}>
                                            
                            //         //         <Text style={styles.text_header3}>{item.title}</Text>
                            //         //         <Text style={styles.text_header4}>{item.name}</Text>
                            //         //         <RichText render={item._description} isWeb={isWeb} />
                            //         //         { staff.links && staff.links.length && staff.links[0].link && staff.links.map(link => (
                            //         //             <View>
                            //         //                 <Text><b>{link.link_name}</b>: {link.link_description}</Text>
                            //         //                 <Link href={link.link}>{link.link}</Link>
                            //         //             </View>
                            //         //           ))
                            //         //         }
                            //         //     </View>

                            //         // </View>
                            //     )}
                            //     keyExtractor={(item, index) => 'update' + index}
                            // />
                        )}
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