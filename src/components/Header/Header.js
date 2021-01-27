import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import lightColors from '../config/colors';
import sizes from '../config/sizes';
export default function Header(props) {
  return (
    <SafeAreaView style={{}}>
      <View style={styles.container}>
        <View style={{width: 50, flexDirection: 'row'}}>
          {props.isBack ? (
            <TouchableOpacity
              onPress={() => props.navigation.goBack()}
              style={{width: 70, paddingHorizontal: 10}}>
              <Ionicons name="ios-arrow-round-back" size={40} color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => props.navigation.openDrawer()}
              style={{width: 50, paddingHorizontal: 10}}>
              <Entypo name="menu" size={32} color="white" />
            </TouchableOpacity>
          )}
        </View>
        <View style={{alignItems: 'center', flex: 1}}>
          <Text style={styles.txt}>{props.name}</Text>
        </View>
        <View style={{width: 50}} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: lightColors.headercolor,
  },
  icon: {height: 20, width: 20, resizeMode: 'contain', marginHorizontal: 10},
  txt: {
    fontSize: sizes.h7,
    color: lightColors.colors.white,
  },
});
