import React, {useState, useRef, useReducer} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import Header from '../../components/Header/Header';
import Loader from '../../components/Loader/Loader';
import franchiesreducer from '../../redux/franchiesreducer';
import Style from '../../Style/Style';
import axios from 'axios';
import {baseUrl} from '../../baseUrl/baseUrl';
import LinearGradient from 'react-native-linear-gradient';
import TopHeader from '../../components/TopHeader/TopHeader';
const initialState = '';
export default function Add(props) {
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useReducer(franchiesreducer, initialState);
  const ddlAlert = useRef();
  const [f_name, setFName] = useState('');
  const [f_location, setFLocation] = useState('');
  const [name, setUserName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [bank_number, setBankNumber] = useState('');
  const [ifsc_code, setIfsccode] = useState('');
  const save = () => {
    const data = {
      f_name: f_name,
      f_location: f_location,
      name: name,
      mobile: mobile,
      email: email,
      bank_number: bank_number,
      ifsc_code: ifsc_code,
    };
    setLoading(true);
    try {
      axios
        .post(`${baseUrl}/franchise`, data)
        .then(function(response) {
          setLoading(false);
          dispatch({
            type: 'ADD_FRANCHIES_SUCCESS',
            data,
          });
          setTimeout(() => {
            ddlAlert.current.alertWithType(
              'success',
              '',
              'Franchies Details Add  Successful',
            );
            setTimeout(() => {
              props.navigation.navigate('Franchies');
            }, 1000);
          }, 500);
        })
        .catch(function(error) {
          setLoading(false);
          dispatch({
            type: 'ERROR_ADD_FRANCHIES',
            data,
          });
          ddlAlert.current.alertWithType(
            'error',
            '',
            'Please Field Franchies Details',
          );
        });
    } catch (error) {
      setLoading(false);
      console.log('e', error);
    }
  };

  return (
    <SafeAreaView style={Style.topcontainer}>
      <TopHeader />
      <Header name={'FRANCHIES DETAIL'} {...props} isBack={true} />
      <Loader loading={loading} />
      <ScrollView style={{}}>
        <KeyboardAvoidingView
          style={Style.franchiesloginView}
          behavior={Platform.OS == 'ios' ? 'padding' : null}>
          <View>
            <Text style={{fontSize: 20, alignSelf: 'center'}}>
              Franchies Details
            </Text>
            <>
              <Text style={Style.franchieslbl}>Name</Text>
              <View style={Style.franchiesinputBox}>
                <TextInput
                  onChangeText={text => setFName(text)}
                  value={f_name}
                  style={Style.franchiesinput}
                  placeholder={'Name'}
                />
              </View>
            </>
            <>
              <Text style={Style.franchieslbl}>Location</Text>
              <View style={Style.franchiesinputBox}>
                <TextInput
                  value={f_location}
                  onChangeText={text => setFLocation(text)}
                  style={Style.franchiesinput}
                  placeholder={'Location'}
                />
              </View>
            </>
            <>
              <Text style={Style.franchieslbl}>User Name</Text>
              <View style={Style.franchiesinputBox}>
                <TextInput
                  value={name}
                  onChangeText={text => setUserName(text)}
                  style={Style.franchiesinput}
                  placeholder={'UserName'}
                />
              </View>
            </>
            <>
              <Text style={Style.franchieslbl}>Mobile No</Text>
              <View style={Style.franchiesinputBox}>
                <TextInput
                  value={mobile}
                  onChangeText={text => setMobile(text)}
                  style={Style.franchiesinput}
                  placeholder={'Mobile Number'}
                  keyboardType="number-pad"
                  maxLength={10}
                />
              </View>
            </>
            <>
              <Text style={Style.franchieslbl}>Email</Text>
              <View style={Style.franchiesinputBox}>
                <TextInput
                  value={email}
                  onChangeText={text => setEmail(text)}
                  style={Style.franchiesinput}
                  placeholder={'Email'}
                />
              </View>
            </>
            <>
              <Text style={Style.franchieslbl}>Bank Number</Text>
              <View style={Style.franchiesinputBox}>
                <TextInput
                  value={bank_number}
                  onChangeText={text => setBankNumber(text)}
                  style={Style.franchiesinput}
                  placeholder={'Bank Number'}
                />
              </View>
            </>
            <>
              <Text style={Style.franchieslbl}>IFSC Code</Text>
              <View style={Style.franchiesinputBox}>
                <TextInput
                  value={ifsc_code}
                  onChangeText={text => setIfsccode(text)}
                  style={Style.franchiesinput}
                  placeholder={'IFSC'}
                />
              </View>
            </>
          </View>
        </KeyboardAvoidingView>
        <TouchableOpacity
          onPress={() => save()}
          style={Style.franchiesbtnShadow}>
          <LinearGradient
            colors={['#00BFFF', '#00BFFF']}
            style={Style.franchiesbtn}
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
    </SafeAreaView>
  );
}
