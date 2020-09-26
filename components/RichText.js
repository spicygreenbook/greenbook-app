export default function RichText(props) {
    let content = props.render;

    function part(part, key, ar) {

        let html = '';
        if (part.spans) {
            let chars = part.text.split('');
            part.spans.forEach(span => {
                var injectStart = '';
                var injectEnd = '';
                if (span.data.type === 'Link.web') {
                    let external = span.data.value.url.indexOf('http') === 0 ? true : false
                    injectStart = '<a href="' + (span.data.value.url || '') + '" target="' + (external ? '_blank' : '') + ' ">';
                    injectEnd = '</a>';
                }
                chars.splice(span.start, 0, injectStart)
                chars.splice(span.end + 1, 0, injectEnd)
            })
            html = chars.join('');
        }

        if (part.type === 'heading1') {
            return (<h1 key={key}>{part.text}</h1>)
        } else if (part.type === 'heading2') {
            return (<h2 key={key}>{part.text}</h2>)
        } else if (part.type === 'heading3') {
            return (<h3 key={key}>{part.text}</h3>)
        } else if (part.type === 'heading4') {
            return (<h4 key={key}>{part.text}</h4>)
        } else if (part.type === 'heading5') {
            return (<h5 key={key}>{part.text}</h5>)
        } else if (part.type === 'heading6') {
            return (<h6 key={key}>{part.text}</h6>)
        } else if (part.type === 'paragraph' && html) {
            return (<p key={key} dangerouslySetInnerHTML={{__html: html}}/>)
        } else if (part.type === 'paragraph') {
            return (<p key={key}>{part.text}</p>)
        }
        return ('<span></span>')
    }
    let use = content;
    if (Array.isArray(content.value)){
        use = content.value;
    }
    return (<div>{use && use.map(part)}</div>)
}
 