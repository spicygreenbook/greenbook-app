import { Platform } from 'react-native';

export const setState = () => {
    let state = {}
    globals.url = '/';
    console.log('platform', Platform.OS)
}

export const getState = () => {
    let state = {}
    globals.url = '/';
    console.log('platform', Platform.OS)
}