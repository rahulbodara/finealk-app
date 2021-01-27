import React from 'react';
import {View, StatusBar} from 'react-native';
import lightColors from '../config/colors';

export default function TopHeader(props) {
  return (
    <View>
      <StatusBar
        barStyle="light-content"
        backgroundColor={lightColors.headercolor}
      />
    </View>
  );
}
