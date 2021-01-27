import {StyleSheet, Platform, Dimensions} from 'react-native';
import sizes from '../config/sizes';
import {margin, borderRadius} from '../config/spacing';
import lightColors from '../config/colors';
let heightRatio = Dimensions.get('window').height;
let widthRatio = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 5,
    marginTop: heightRatio * 0.03,
    paddingRight: 10,
    paddingLeft: 10,
    borderRadius: borderRadius.ssmall,
    backgroundColor: lightColors.white,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.3)',
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: {
          height: 1,
          width: 1,
        },
      },
      android: {
        elevation: 2,
      },
    }),
  },
  input: {
    flex: 1,
    height: heightRatio * 0.03,
    fontSize: sizes.base,
    padding: 0,
    marginLeft: widthRatio * 0.05,
    margin: margin.small,
  },

  separator: {
    width: widthRatio * 0.001,
    height: heightRatio * 0.05,
    backgroundColor: '#ccc',
  },
});
