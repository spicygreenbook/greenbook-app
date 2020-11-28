import { Dimensions, Platform } from 'react-native';

const theme = {
    green: '#006233',
    green_bg: '#006633'
}

const allStyles = {
  nav: function (config) {
    let ret = {
      left: 0,
      top: 0,
      right: 0,
      height: config.isWeb ? 120 : 160,
      paddingTop: config.isWeb ? 0 : 40,
      flex: 1,
      flexDirection: "row",
      zIndex: 2,
      elevation: 2,
      //backgroundColor: '#000'
    };
    if (config.isWeb) {
      ret.position = "fixed";
    } else {
      ret.position = "absolute";
    }
    return ret;
  },
  footer: function (config) {
    return {
      zIndex: 2,
      elevation: 2,
      backgroundColor: theme.green_bg,
    };
  },
  body: function (config) {
    return {
      zIndex: 1,
      elevation: 1,
      marginTop: config.isWeb ? 0 : 40,
    };
  },
  tagline: function (config) {
    return {
      ...this.section(config),
      paddingTop: 48,
      paddingBottom: 48,
    };
  },
  section: function (config) {
    return {
      padding: 20,
      paddingTop: config.isWeb ? 48 : 0,
      paddingBottom: 80,
      alignContent: "center",
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "center",
    };
  },
  content: function (config) {
    return {
      maxWidth: "100%",
      width: 1024,
    };
  },
  image_fill: function (config) {
    return {
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      right: 0,
      resizeMode: "cover",
    };
  },
  text_hero: function (config) {
    return {
      textAlign: "left",
      fontFamily: "KnockoutBold",
      fontSize: config.windowWidth < 900 ? 48 : 82,
      lineHeight: config.windowWidth < 900 ? 50 : 98,
      textTransform: "uppercase",
      color: "#fff",
    };
  },
  text_nav: function (config) {
    return {
      fontFamily: "ApercuMedium",
      fontSize: 18,
      textTransform: "uppercase",
      color: config.theme === "light" ? theme.green : "#fff",
    };
  },
  text_nav_sub: function (config) {
    return {
      fontFamily: "ApercuMedium",
      fontSize: 16,
      textTransform: "uppercase",
      color: theme.green,
    };
  },
  text_footer: function (config) {
    return {
      fontFamily: "ApercuMedium",
      fontSize: config.windowWidth < 600 ? 12 : 18,
      textTransform: "uppercase",
      color: "#fff",
    };
  },
  text_header: function (config) {
    return {
      fontFamily: "KnockoutBold",
      fontSize: config.windowWidth < 900 ? 45 : 75,
      lineHeight: config.windowWidth < 900 ? 46 : 90,
      textTransform: "uppercase",
      color: "#006233",
    };
  },
  text_header2: function (config) {
    return {
      fontFamily: "KnockoutBold",
      fontSize: config.windowWidth < 900 ? 40 : 75,
      lineHeight: config.windowWidth < 900 ? 42 : 66,
      textTransform: "uppercase",
      color: "#006233",
    };
  },
  text_header3: function (config) {
    return {
      fontFamily: "KnockoutFeatherWeight",
      fontSize: config.windowWidth < 900 ? 38 : 45,
      lineHeight: config.windowWidth < 900 ? 38 : 66,
      textTransform: "uppercase",
      color: "#006233",
    };
  },
  text_header4: function (config) {
    return {
      fontFamily: "KnockoutWelterWeight",
      fontSize: config.windowWidth < 900 ? 16 : 24,
      lineHeight: config.windowWidth < 900 ? 20 : 29,
      textTransform: "uppercase",
      color: "#006233",
    };
  },
  text_header5: function (config) {
    return {
      fontFamily: "KnockoutWelterWeight",
      fontSize: config.windowWidth < 900 ? 20 : 24,
      lineHeight: config.windowWidth < 900 ? 28 : 32,
      textTransform: "uppercase",
      color: "#000",
    };
  },
  text_header6: function (config) {
    return {
      fontFamily: "ApercuMedium",
      fontSize: config.windowWidth < 900 ? 20 : 24,
      lineHeight: config.windowWidth < 900 ? 28 : 32,
      color: "#000",
    };
  },
  text_body: function (config) {
    return {
      fontFamily: "ApercuMedium",
      fontSize: config.windowWidth < 900 ? 20 : 24,
      lineHeight: config.windowWidth < 900 ? 20 : 32,
      color: "#606060",
    };
  },
  text_body2: function (config) {
    return {
      fontFamily: "ApercuMedium",
      fontSize: config.windowWidth < 900 ? 16 : 22,
      lineHeight: config.windowWidth < 900 ? 20 : 28,
      color: "#606060",
    };
  },
  text_body3: function (config) {
    return {
      fontFamily: "ApercuMedium",
      fontSize: 16,
      //color: '#006233'
    };
  },
  text_link: function (config) {
    return {
      fontFamily: "ApercuMedium",
      fontSize: config.windowWidth < 900 ? 15 : 32,
      lineHeight: config.windowWidth < 900 ? 20 : 42,
      color: "#006233",
    };
  },
  text_quote: function (config) {
    return {
      fontFamily: "ApercuLight",
      fontStyle: "italic",
      fontSize: 28,
      lineHeight: 45,
      color: "#006233",
    };
  },
  middle_all: function (config) {
    return {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    };
  },
  button_white: function (config) {
    return {
      borderWidth: 1,
      borderColor: "#fff",
      backgroundColor: "rgba(0,0,0,0)",
      alignItems: "center",
      height: 80,
      paddingLeft: 60,
      paddingRight: 60,
      flexDirection: "row",
    };
  },
  button_white_text: function (config) {
    return {
      textTransform: "uppercase",
      fontFamily: "ApercuMedium",
      fontSize: 16,
      lineHeight: 15,
      color: "#fff",
    };
  },
  button_green: function (config) {
    return {
      borderWidth: 1,
      borderColor: theme.green,
      backgroundColor: theme.green_bg,
      alignItems: "center",
      height: 60,
      paddingLeft: 30,
      paddingRight: 30,
      flexDirection: "row",
    };
  },
  button_green_text: function (config) {
    return {
      textTransform: "uppercase",
      fontFamily: "ApercuMedium",
      fontSize: 16,
      lineHeight: 15,
      color: "#fff",
    };
  },
  button_link: function (config) {
    return {};
  },
  button_link_text: function (config) {
    return {
      fontFamily: "ApercuMedium",
      fontSize: 12,
      lineHeight: 15,
      color: Theme.green,
    };
  },
  text_menu: function (config) {
    return {
      textTransform: "capitalize",
      fontFamily: "ApercuMedium",
      fontSize: 24,
      lineHeight: 29,
      color: "#fff",
    };
  },
};

export function getStyles(key, config = { isWeb: Platform.OS === 'web' }) {
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

export const Theme = theme;

export const sizeConfig = (config) => {
    if (!config.containerWidth){ config.containerWidth = Dimensions.get('window').width };
}

export const responsiveImageWidthCDN = (config) => {
    if (!config.containerWidth){ config.containerWidth = Dimensions.get('window').width };
    return Math.ceil(config.containerWidth/100) * 100
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