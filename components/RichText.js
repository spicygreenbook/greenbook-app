import React from 'react';
import { useStateValue } from "../components/State";
import { getStyles, Theme } from '../utils';
import { View, Text, StyleSheet, Button, Image, Linking} from 'react-native';
import { ResponsiveImage } from '../components/ResponsiveImage';
import { Link } from "../components/Link"; 
import { Entypo } from '@expo/vector-icons'; 


function renderHTML(markup, spans, body_style, isWeb, dispatch) {
    let parts = {0: ''};
    let segment = 0;
    let i = 0;
    let spans_start = {};
    let spans_end = {};
    let segment_map = {0: {type: 'text'}};
    spans.forEach(span => {
        spans_start[span.start] = span
        spans_end[span.end] = span
    })
    for( i=0; i < markup.length; i++ ){
        if (spans_start[i]) {
            segment++;
            parts[segment] = '';
            segment_map[segment] = spans_start[i]
        } else if (spans_end[i]) {
            segment++;
            parts[segment] = '';
            segment_map[segment] = {type: 'text'}
        }
        parts[segment] += '' + (markup[i] || '');
    }

    // special logic if a link is on it's own line it should be a button, otherwise it should look like a regular hyperlink within a paragraph of text
    return Object.keys(parts).map((part, i, partsAr) => {
        //console.log(parts[part], segment_map[i], 'parts length', partsAr, 'segments', segment_map[i].start);
        let button = false;
        if (partsAr.length <= 2 && segment_map[i].start === 0) {
            button = true;
        }
        let url = '';
        if (segment_map[i].type === 'hyperlink') {
            url = (segment_map[i].data.value.url || '');
            if (segment_map[i].data.value && segment_map[i].data.value.file) {
                url = segment_map[i].data.value.file.url
            }
        }
        button = false; // strange issues on mobile with this becaues its trying to go within a <Text> componenet

        //console.log('partspart', 'is button', button, parts[part], segment_map[i], url);
        return segment_map[i].type === 'hyperlink' && button ? (
            <React.Fragment>
                {isWeb ? <Link key={i} href={url} ><Button color={Theme.green} title={parts[part] || ''} /></Link> : <View><Button color={Theme.green} title={parts[part] || ' '} onPress={e=>{Linking.openURL(url)}} /></View>}
            </React.Fragment>
        ) : segment_map[i].type === 'hyperlink' ? (<Text key={'subpart' + i} style={body_style} onPress={e => {
            //console.log('link to', url)
            const external = url.slice(0,1) !== '/';

            if (!external) {
                dispatch({type: 'setView', view: url})
            } else {
                isWeb ? window.open(url, '_blank') : Linking.openURL(url)
            }
            }} style={[body_style, segment_map[i].type === 'strong' ? {fontWeight: 'bold', color: Theme.green} : {color: Theme.green}]}>{parts[part] || ''}</Text>
        ) : (<Text key={'subpart' + i} style={[body_style, segment_map[i].type === 'strong' ? {fontWeight: 'bold'}
            :
            {}
        ]}>
            {parts[part] || ''}
        </Text>)
    })
}

export function RichText(props) {
    let content = props.render;

    const [{ view, isWeb, dimensions }, dispatch] = useStateValue();
    const styles = StyleSheet.create(getStyles('text_header3, text_header4, text_header6, text_body, text_body2, section, content', {isWeb}));

    let body_style = props.markupStyle === 'fancy' ? styles.text_body2 : styles.text_body;
    let bullet_header = props.markupStyle === 'fancy' ? ['heading3'] : [];
    function header(part, key, ar) {
        let h_level = part.type.replace('heading', '') * 1;
        let aria_level = h_level <= 2 ? 2 : h_level <= 3 ? 3 : h_level >= 6 ? 6 : 4;
        let text_style = h_level <= 3 ? styles.text_header3 : h_level >= 6 ? styles.text_header6 : styles.text_header4;
        return bullet_header.indexOf(part.type) > -1 ? (
            <View key={key} style={{position: 'relative', marginBottom: 10}}>
                <Text accessibilityRole="header" aria-level={aria_level} style={[text_style, {marginTop: 40}]}>- {' '}{' '}{part.text}</Text>
                <View style={{position: 'absolute', left: 26, bottom: dimensions.width < 900 ? -10 : 0, width: 30, borderColor: Theme.green, borderBottomWidth: 2}} />
            </View>
        ) : (<Text key={key} accessibilityRole="header" aria-level={aria_level} style={[text_style, {marginTop: 40}]}>{part.text}</Text>)
    }

    function part(part, key, ar) {

        if (part.type.indexOf('heading') > -1 && part.text) {
            return header(part, key, ar)
        } else if (part.type === 'image') {
            return (<ResponsiveImage 
                cdn
                key={key}
                style={{width: part.dimensions.width, resizeMode: 'contain', aspectRatio: part.dimensions.height / part.dimensions.width}}
                alt={part.alt || ''}
                source={{uri:part.url}} />)
        } else if (part.type === 'paragraph') {
            return (<View key={key} style={{marginTop: 10, marginBottom: 10}}>
                <Text>
                    {renderHTML(part.text, part.spans, body_style, isWeb, dispatch)}
                </Text>
            </View>)
        } else if (part.type === 'list-item') {
            return (<Text key={key} style={[body_style, {marginTop: 10, marginBottom: 10}]}>
                {props.bullet === 'check' ? <Entypo name="check" size={24} color={Theme.green} style={{marginRight: 8}}/> : <Text style={[body_style]}>• </Text>}
                <Text>{renderHTML(part.text, part.spans, body_style, isWeb, dispatch)}</Text>
            </Text>)
        } else if(part.text) {
            return (<Text key={key} style={body_style}>{part.text}</Text>)
        } else {
            console.log('unhandled p[art', part);
            return (null);
            //return <Text key={key} />
        }
        
    }
    let use = content;
    if (content && Array.isArray(content.value)){
        use = content.value;
    }
    return (<React.Fragment>{!!use && use.map(part)}</React.Fragment>)
}
 