import React, {useRef} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Header from '../../components/Header/Header';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Style from '../../Style/Style';
import TopHeader from '../../components/TopHeader/TopHeader';
import RazorpayCheckout from 'react-native-razorpay';
import DropdownAlert from 'react-native-dropdownalert';
import base64 from 'react-native-base64';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
export default function Wallet(props) {
  const ddlAlert = useRef();
  const SaveOrder = async () => {
    const totalUserAmount = await AsyncStorage.getItem('totalAmount');
    console.log('totalUserAmount', totalUserAmount);
    const order = {
      amount: totalUserAmount * 100,
      currency: 'INR',
      receipt: 'recipt#1',
      payment_capture: true,
    };
    console.log('order Data', order);
    const username = 'rzp_test_Vs8p83tHciKx5A';
    const password = 'CnRpNEkdk82MdnjfhH316w4r';
    const key = base64.encode(username + ':' + password);
    console.log('usernamePasswordBuffer', key);
    axios
      .post('https://api.razorpay.com/v1/orders/', order, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${key}`,
        },
      })
      .then(async response => {
        console.log('order response', response);
        const orderId = response.data.id;
        console.log('orderId', orderId);
        const price = response.data.amount;
        console.log('Price', price);
        const currency = response.data.currency;
        console.log('currency', currency);
        const userFirstName = await AsyncStorage.getItem('first_name');
        console.log('userFirstName', userFirstName);
        const customerMobileNo = await AsyncStorage.getItem('mobile');
        console.log('customerMobileNo', customerMobileNo);
        const customerEmail = await AsyncStorage.getItem('useremail');
        console.log('customerEmail', customerEmail);
        var options = {
          description: 'Finealk Mineral Water',
          image: 'https://i.imgur.com/3g7nmJC.png',
          currency: currency,
          key: 'rzp_test_Vs8p83tHciKx5A',
          amount: price,
          name: 'Finealk',
          order_id: orderId,
          prefill: {
            email: customerEmail,
            contact: customerMobileNo,
            name: userFirstName,
          },
          theme: {color: '#53a20e'},
        };
        console.log('options', options);
        RazorpayCheckout.open(options)
          .then(data => {
            console.log('Razor Pay checkout data', data);
          })
          .catch(error => {
            console.log('e', error);
            ddlAlert.current.alertWithType('error', '', error.description);
          });
      })
      .catch(error => {
        console.log('error', error);
      });
  };
  return (
    <View style={Style.topcontainer}>
      <TopHeader />
      <Header name={'WALLET'} {...props} isBack={true} />
      <KeyboardAwareScrollView style={{alignSelf: 'center'}}>
        <TouchableOpacity
          style={{
            backgroundColor: '#00BFFF',
            borderRadius: 10,
            height: 56,
            paddingHorizontal: 24,
            justifyContent: 'center',
            marginTop: 45,
          }}
          onPress={() => SaveOrder()}>
          <Text
            style={{
              color: '#ffffff',
              fontSize: 18,
              alignSelf: 'center',
            }}>
            Pay with RazorPay
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
      <DropdownAlert
        ref={ddlAlert}
        tapToCloseEnabled={true}
        updateStatusBar={false}
      />
    </View>
  );
}
