import { Platform, Dimensions } from 'react-native';

export const StateReducer = (state, action) => {
  console.log('state', state, 'action', action)
  switch (action.type) {
    case 'setView':
      console.log('set view called', action)
      return {
        ...state,
        view: action.view
      };
    case 'fontsReady':
      return {
        ...state,
        fontsReady: action.value
      };
    case 'setDimensions':
      return {
        ...state,
        dimensions: action.value
      };
    case 'setTheme':
      return {
        ...state,
        theme: action.value
      };
    case 'menuOpen':
      return {
        ...state,
        menuOpen: action.value
      };
    case 'searchConfig':
      return {
        ...state,
        searchConfig: action.value
      };
    case 'lightbox':
      return {
        ...state,
        lightbox: action.value
      };
    case 'lightboxConfig':
      return {
        ...state,
        lightboxConfig: action.value
      };
      
    default:
      return state;
  }
}

export const InitialState = (props) => {
  const isWeb = Platform.OS === 'web';
  let url = '';
  let get_vew = '/';
  let theme = 'light';

  let searchConfig = {
    q: '',
    near: ''
  }
  if (isWeb && typeof window !== "undefined") {
      let params = (window.location.search || "")
          .substr(1)
          .split("&")
          .forEach((pair) => {
              var spl = pair.split("=");
              if (spl[0] && spl[1]) {
                  searchConfig[decodeURIComponent(spl[0])] = decodeURIComponent(spl[1]);
              }
          });
  }

  if (isWeb && typeof window !== 'undefined') {
      url = window.location.href;
      if (window.location.pathname.length > 1) {
        if (window.location.pathname.split('?')[0]) {
          get_vew = window.location.pathname.split('?')[0];
        }
      }
  }

  if (get_vew && get_vew.length > 1 && get_vew != '/' && get_vew != '') {
    theme = 'light'
  } else {
    theme = 'dark'
  }

  return {
    view: get_vew,
    isWeb: isWeb,
    theme: theme,
    url: url,
    fontsReady: false,
    searchConfig: searchConfig,
    dimensions: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("screen").height
    }
  };
  

}