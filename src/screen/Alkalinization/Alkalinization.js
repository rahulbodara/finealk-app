import React from 'react';
import {View, Text, Image} from 'react-native';
import Header from '../../components/Header/Header';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Style from '../../Style/Style';
import TopHeader from '../../components/TopHeader/TopHeader';
export default function Alkalinization(props) {
  return (
    <View style={Style.topcontainer}>
      <TopHeader />
      <Header name={'ALKALINIZATION'} {...props} isBack={true} />
      <KeyboardAwareScrollView>
        <View style={Style.topcontainer}>
          <Text style={Style.alkalitext}>What is Alkaline Water</Text>
          <View style={Style.alkicontainer}>
            <Text>
              {' '}
              Alkaline water from a water ionizer is relatively new to the US,
              but has been studied and consumed in Asia for over a decade. The
              US FDA has not evaluated alkaline water for health purposes; the
              information on this page about alkaline water comes from Japan.
            </Text>
            <Text style={{fontWeight: 'bold'}}>
              Clinical Testing of Alkaline Water has been conducted in Japan
            </Text>
            <Text>
              The Functional Water Foundation of Japan defines alkaline ionized
              water as functional water – water drank for health purposes. The
              Japanese Ministry of Health, Labor and Welfare notification No.
              112 states that water ionizers are: used for: “generation of
              alkaline electrolytic water for drinking to improve
              gastrointestinal problems”. (Association of Alkaline Ionized Water
              Apparatus 2010).
            </Text>
            <Text style={{fontWeight: 'bold'}}>
              Voluntary Drinking Guidelines: Alkaline Water in Japan
            </Text>
            <Text>
              The Association of Alkaline Ionized Water Apparatus (AAIWA) of
              Japan defines alkaline water as: “Alkaline ionized water is
              slightly alkali electrolyzed water with a pH of 9 to 10 created on
              the anode side by direct-current electrolysis of drinking water In
              Japan, voluntary guidelines regarding the use of alkaline water
              have been established by the AAIWA based on standards set forth by
              the Japan Home-Health Apparatus Industrial Association and
              Japanese Standards Association. Some recommendations are:,
              Individuals receiving medical attention or believe they have
              health problems should consult their doctor before drinking
              alkaline ionized water. A pH of 9.5 is recommended for daily use
              Appropriate daily intake: 500 to 1000ml Don’t take medication with
              alkaline water This information is provided for educational
              purposes only; these guidelines have not been evaluated by the US
              FDA.
            </Text>
            <Text style={{fontWeight: 'bold'}}>
              Alkaline Water and the Mayo Clinic
            </Text>
            <Text>
              The Mayo clinic is the only recognized medical authority in the US
              to make a statement regarding the use of alkaline water. According
              to Mayo clinic nutritionist Katherine Zeratsky Some studies
              suggests that alkaline water may help slow bone loss, but further
              investigation is needed to determine if this influences overall
              bone mineral density and if the benefit is maintained over the
              long term.
            </Text>
            <Text style={{fontWeight: 'bold'}}>
              Is Alkaline Water right for you?
            </Text>
            <Text>
              LIFE Ionizers urges you to talk to your doctor if you are
              considering alkaline water.
            </Text>
            <View style={Style.alkanationimage}>
              <Image
                source={require('../../../image/a.jpg')}
                style={Style.alkaaimage}
              />
              <Image
                source={require('../../../image/b.jpg')}
                style={Style.alkabimage}
              />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
