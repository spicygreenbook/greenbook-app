import React from 'react';
import { default as NextLink } from "next/link";
import { useStateValue } from "../components/State";
import { TouchableOpacity, Linking } from 'react-native';

export const Link = ({href = '', as = '', children, ...props}) => {
    const [{ isWeb }] = useStateValue();
    let webProps = isWeb && props.download ? {download: props.download} : {};
    let more = props.fill ? {height: '100%'} : 
               props.contain ? isWeb ? { width: 'fit-content' } : { alignSelf: 'flex-start'} : {}
    const external = href.slice(0,1) !== '/';

    const handlePress = () => {
        Linking.openURL(href);
        return;
    }

    return isWeb 
        ? <NextLink href={href} as={as} prefetch={false}>
                <a target={external && '_blank'} {...webProps} style={{ textDecoration: 'none', ...more}}>
                    {children}
                </a>
           </NextLink>
        : <TouchableOpacity style={more} onPress={handlePress} {...props}>
            {children}
          </TouchableOpacity>
        
};

export function Click(url, config) {
    const [{ view, isWeb }, dispatch] = useStateValue();
    if (isWeb) {
        window.location = url;
    } else {
        dispatch({type: 'setView', view: url || ''})
    }
    return
}