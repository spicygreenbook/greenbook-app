import { Dimensions } from 'react-native';

const allStyles = {
    nav: function(config) {
        return {
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            height: config.isWeb ? 120 : 160,
            paddingTop: config.isWeb ? 0 : 40,
            flex: 1,
            flexDirection: 'row',
            zIndex: 2,
            elevation: 2
            //backgroundColor: '#000'
        }
    },
    body: function(config) {
        return {
            zIndex: 1,
            elevation: 1,
            marginTop: config.isWeb ? 0 : 40
        }
    },
    image_fill: function(config) {
        return {
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            right: 0,
            resizeMode: 'cover'
        }
    },
    text_hero: function(config) {
        return {
            textAlign: 'left',
            fontFamily: 'KnockoutBold',
            fontSize: config.windowWidth < 900 ? 48 : 82,
            lineHeight: config.windowWidth < 900 ? 50 : 98,
            textTransform: 'uppercase',
            color: '#fff'
        }
    },
    text_nav: function(config) {
        return {
            fontFamily: 'ApercuMedium',
            fontSize: 12,
            color: '#fff'
        }
    },
    middle_all: function(config) {
        return {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }
    }
}

export function getStyles(key, config) {
    let ret = {};

    config.windowWidth = Dimensions.get('window').width;

    key.split(',').forEach(style_key => {
        style_key = (style_key || '').trim()
        ret[style_key] = {};
        if (allStyles[style_key]) {
            ret[style_key] = allStyles[style_key](config);
        } else {
            console.error('those styles were not found', style_key)
        }
    })
    return ret;
}

export const Theme = {
    green: '#006233',
    green_bg: '#006633'
}

export const GridWidth = (config) => {
    if (!config.containerWidth){ config.containerWidth = Dimensions.get('window').width };
    if (config.minWidth) {
        let fits = Math.floor(config.containerWidth / config.minWidth);
        console.log('fits', fits)
        return (1 / fits) * 100
    } else {
        return 100
    }
}