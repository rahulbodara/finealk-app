import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import sizes from '../config/sizes';

const ButtonElement = props => {
  return (
    <View>
      <TouchableOpacity onPress={props.onPress}>
        <View>
          <Text style={styles.TextButton}>{props.title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  TextButton: {
    fontSize: sizes.h5,
    color: '#fff',
    marginVertical: 13,
    alignSelf: 'center',
  },
});

export default ButtonElement;
