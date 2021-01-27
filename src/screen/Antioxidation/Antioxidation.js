import React from 'react';
import {View, Text} from 'react-native';
import Header from '../../components/Header/Header';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Style from '../../Style/Style';
import TopHeader from '../../components/TopHeader/TopHeader';
export default function Antioxidation(props) {
  return (
    <View style={Style.topcontainer}>
      <TopHeader />
      <Header name={'ANTIOXIDATION'} {...props} isBack={true} />
      <KeyboardAwareScrollView>
        <View style={Style.topcontainer}>
          <Text style={Style.antioxidationtext}>
            Get Antioxidants from Alkaline Ionized Water
          </Text>
          <View style={Style.antioxidationcontainer}>
            <Text>
              {' '}
              Alkaline water produced by a water ionizer can be a great source
              of antioxidants and other minerals. Hard water, which is found in
              many areas will contain large amounts of calcium and magnesium,
              and will likely have many other minerals in it as well, some of
              those minerals, such as zinc and manganese, are antioxidants.
              While the filters in an ionizer work to reduce the levels of many
              substances found in tap water, they allow useful amounts of
              minerals to pass through. A water ionizer is the best way to get
              antioxidant minerals from water because they concentrate
              beneficial minerals in drinking water while rejecting harmful
              ones. Water ionizers use a process called electrodialysis to
              divide water into two different streams, one alkaline, and one
              acid. The process concentrates essential dietary minerals on the
              alkaline side, while harmful elements are concentrated on the acid
              side. Then, the electrodialytic process causes the concentrated
              alkaline minerals to become ionized by freeing up hydroxyl ions
              from the water, which then instantly combine with any minerals
              present to form ionic minerals in their antioxidant form, which
              are highly bioavailable. ALKALINE WATER CAN BE A GREAT SOURCE OF
              IRON AND ZINC Vegetables have long been recognized as a source of
              vitamins and minerals, but research is revealing that vegetables
              may make it difficult for the body to absorb some essential
              dietary minerals. Scientists have found that antioxidants in
              plants, known as polyphenols, can interfere with the absorption of
              iron and zinc. Some plant acids, such as phytic acid will bind to
              iron and zinc making them unavailable to absorb in the intestines.
              Some health experts have speculated that the binding effect of
              polyphenols may be the cause of mineral deficiencies in some
              people’s diets. For vegetarians and vegans, alkaline water can
              provide useful amounts of bioavailable iron and zinc in their diet
              because it contains no polyphenols. Immune functions fail first if
              you don’t get enough antioxidant minerals If they are present in
              your source water, alkaline water produced by an ionizer will have
              trace amounts of the above antioxidant minerals in it. The good
              news is – you only need trace amounts of these minerals in your
              diet! Drinking water is the ideal way to deliver minerals, because
              the body can only absorb small amounts of minerals at a time. This
              is one of the major drawbacks of mineral supplements, they deliver
              a lot of minerals, but only a small amount is actually absorbed.
              Minerals from supplements that can’t be absorbed are excreted in
              the feces. HOW TO USE ALKALINE WATER FOR MINERAL SUPPLEMENTATION
              It is incredibly easy to supplement your mineral intake with
              alkaline water. Simply drink alkaline water throughout your day
              each glass of water you drink will give you some minerals. Health
              experts recommend you drink eight 500 ml glasses of water each day
              to maintain proper hydration. By drinking alkaline water, you not
              only stay hydrated, but you add essential minerals to your diet.
              Drinking alkaline water may just be one of the easiest and most
              effective things you can do to maintain and improve your health.
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
