import React from 'react';
import {View, Image, Text, TouchableOpacity, ScrollView} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Header from '../../components/Header/Header';
import Style from '../../Style/Style';
import Carousel from '../../components/Caurosel/Caurosel';
import TopHeader from '../../components/TopHeader/TopHeader';

export default function Home(props) {
  return (
    <View style={Style.topcontainer}>
      <TopHeader />
      <Header name={'HOME'} {...props} />
      <KeyboardAwareScrollView>
        <Carousel
          style="slide"
          items={[
            {
              image: require('../../../image/shop-details.png'),
              imageBackground: require('../../../image/ice-1.png'),
            },
            {
              image: require('../../../image/bottle-1.png'),
              imageBackground: require('../../../image/ice-1.png'),
            },
            {
              image: require('../../../image/shop-details.png'),
              imageBackground: require('../../../image/ice-1.png'),
            },
          ]}
        />
        <View style={Style.maincontainerhome}>
          <ScrollView horizontal={true}>
            <TouchableOpacity
              style={Style.mcontainer}
              onPress={() => props.navigation.navigate('Microcustering')}>
              <Text style={Style.hometextcontainer}>MICRO CUSTERING</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={Style.ancontainer}
              onPress={() => props.navigation.navigate('Antioxidation')}>
              <Text style={Style.hometextcontainer}>ANTI OXIDATION</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={Style.alcontainer}
              onPress={() => props.navigation.navigate('Alkalinization')}>
              <Text style={Style.hometextcontainer}>ALKALINIZATION</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <View style={Style.middlecontainer}>
          <Text style={Style.middletext}>A Trusted Name In</Text>
          <Text style={Style.middletext}>Bottled Water Industry</Text>
          <View style={Style.centercontainer}>
            <ScrollView horizontal={true}>
              <View style={Style.delivercontainer}>
                <Image
                  source={require('../../../image/water-barrel.png')}
                  style={Style.centerimagecontainer}
                />
                <Text style={Style.centertext}>Maximum Purity</Text>
                <Text style={Style.waterindustrydesc}>
                  Exercitation ullamco laboris nisl aliquip duis aute irure
                  dolor inyrep henderit voluptate velit.
                </Text>
              </View>
              <View style={Style.middlewave}>
                <Image source={require('../../../image/wave-icon-3.png')} />
              </View>
              <View style={Style.delivercontainer}>
                <Image
                  source={require('../../../image/water-barrel.png')}
                  style={Style.centerimagecontainer}
                />
                <Text style={Style.centertext}>5 Steps Filtration</Text>
                <Text style={Style.waterindustrydesc}>
                  Exercitation ullamco laboris nisl aliquip duis aute irure
                  dolor inyrep henderit voluptate velit.
                </Text>
              </View>
              <View style={Style.middlewave}>
                <Image source={require('../../../image/wave-icon-3.png')} />
              </View>
              <View style={Style.delivercontainer}>
                <Image
                  source={require('../../../image/water-barrel.png')}
                  style={Style.centerimagecontainer}
                />
                <Text style={Style.centertext}>Cholorine Freey</Text>
                <Text style={Style.waterindustrydesc}>
                  Exercitation ullamco laboris nisl aliquip duis aute irure
                  dolor inyrep henderit voluptate velit.
                </Text>
              </View>
              <View style={Style.middlewave}>
                <Image source={require('../../../image/wave-icon-3.png')} />
              </View>
              <View style={Style.delivercontainer}>
                <Image
                  source={require('../../../image/water-barrel.png')}
                  style={Style.centerimagecontainer}
                />
                <Text style={Style.centertext}>Quality Certified</Text>
                <Text style={Style.waterindustrydesc}>
                  Exercitation ullamco laboris nisl aliquip duis aute irure
                  dolor inyrep henderit voluptate velit.
                </Text>
              </View>
            </ScrollView>
          </View>
        </View>

        <View>
          <View style={Style.middletextview}>
            <View style={Style.middleview}>
              <Text style={Style.bottles}>Bottles We Deliver</Text>
              <View style={Style.line} />
              <Text style={Style.bottlescontainer}>
                It's simple and easy. Enjoy great-tasting bottled water
                delivered directly to your home or workplace with Finealk Food &
                Beverage Services.
              </Text>
            </View>
          </View>
          <ScrollView horizontal={true}>
            <View style={Style.image3container}>
              <Image
                source={require('../../../image/shop-3.png')}
                style={Style.image3view}
              />
              <Text style={Style.image3text}>20 L Bottle</Text>
              <Text style={Style.image3de}>
                {' '}
                Alkalinie Ionized Water 8.5 PH{' '}
              </Text>
              <Text style={Style.descriptioncard}>
                {' '}
                Exercitation lamco laboris aliquip duis aute irure dolor rep...
              </Text>
              <View style={Style.priceviewcontainer}>
                <Text style={Style.fprice}>$39.00</Text>
                <Text style={Style.lprice}>$29.50</Text>
              </View>
            </View>
            <View style={Style.image3container}>
              <Image
                source={require('../../../image/shop-1.png')}
                style={Style.image3view}
              />
              <Text style={Style.image3text}>1 L Bottle</Text>
              <Text style={Style.image3de}>Strong Acidic Water 2.5 PH</Text>
              <Text style={Style.descriptioncard}>
                {' '}
                Exercitation lamco laboris aliquip duis aute irure dolor rep...
              </Text>
              <View style={Style.priceviewcontainer}>
                <Text style={Style.fprice}>$17.00</Text>
                <Text style={Style.lprice}>$29.50</Text>
              </View>
            </View>
            <View style={Style.image3container}>
              <Image
                source={require('../../../image/shop-2.png')}
                style={Style.image3view}
              />
              <Text style={Style.image3text}>1 L Bottle</Text>
              <Text style={Style.image3de}>
                {' '}
                Alkalinie Ionized Water 8.5 PH{' '}
              </Text>
              <Text style={Style.descriptioncard}>
                {' '}
                Exercitation lamco laboris aliquip duis aute irure dolor rep...
              </Text>
              <View style={Style.priceviewcontainer}>
                <Text style={Style.fprice}>$24.00</Text>
                <Text style={Style.lprice}>$29.50</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
