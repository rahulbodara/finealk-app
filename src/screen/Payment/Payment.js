import React, {useState, useEffect, useRef, useReducer} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Picker,
} from 'react-native';
import Header from '../../components/Header/Header';
import Style from '../../Style/Style';
import Loader from '../../components/Loader/Loader';
import DropdownAlert from 'react-native-dropdownalert';
import axios from 'axios';
import {baseUrl} from '../../baseUrl/baseUrl';
import LinearGradient from 'react-native-linear-gradient';
import paymentreducer from '../../redux/paymentreducer';
import TopHeader from '../../components/TopHeader/TopHeader';
const initialState = '';
export default function Payment(props) {
  const [f_payment, setPayment] = useState('');
  const [f_approval_user, setApprovalUser] = useState('');
  const [user, setStateUser] = useState('');
  const [selectedCustomer, setCustomer] = useState([]);
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useReducer(paymentreducer, initialState);
  const ddlAlert = useRef();
  const updateUser = user => {
    setStateUser(user);
  };

  const save = () => {
    const data = {
      user_id: user,
      amount: f_payment,
      name: f_approval_user,
    };
    setLoading(true);
    try {
      axios
        .post(`${baseUrl}/account`, data)
        .then(function(response) {
          setLoading(false);
          dispatch({
            type: 'ADD_PAYMENT_SUCCESS',
            data,
          });
          ddlAlert.current.alertWithType(
            'success',
            '',
            'Payment Successfully added',
          );
          setTimeout(() => {
            props.navigation.navigate('Dashboard');
          }, 1000);
        })
        .catch(function(error) {
          setLoading(false);
          dispatch({
            type: 'ERROR_PAYMENT',
            data,
          });
          setTimeout(() => {
            if (user === '') {
              ddlAlert.current.alertWithType('error', '', 'Userr is required');
            } else if (f_payment === '') {
              ddlAlert.current.alertWithType('error', '', 'Amount is required');
            } else if (f_approval_user === '') {
              ddlAlert.current.alertWithType(
                'error',
                '',
                'Approval Name is required',
              );
            }
          });
        });
    } catch (error) {
      setLoading(false);
    
    }
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      await axios(`${baseUrl}/users`)
        .then(result => {
          let temp = [];
          for (let i = 0; i < result.data.data.length; i++) {
            let data = result.data.data[i];
            if (data.isActive) {
              temp.push(data);
            }
          }

          result.data.data = temp;
          setCustomer(result.data.data);
        })
        .catch(function(error) {
          setTimeout(() => {
            ddlAlert.current.alertWithType('error', '', error.message);
          }, 500);
        });
    };
    fetchCustomers();
  }, []);

  return (
    <View style={Style.topcontainer}>
      <TopHeader />
      <Header name={'PAYMENT'} {...props} isBack={true} />
      <Loader loading={loading} />
      <ScrollView style={{}}>
        <KeyboardAvoidingView
          style={Style.franchiesloginView}
          behavior={Platform.OS == 'ios' ? 'padding' : null}>
          <View>
            <Text style={{fontSize: 20, alignSelf: 'center'}}>
              Payment Details
            </Text>
            <>
              <Text style={Style.franchieslbl}>User</Text>
              <View style={Style.franchiesinputBox}>
                <ScrollView horizontal={false}>
                  <Picker
                    selectedValue={user}
                    onValueChange={updateUser}
                    mode="dropdown">
                    <Picker.Item label={'Select User'} value={0} />
                    {selectedCustomer.map(i => {
                      return (
                        <Picker.Item
                          label={
                            i.first_name === undefined ? i.name : i.first_name
                          }
                          value={i._id}
                          key={i}
                        />
                      );
                    })}
                  </Picker>
                </ScrollView>
              </View>
            </>
            <>
              <Text style={Style.franchieslbl}>Amount</Text>
              <View style={Style.franchiesinputBox}>
                <TextInput
                  onChangeText={text => setPayment(text)}
                  value={state.f_payment}
                  style={Style.franchiesinput}
                  placeholder={'Amount'}
                />
              </View>
            </>
            <>
              <Text style={Style.franchieslbl}>Approval User</Text>
              <View style={Style.franchiesinputBox}>
                <TextInput
                  onChangeText={text => setApprovalUser(text)}
                  value={state.f_approval_user}
                  style={Style.franchiesinput}
                  placeholder={'Approval User'}
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

      <DropdownAlert
        ref={ddlAlert}
        tapToCloseEnabled={true}
        updateStatusBar={false}
      />
    </View>
  );
}
