/*import React, { useState, Component } from 'react';
import { Platform } from 'react-native';

export default function State() {
        const isWeb = Platform.OS === 'web';
        let get_vew = '/';
        let url = '';
        if (isWeb && typeof window !== 'undefined') {
            url = window.location.href;
            if (window.location.pathname.length > 1) {
                get_vew = window.location.pathname.split('?')[0]
            }
        }
            console.log('platform', Platform.OS, typeof Platform.OS, 'url', url)
          const [ view, setView ] = useState(get_vew);
          const globalProps = {
            view: view,
            setView: (view) => {
                alert('change view to ' + view)
                setView(view)
            },
            isWeb: isWeb
          }
        return <Component {...props} {...globalProps} />
    };
}
*/

import React, {createContext, useContext, useReducer} from 'react';

export const StateContext = createContext();

export const StateProvider = ({reducer, initialState, children}) =>(
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);
export const useStateValue = () => useContext(StateContext);