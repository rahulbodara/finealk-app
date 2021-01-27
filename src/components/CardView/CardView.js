import React from 'react';
import {View, StyleSheet} from 'react-native';
import lightColors from '../config/colors';

const CardView = props => {
  return <View style={[styles.cardStyle, props.style]}>{props.children}</View>;
};

const styles = StyleSheet.create({
  cardStyle: {
    shadowOffset: {
      width: 0,
      height: 0,
    },
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginTop: 10,
    backgroundColor: lightColors.white,
  },
});
export {CardView};
