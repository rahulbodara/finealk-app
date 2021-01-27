import React, {useRef, useReducer, useState, useEffect} from 'react';
import {
  Platform,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../components/Header/Header';
import Loader from '../../components/Loader/Loader';
import Style from '../../Style/Style';
import loginreducer from '../../redux/loginreducer';
import Icon from 'react-native-vector-icons/Feather';
import axios from 'axios';
import {baseUrl} from '../../baseUrl/baseUrl';
import AsyncStorage from '@react-native-community/async-storage';
const initialState = '';
import _ from 'lodash';
import TopHeader from '../../components/TopHeader/TopHeader';
export default function Login(props) {
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useReducer(loginreducer, initialState);
  const [hidePassword, setHidePassword] = useState(true);
  const ddlAlert = useRef();

  const setPasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  const signIn = () => {
    const data = {
      email: email,
      password: password,
    };

    setLoading(true);
    try {
      axios
        .post(`${baseUrl}/users/validateAccount`, data)
        .then(async response => {
          console.log('response', response);
          const UserId = response.data.data[0]._id;
          console.log('UserID', UserId);
          await AsyncStorage.setItem('UserId', UserId);
          const useremail = response.data.data[0].email;
          await AsyncStorage.setItem('useremail', useremail);
          const mobile = response.data.data[0].mobile;
          await AsyncStorage.setItem('mobile', mobile);
          const first_name = response.data.data[0].first_name;
          await AsyncStorage.setItem('first_name', first_name);
          response.data.data.map(async data => {
            console.log('response === ', data);
            if (data.hasOwnProperty('shop') && data.shop) {
              const shopId = data.shop;
              console.log('ShopId', shopId);
              await AsyncStorage.setItem('shopId', shopId);
            }
            if (data.hasOwnProperty('franchise') && data.franchise) {
              const franchiseId = data.franchise;
              await AsyncStorage.setItem('franchiseId', franchiseId);
            }
          });

          let users = await AsyncStorage.getItem('users');
          if (!users) {
            users = [];
            users.push(response.data);

            AsyncStorage.setItem('users', JSON.stringify(users));
          } else {
            users = JSON.parse(users);
            const {id} = response.data.data;
            const ids = _.map(users, 'user.id');
            if (ids.indexOf(id) > -1) {
              users = users;
            } else {
              users.push(response.data);
            }
            AsyncStorage.setItem('users', JSON.stringify(users));
          }
          const roleName = response.data.data[0].role;
          await AsyncStorage.setItem('roleName', roleName);
          setLoading(false);
          dispatch({
            type: 'USER_LOGIN',
            data,
          });
          ddlAlert.current.alertWithType('success', '', 'Login Successful');
          setTimeout(() => {
            props.navigation.navigate('DashboardStack');
          }, 1000);
        })
        .catch(function(error) {
          setLoading(false);
          dispatch({
            type: 'ERROR_LOGIN',
            data,
          });
          setTimeout(() => {
            if (error.response.data && error.response.data.status === '401') {
              ddlAlert.current.alertWithType(
                'error',
                '',
                'Email and Password is Incorrect',
              );
            }
          }, 500);
        });
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <View style={Style.topcontainer}>
      <TopHeader />
      <Header name={'LOGIN'} {...props} />
      <Loader loading={loading} />
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : null}
        style={{flex: 1, justifyContent: 'center'}}>
        <View style={Style.loginView}>
          <Text style={Style.loginlbl}>Email</Text>
          <View style={Style.logininputBox}>
            <TextInput
              style={Style.logininput}
              placeholder={'Email'}
              onChangeText={text => setUsername(text)}
              value={email}
            />
          </View>
          <Text style={Style.loginlbl}>Password</Text>
          <View style={Style.logininputBox}>
            <TextInput
              style={Style.logininput}
              placeholder={'Password'}
              secureTextEntry={hidePassword}
              onChangeText={text => setPassword(text)}
              value={password}
            />

            <TouchableOpacity
              activeOpacity={0.8}
              style={{marginRight: 15}}
              onPress={() => setPasswordVisibility()}>
              <Icon name={hidePassword ? 'eye-off' : 'eye'} size={20} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              signIn();
            }}
            style={Style.loginbtnShadow}>
            <LinearGradient
              colors={['#00BFFF', '#00BFFF']}
              style={Style.loginbtn}
              start={{x: 0.0, y: 0.0}}
              end={{x: 1.2, y: 0.0}}>
              <Text style={{color: '#fff', fontWeight: '500', fontSize: 16}}>
                SIGN IN
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <DropdownAlert
        ref={ddlAlert}
        tapToCloseEnabled={true}
        updateStatusBar={false}
      />
    </View>
  );
}
