const allStyles = {
    nav: function(config) {
        return {
            marginTop: config.isWeb ? 0 : 100,
            flex: 1,
            flexDirection: 'row',
            backgroundColor: '#000'
        }
    }
}

export function getStyles(key, config) {
    let ret = {};
    key.split(',').forEach(style_key => {
        ret[style_key] = {};
        if (allStyles[key]) {
            ret[style_key] = allStyles[key](config);
        } else {
            console.error('those styles were not found')
        }
    })
    return ret;
}