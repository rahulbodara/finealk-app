import React from 'react';
import {View, Image, ImageBackground} from 'react-native';
import {styles} from './styles';

export const Slide = props => {
  const {image, imageBackground} = props;
  return (
    <View style={styles.slide}>
      <ImageBackground
        source={imageBackground}
        style={{...styles.slideBackground}}>
        <Image style={{...styles.slideText}} source={image}></Image>
      </ImageBackground>
    </View>
  );
};

export default Slide;
