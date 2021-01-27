import {StyleSheet, Dimensions} from 'react-native';
const window = Dimensions.get('window');

export const styles = StyleSheet.create({
  slide: {
    flexDirection: 'row',
  },
  slideText: {
    resizeMode: 'contain',
    marginTop: window.height * 0.1,
    width: window.width * 1,
    height: window.height * 0.4,
  },

  slideBackground: {},
});

export default styles;
