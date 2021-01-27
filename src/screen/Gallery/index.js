import React, {useState} from 'react';
import {View, Image, TouchableOpacity, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Header from '../../components/Header/Header';
import Style from '../../Style/Style';
import TopHeader from '../../components/TopHeader/TopHeader';
import ImageView from 'react-native-image-view';
const DATA = [
  {
    source: {
      uri:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRSInVXq67T9zi_Cn6ZxTEvz5YOAAi1rnsFDv34Mr94x96tuA09&usqp=CAU',
    },
  },
  {
    source: {
      uri:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRK2QLRAMCEHTqyULV43snfdjABN2NS-_O5Ta-BLs452MRl4pWj&usqp=CAU',
    },
  },
];

export default function Gallery(props) {
  const [imageIndex, setImageIndex] = useState(0);
  const [isImageViewVisible, setImageVisible] = useState(false);
  console.log('images', DATA);
  return (
    <View style={Style.topcontainer}>
      <TopHeader />
      <Header name={'GALLERY'} {...props} />
      <KeyboardAwareScrollView>
        {DATA.map((image, index) => (
          <TouchableOpacity
            onPress={() => {
              setImageIndex(index);
              setImageVisible(true);
            }}>
            <Image
              style={{width, height: 200}}
              source={image.source}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
        <ImageView
          glideAlways
          images={DATA}
          imageIndex={imageIndex}
          animationType="fade"
          isVisible={isImageViewVisible}
          onClose={() => setImageVisible(false)}
          onImageChange={index => {
            console.log(index);
          }}
        />
      </KeyboardAwareScrollView>
    </View>
  );
}
