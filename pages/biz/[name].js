// @generated: @expo/next-adapter@2.1.0
import React, { useState, useEffect } from 'react';
//import { StyleSheet, Text, View, Platform } from 'react-native';
import { StateReducer, InitialState, getData, getContent } from '../../utils';

import {StateProvider} from "../../components/State";
import Main from "../../components/Main";
import Head from "next/head";


function App(props) {

    console.log('props', props)
    const { content } = props || {};

    const initialState = InitialState(props);

    return (
      <StateProvider initialState={initialState} reducer={StateReducer}>
        <Head>
            <title>{content.name} - Spicy Green Book</title>
            {content.description && 
                <meta
                name="description"
                content={content.description}
                key="description"
                />
            }
            {content.description && 
                <meta
                name="og:description"
                content={content.description}
                key="og:description"
                />
            }
            <meta property="og:title" content={content.name + " - Spicy Green Book"} key="og:title" />
            <meta
                name="og:image"
                content={'https://spicygreenbook.org/api/share/' + content.uid + '.png'}
                key="og:image"
            />
            <meta property="og:url" content={"https://spicygreenbook.org/biz/" + content.uid } key="og:url" />
        </Head>
        <Main {...props} />
      </StateProvider>
    );
}

async function getUpdatedData(params) {
    let config = {
        type: 'listing',
        uid: params.name
    };
    if (params.preview){
        config.ref_id = params.preview
    }
    let content = await getContent(config);
    //console.log('config', config, 'content', content.content)
    return {
        props: {
            content: content.content,
            url: '/biz/' + params.name
        }
    };
}

export async function getStaticPaths() {

    let listings = await getData({
      type: 'listing'
    });

    return {
        paths: listings.map((biz) => {
            //console.log('piz', biz)
            return {
                params: { name: biz.uid},
            };
        }),
        fallback: false,
    };
}

export async function getStaticProps({params}) {
    return getUpdatedData(params)
}

export default App;
