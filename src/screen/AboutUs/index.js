import React from 'react';
import {View, Text, Image} from 'react-native';
import Header from '../../components/Header/Header';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Style from '../../Style/Style';
import TopHeader from '../../components/TopHeader/TopHeader';
export default function Report(props) {
  return (
    <View style={Style.topcontainer}>
      <TopHeader />
      <Header name={'ABOUT US'} {...props} />
      <KeyboardAwareScrollView>
        <View style={Style.topcontainer}>
          <Text style={Style.abouttextcontainer}>A History of Innovation</Text>
          <View style={Style.descriptioncontainer}>
            <Text>
              Finelak Food & beverage is a water dispenser in india company that
              was established in 2020 to offer professional services in
              marketing alkaline ionize Drinking water, water dispenser,
              alkaline drinking water dispenser, and manufacturing of alkaline
              ionize water. The market requirement of alkaline ionize drinking
              water has increased four folds over the last 5 years. This
              increase can be attributed to changing consumer behavior towards a
              healthier lifestyle. With impurities and contaminant growing at an
              alarming rate in our water accessories, Finealk believes it could
              provide good products for the greater india consumers. Our
              organization does not only sell but also educate customers on the
              important of clean drinking water. As water is an essential
              commodity, Finealk drinking water with its management and
              personnel has a vision to improve our services through innovative
              approach in management and marketing. With these strategies in
              place, we unequivocally believe our vision of becoming the Finealk
              Food & beverage in india will be realized.
            </Text>
          </View>

          <View style={Style.directorview}>
            <Text style={Style.directorcontainer}>Director's</Text>
            <Text style={Style.directerdescription}>
              Drinking Alkaline water, it is said, offers more health benefits
              than one. It helps slow down the ageing process, regulate pH
              levels of the body and prevent various chronic diseases. Alkaline
              water refers to neutralising acid levels in the body, which normal
              water cannot do.
            </Text>
          </View>

          <View style={Style.directorprofile}>
            <View style={Style.imagecontainer}>
              <Image
                source={require('../../../image/dd.jpg')}
                style={{width: 100, height: 100}}
              />
            </View>
            <View>
              <Text style={Style.directorprofiledescritption}>
                Chronic and incurable diseases threatening lives, such as
                diabetes, high blood pressure and cancer were the main issues.
                Then, I entered the fields of , studying ‘Killing Cancer-Not
                Piple, written by Robert g Wright. he director American
                Anti-Cancer Insutitute The International Wellness & Reswrch
                Center. Dr. Otto Heinrich Warburg, Discovered the Cause of
                Cancer. ''Cancerous tissues are Acidic'' & ''Healthy tissues are
                Alkaline'‘ ‘’Cancer grows in Oxygen Deprived Acidic tissue’’ won
                Discovered the real cause of cancer in 1923 And received the
                Nobel Prize for Physiology in 1931. . In the process, I realized
                the importance of water and pursued the fields of water science
                for 2 years. There were ceaseless efforts and passion to come to
                the top my profession.
              </Text>
              <Text style={Style.directorname}>
                Director of Finealk Food & Beverage
              </Text>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
