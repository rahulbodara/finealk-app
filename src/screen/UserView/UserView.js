import React from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Header from '../../components/Header/Header';
import Style from '../../Style/Style';
import TopHeader from '../../components/TopHeader/TopHeader';
const window = Dimensions.get('window');
export default function UserView(props) {
  const userdetails = props.navigation.getParam('userdetails', {});
  return (
    <SafeAreaView style={Style.topcontainer}>
      <TopHeader />
      <Header name={'USER DETAIL'} {...props} isBack={true} />
      <ScrollView style={{}}>
        <KeyboardAvoidingView
          style={Style.franchiesloginView}
          behavior={Platform.OS == 'ios' ? 'padding' : null}>
          <View>
            <View style={{flexDirection: 'row', flex: 1}}>
              <Text style={{flex: 0.3}}>First Name </Text>
              <Text style={{flex: 0.8}}>{userdetails.first_name}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                marginTop: window.height * 0.03,
              }}>
              <Text style={{flex: 0.3}}>Last Name </Text>
              <Text style={{flex: 0.8}}>{userdetails.last_name}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                marginTop: window.height * 0.03,
              }}>
              <Text style={{flex: 0.3}}>Franchise</Text>
              <Text style={{flex: 0.8}}>{userdetails.franchise}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                marginTop: window.height * 0.03,
              }}>
              <Text style={{flex: 0.3}}>Email</Text>
              <Text style={{flex: 0.8}}>{userdetails.email}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                marginTop: window.height * 0.03,
              }}>
              <Text style={{flex: 0.3}}>Mobile</Text>
              <Text style={{flex: 0.8}}>{userdetails.mobile}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                marginTop: window.height * 0.03,
              }}>
              <Text style={{flex: 0.3}}>Role</Text>
              <Text style={{flex: 0.8}}>{userdetails.role}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                marginTop: window.height * 0.03,
              }}>
              <Text style={{flex: 0.3}}>Address</Text>
              <Text style={{flex: 0.8}}>{userdetails.address}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                marginTop: window.height * 0.03,
              }}>
              <Text style={{flex: 0.3}}>Bank Number</Text>
              <Text style={{flex: 0.8}}>{userdetails.bank_number}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                marginTop: window.height * 0.03,
              }}>
              <Text style={{flex: 0.3}}>IFSC</Text>
              <Text style={{flex: 0.8}}>{userdetails.ifsc_code}</Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}
