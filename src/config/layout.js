import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const scale = Dimensions.get('window').scale;

export default {
  inset: 10,
  width,
  height,
  scale,
  isSmallDevice: width < 375,
};
