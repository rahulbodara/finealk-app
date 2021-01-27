import React, {useState, useRef, useReducer, useEffect} from 'react';
import {
  View,
  Text,
  Picker,
  TouchableOpacity,
  TextInput,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import Header from '../../components/Header/Header';
import LinearGradient from 'react-native-linear-gradient';
import DropdownAlert from 'react-native-dropdownalert';
import Loader from '../../components/Loader/Loader';
import userreducer from '../../redux/userreducer';
import Style from '../../Style/Style';
import axios from 'axios';
import {baseUrl} from '../../baseUrl/baseUrl';
import AsyncStorage from '@react-native-community/async-storage';
import TopHeader from '../../components/TopHeader/TopHeader';
const initialState = '';
export default function User(props) {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [bank_number, setBankNumber] = useState('');
  const [ifsc_code, setIfsc] = useState('');
  const [roleName, setStateUser] = useState('');
  const [shop, setStateShop] = useState('');
  const [password, setPassWord] = useState('');
  const [franchise, setStateFranchies] = useState('');
  const [state, dispatch] = useReducer(userreducer, initialState);
  const [loading, setLoading] = useState(false);
  const [seletedRole, setData] = useState([]);
  const [selectedShop, setShopData] = useState([]);
  const [selectedfranchies, setDataFranchies] = useState([]);
  const [role, SetRoleName] = useState('');
  const ddlAlert = useRef();
  const updateUser = roleName => {
    setStateUser(roleName);
  };

  const updateShop = shop => {
    setStateShop(shop);
  };

  const updateFranchies = franchise => {
    setStateFranchies(franchise);
  };

  useEffect(() => {
    const fetchData = async () => {
      await axios(`${baseUrl}/role`)
        .then(result => {
          let temp = [];
          for (let i = 0; i < result.data.data.length; i++) {
            let data = result.data.data[i];
            if (data.isActive) {
              temp.push(data);
            }
          }
          result.data.data = temp;
          setData(result.data.data);
        })
        .catch(function(error) {
          setTimeout(() => {
            ddlAlert.current.alertWithType('error', '', error.message);
          }, 500);
        });
    };
    const fetchShop = async () => {
      await axios(`${baseUrl}/shop`)
        .then(result => {
          let temp = [];
          for (let i = 0; i < result.data.data.length; i++) {
            let data = result.data.data[i];
            if (data.isActive) {
              temp.push(data);
            }
          }
          result.data.data = temp;
          setShopData(result.data.data);
        })
        .catch(function(error) {
          setTimeout(() => {
            ddlAlert.current.alertWithType('error', '', error.message);
          }, 500);
        });
    };
    const fetchFranchies = async () => {
      await axios(`${baseUrl}/franchise`)
        .then(result => {
          let temp = [];
          for (let i = 0; i < result.data.data.length; i++) {
            let data = result.data.data[i];
            if (data.isActive) {
              temp.push(data);
            }
          }
          result.data.data = temp;
          setDataFranchies(result.data.data);
        })
        .catch(function(error) {
          setTimeout(() => {
            ddlAlert.current.alertWithType('error', '', error.message);
          }, 500);
        });
    };
    fetchData();
    fetchFranchies();
    fetchShop();
    roleNameFunction();
    SetRoleName(role);
  }, []);

  const roleNameFunction = async () => {
    const roleName = await AsyncStorage.getItem('roleName');
    SetRoleName(roleName);
  };

  const save = () => {
    const data = {
      first_name: first_name,
      last_name: last_name,
      role: roleName,
      email: email,
      mobile: mobile,
      franchise: franchise,
      shop: shop,
      password: password,
      address: address,
      bank_number: bank_number,
      ifsc_code: ifsc_code,
    };

    setLoading(true);
    try {
      axios
        .post(`${baseUrl}/users`, data)
        .then(function(response) {
          console.log('===== user response ====', response);
          setTimeout(() => {
            setLoading(false);
            dispatch({
              type:
                'USER_DETAILS_SUCCESS                                                                          TAILS_SUCCESS',
              data,
            });
            ddlAlert.current.alertWithType(
              'success',
              '',
              'User Details Successfully added',
            );
            setTimeout(() => {
              props.navigation.navigate('Dashboard');
            }, 1000);
          }, 500);
        })
        .catch(function(error) {
          setLoading(false);
          dispatch({
            type: 'USER_DETAILS_ERROR',
            data,
          });
          setTimeout(() => {
            if (data === '') {
              ddlAlert.current.alertWithType(
                'error',
                '',
                'Please Field User Details',
              );
            } else if (first_name === '') {
              ddlAlert.current.alertWithType(
                'error',
                '',
                'First Name is required',
              );
            } else if (last_name === '') {
              ddlAlert.current.alertWithType(
                'error',
                '',
                'Last Name is required',
              );
            } else if (roleName === '') {
              ddlAlert.current.alertWithType('error', '', 'Role is required');
            } else if (email === '') {
              ddlAlert.current.alertWithType('error', '', 'Email is required');
            } else if (mobile === '') {
              ddlAlert.current.alertWithType(
                'error',
                '',
                'Phone Number is required',
              );
            } else if (franchise === '') {
              ddlAlert.current.alertWithType(
                'error',
                '',
                'Franchies is required',
              );
            } else if (password === '') {
              ddlAlert.current.alertWithType(
                'error',
                '',
                'Password is required',
              );
            } else if (address === '') {
              ddlAlert.current.alertWithType(
                'error',
                '',
                'Address is required',
              );
            } else if (bank_number === '') {
              ddlAlert.current.alertWithType(
                'error',
                '',
                'Bank Number  is required',
              );
            } else if (ifsc_code === '') {
              ddlAlert.current.alertWithType(
                'error',
                '',
                'IFSC Code  is required',
              );
            }
          }, 200);
        });
    } catch (error) {
      console.log('e', error);
      setLoading(false);
    }
  };
  return (
    <View style={Style.topcontainer}>
      <TopHeader />
      <Header name={'USER'} {...props} isBack={true} />

      <View style={Style.topcontainer}>
        <ScrollView style={{}}>
          <KeyboardAvoidingView
            style={Style.userloginView}
            behavior={Platform.OS == 'ios' ? 'padding' : null}>
            <Loader loading={loading} />

            <View>
              <Text style={{fontSize: 20, alignSelf: 'center'}}>
                User Details
              </Text>
              <>
                <Text style={Style.userlbl}>FirstName</Text>
                <View style={Style.userinputBox}>
                  <TextInput
                    value={state.first_name}
                    style={Style.userinput}
                    placeholder={'First Name'}
                    onChangeText={text => setFirstName(text)}
                  />
                </View>
              </>
              <>
                <Text style={Style.userlbl}>Last Name</Text>
                <View style={Style.userinputBox}>
                  <TextInput
                    value={state.last_name}
                    style={Style.userinput}
                    placeholder={'Last Name'}
                    onChangeText={text => setLastName(text)}
                  />
                </View>
              </>
              <>
                <Text style={Style.userlbl}>Email</Text>
                <View style={Style.userinputBox}>
                  <TextInput
                    value={state.email}
                    onChangeText={text => setEmail(text)}
                    style={Style.userinput}
                    placeholder={'Email'}
                    keyboardType={'email-address'}
                  />
                </View>
              </>
              <>
                <Text style={Style.userlbl}>Phone number</Text>
                <View style={Style.userinputBox}>
                  <TextInput
                    value={state.mobile}
                    onChangeText={text => setPhone(text)}
                    style={Style.userinput}
                    maxLength={10}
                    placeholder={'Phone number'}
                    keyboardType={'number-pad'}
                  />
                </View>
              </>
              <>
                <Text style={Style.userlbl}>Role</Text>
                <Picker
                  selectedValue={roleName || 0}
                  onValueChange={updateUser}
                  mode="dropdown">
                  <Picker.Item label={'Select Role'} value={0} />
                  {seletedRole &&
                    seletedRole.map(i => {
                      return (
                        <Picker.Item
                          label={i.role_name}
                          value={i.role_name}
                          key={i}
                        />
                      );
                    })}
                </Picker>
              </>

              <>
                <Text style={Style.userlbl}>Franchies</Text>
                <Picker
                  selectedValue={franchise || 0}
                  onValueChange={updateFranchies}
                  mode="dropdown">
                  <Picker.Item label={'Select Franchies'} value={0} />
                  {selectedfranchies &&
                    selectedfranchies.map(i => {
                      return (
                        <Picker.Item
                          label={i.f_name}
                          value={i.f_name}
                          key={i}
                        />
                      );
                    })}
                </Picker>
              </>

              <>
                <Text style={Style.userlbl}>Shop</Text>
                <Picker
                  selectedValue={shop || 0}
                  onValueChange={updateShop}
                  mode="dropdown">
                  <Picker.Item label={'Select Shop'} value={0} />
                  {selectedShop &&
                    selectedShop.map(i => {
                      return (
                        <Picker.Item label={i.s_name} value={i._id} key={i} />
                      );
                    })}
                </Picker>
              </>

              <>
                <Text style={Style.userlbl}>Password</Text>
                <View style={Style.userinputBox}>
                  <TextInput
                    value={state.password}
                    onChangeText={text => setPassWord(text)}
                    style={Style.userinput}
                    secureTextEntry={true}
                    placeholder={'Password'}
                    keyboardType={'email-address'}
                  />
                </View>
              </>

              <>
                <Text style={Style.userlbl}>Address</Text>
                <View style={Style.userinputBox}>
                  <TextInput
                    value={state.address}
                    onChangeText={text => setAddress(text)}
                    style={Style.userinput}
                    placeholder={'Address'}
                    keyboardType={'email-address'}
                  />
                </View>
              </>
              <>
                <Text style={Style.userlbl}>Bank Number</Text>
                <View style={Style.userinputBox}>
                  <TextInput
                    value={state.bank_number}
                    onChangeText={text => setBankNumber(text)}
                    style={Style.userinput}
                    placeholder={'Bank Number'}
                    keyboardType={'email-address'}
                  />
                </View>
              </>
              <>
                <Text style={Style.userlbl}>IFSC Code</Text>
                <View style={Style.userinputBox}>
                  <TextInput
                    value={state.ifsc_code}
                    onChangeText={text => setIfsc(text)}
                    style={Style.userinput}
                    placeholder={'IFSC Code'}
                    keyboardType={'email-address'}
                  />
                </View>
              </>
            </View>
          </KeyboardAvoidingView>
          <TouchableOpacity onPress={() => save()} style={Style.userbtnShadow}>
            <LinearGradient
              colors={['#00BFFF', '#00BFFF']}
              style={Style.userbtn}
              start={{x: 0.0, y: 0.0}}
              end={{x: 1.2, y: 0.0}}>
              <Text style={{color: '#fff', fontWeight: '500', fontSize: 16}}>
                Submit
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <DropdownAlert
        ref={ddlAlert}
        tapToCloseEnabled={true}
        updateStatusBar={false}
      />
    </View>
  );
}
