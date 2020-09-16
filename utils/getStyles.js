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
    section: function(config) {
        return {
            padding: 20,
            paddingTop: 80,
            paddingBottom: 80,
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
    text_header: function(config) {
        return {
            fontFamily: 'KnockoutBold',
            fontSize: config.windowWidth < 900 ? 22 : 75,
            lineHeight: config.windowWidth < 900 ? 26 : 90,
            color: '#006233'
        }
    },
    text_header2: function(config) {
        return {
            fontFamily: 'KnockoutBold',
            fontSize: config.windowWidth < 900 ? 40 : 75,
            lineHeight: config.windowWidth < 900 ? 42 : 66,
            color: '#006233'
        }
    },
    text_header3: function(config) {
        return {
            fontFamily: 'KnockoutBold',
            fontSize: config.windowWidth < 900 ? 22 : 55,
            lineHeight: config.windowWidth < 900 ? 26 : 66,
            color: '#006233'
        }
    },
    text_body: function(config) {
        return {
            fontFamily: 'ApercuMedium',
            fontSize: config.windowWidth < 900 ? 18 : 28,
            lineHeight: config.windowWidth < 900 ? 22 : 36,
            color: '#006233'
        }
    },
    middle_all: function(config) {
        return {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }
    },
    button_white: function(config) {
        return {
            borderWidth: 1,
            borderColor: '#fff',
            backgroundColor: 'rgba(0,0,0,0)',
            alignItems: 'center',
            height: 80,
            paddingLeft: 60,
            paddingRight: 60,
            flexDirection: 'row'
        }
    },
    button_white_text: function(config) {
        return {
            textTransform: 'uppercase',
            fontFamily: 'ApercuMedium',
            fontSize: 12,
            lineHeight: 15,
            color: '#fff'
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
        if (fits < 1) { fits = 1; }

        //console.log('fits', fits)
        return ((1 / fits) * 100) + '%'
    } else {
        return 100
    }
}