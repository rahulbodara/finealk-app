import React from 'react';
import {View, Text, Linking, TouchableOpacity} from 'react-native';
import Header from '../../components/Header/Header';
import {Icon} from '../../components/icons/icon';
import Style from '../../Style/Style';
import TopHeader from '../../components/TopHeader/TopHeader';
export default function ContactUs(props) {
  return (
    <View style={Style.topcontainer}>
      <TopHeader />
      <Header name={'CONTACT US'} {...props} />
      <View style={Style.topcontainer}>
        <Text style={Style.contacttextcontainer}>Contact Information</Text>

        <TouchableOpacity
          onPress={() => {
            Linking.openURL('tel:+91 99244 40387');
          }}>
          <View style={Style.contactmaincontainer}>
            <View style={Style.emailiconconttainer}>
              <Icon size={18} name="phone-call" color="#5080ba" />
            </View>
            <Text style={Style.contacttextcontainers}>Call Us</Text>
            <View style={Style.contactcontainer}>
              <Text style={Style.contacttitletxt}>+91 99244 40387</Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={Style.contactmaincontainer}>
          <View style={Style.contacticoncontainer}>
            <Icon size={18} name="map" color="#5080ba" />
          </View>
          <View style={Style.contacttitlecontainer}>
            <Text style={Style.contacttitletxt}>
              4025 - 4026, Silver Bussiness Point, Nr. Royal Squre, VIP Circle,
              Utran, Surat.
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL('mailto:sales@example.com');
          }}>
          <View style={Style.contactmaincontainer}>
            <View style={Style.emailiconconttainer}>
              <Icon size={18} name="mail" color="#5080ba" />
            </View>
            <Text style={Style.contacttextcontainers}>Email</Text>
            <View style={Style.contactcontainer}>
              <Text style={Style.contacttitletxt}>sales@example.com</Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={Style.contactmaincontainer}>
          <View style={Style.contacticoncontainer}>
            <Icon size={18} name="clock" color="#5080ba" />
          </View>
          <View style={Style.contacttitlecontainer}>
            <View style={{flexDirection: 'column'}}>
              <Text style={Style.contacttitletxt}>
                Monday-Friday: 9am to 5pm
              </Text>
              <Text style={Style.contacttitletxt}>Saturday: 10am to 4pm</Text>
              <Text style={Style.contacttitletxt}>Sunday: Closed</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
