import { Platform } from 'react-native';

// import Web from './pages'
import Web from './pages';
import Rootnavigator from './navigations/RootNavigator';

export default Platform.OS === 'web' ? Web : Rootnavigator;