import React from 'react';
import { WebView } from 'react-native-webview';
import { useStateValue } from "../components/State";
import { getStyles, Theme } from '../utils';
import { View, Text, StyleSheet} from 'react-native';

function renderHTML(markup, spans) {
    let parts = {0: ''};
    let segment = 0;
    let i = 0;
    let spans_start = {};
    let spans_end = {};
    let segment_map = {0: 'text'};
    spans.forEach(span => {
        spans_start[span.start] = span
        spans_end[span.end] = span
    })
    for( i=0; i < markup.length; i++ ){
        if (spans_start[i]) {
            segment++;
            parts[segment] = '';
            segment_map[segment] = spans_start[i].type
        } else if (spans_end[i]) {
            segment++;
            parts[segment] = '';
            segment_map[segment] = 'text'
        }
        parts[segment] += '' + (markup[i] || '');
    }
    console.log(parts, segment_map);
    return Object.keys(parts).map((part, i) => (
        <Text key={'subpart' + i} style={
            segment_map[i] === 'strong' ? {fontWeight: 'bold'}
            :
            {}
        }>{parts[part] || ''}</Text>))
}

export function RichText(props) {
    let content = props.render;

    const [{ view, isWeb, dimensions }, dispatch] = useStateValue();
    const styles = StyleSheet.create(getStyles('text_header3, text_header4, text_body, section, content', {isWeb}));

    function part(part, key, ar) {

        if (part.type === 'heading1') {
            return (<Text key={key} accessibilityRole="header" aria-level="2" style={styles.text_header3}>{part.text}</Text>)
        } else if (part.type === 'heading2') {
            return (<Text key={key} accessibilityRole="header" aria-level="2" style={styles.text_header3}>{part.text}</Text>)
        } else if (part.type === 'heading3') {
            return (<Text key={key} accessibilityRole="header" aria-level="3" style={styles.text_header4}>{part.text}</Text>)
        } else if (part.type === 'heading4') {
            return (<Text key={key} accessibilityRole="header" aria-level="4" style={styles.text_header4}>{part.text}</Text>)
        } else if (part.type === 'heading5') {
            return (<Text key={key} accessibilityRole="header" aria-level="4" style={styles.text_header4}>{part.text}</Text>)
        } else if (part.type === 'heading6') {
            return (<Text key={key} accessibilityRole="header" aria-level="4" style={styles.text_header4}>{part.text}</Text>)
        } else if (part.type === 'paragraph') {
            return (<Text key={key} style={[styles.text_body, {marginTop: 10, marginBottom: 10}]}>
                {renderHTML(part.text, part.spans)}
            </Text>)
        } else if (part.type === 'list-item') {
            return (<Text key={key} style={[styles.text_body, {marginTop: 10, marginBottom: 10}]}>
                <Text style={[styles.text_body]}>• </Text>
                {renderHTML(part.text, part.spans)}
            </Text>)
        } else if(part.text) {
            return (<Text key={key} style={styles.text_body}>{part.text}</Text>)
        } else {
            console.log('unhandled p[art', part);
            return <Text key={key} />
        }
        
    }
    let use = content;
    if (content && Array.isArray(content.value)){
        use = content.value;
    }
    return (<React.Fragment>{use && use.map(part)}</React.Fragment>)
}
 