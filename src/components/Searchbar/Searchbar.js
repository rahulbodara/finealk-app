import React from 'react';
import {View, TextInput, TouchableOpacity, Animated} from 'react-native';
import styles from '../Searchbar/style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Searchbar = props => {
  let {value, onChangeText, onFilter, haveFilter} = props;

  return (
    <Animated.View style={[styles.container, {backgroundColor: 'white'}]}>
      <Icon name="magnify" size={20} color="#333" />
      <TextInput
        placeholder="Search"
        placeholderTextColor="#333"
        style={[styles.input, {color: '#333'}]}
        underlineColorAndroid="transparent"
        value={value}
        onChangeText={onChangeText}
      />
    </Animated.View>
  );
};

export default Searchbar;
