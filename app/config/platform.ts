import {Platform} from 'react-native';

const isIOS = Platform.OS === 'ios';
const isAndroid = Platform.OS === 'android';
const devicePlatform = isIOS ? 'ios' : 'android';

export {isIOS, isAndroid, devicePlatform};
