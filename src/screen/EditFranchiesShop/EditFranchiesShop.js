import React, {useState, useRef, useReducer, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Picker,
} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import Header from '../../components/Header/Header';
import Loader from '../../components/Loader/Loader';
import Style from '../../Style/Style';
import axios from 'axios';
import {baseUrl} from '../../baseUrl/baseUrl';
import LinearGradient from 'react-native-linear-gradient';
import shopreducer from '../../redux/shopreducer';
import AsyncStorage from '@react-native-community/async-storage';
const initialState = '';
export default function EditFranchiesShop(props) {
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useReducer(shopreducer, initialState);
  const ddlAlert = useRef();
  const id = props.navigation.getParam('id');
  const franchiesid = props.navigation.getParam('franchies');
  const name = props.navigation.getParam('s_name');
  const location = props.navigation.getParam('s_location');
  const user = props.navigation.getParam('sname');
  const fmobileno = props.navigation.getParam('mobile');
  const fremail = props.navigation.getParam('email');
  const frbanknumber = props.navigation.getParam('bank_number');
  const frifsccode = props.navigation.getParam('ifsc_code');
  const [s_name, setFName] = useState(name);
  const [s_location, setFLocation] = useState(location);
  const [sname, setUserName] = useState(user);
  const [mobile, setMobile] = useState(fmobileno);
  const [email, setEmail] = useState(fremail);
  const [bank_number, setBankNumber] = useState(frbanknumber);
  const [ifsc_code, setIfsccode] = useState(frifsccode);
  const [franchise, setStateFranchies] = useState(franchiesid);
  const [selectedfranchies, setDataFranchies] = useState([]);
  const updateFranchies = franchise => {
    setStateFranchies(franchise);
  };
  useEffect(() => {
    setFName(s_name);
    setFLocation(s_location);
    setUserName(sname);
    setMobile(mobile);
    setEmail(email);
    setBankNumber(bank_number);
    setStateFranchies(franchise);
    const fetchFranchies = async () => {
      const franchiseId = await AsyncStorage.getItem('franchiseId');
      await axios(`${baseUrl}/franchise/${franchiseId}`)
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

    fetchFranchies();
  });

  const save = () => {
    const data = {
      franchies: franchise,
      s_name: s_name,
      s_location: s_location,
      name: sname,
      mobile: mobile,
      email: email,
      bank_number: bank_number,
      ifsc_code: ifsc_code,
    };

    setLoading(true);
    try {
      axios
        .put(`${baseUrl}/shop/${id}`, data)
        .then(function(response) {
          setLoading(false);
          dispatch({
            type: 'EDIT_SHOP',
            data,
          });
          setTimeout(() => {
            ddlAlert.current.alertWithType(
              'success',
              '',
              'Shop Details Update Succesful',
            );
            setTimeout(() => {
              props.navigation.navigate('FranchiesShopList');
            }, 1000);
          }, 500);
        })
        .catch(function(error) {
          setLoading(false);
          console.log(error);
        });
    } catch (error) {
      setLoading(false);
      console.log('e', error);
    }
  };

  return (
    <SafeAreaView style={Style.topcontainer}>
      <Header name={'SHOP DETAIL'} {...props} isBack={true} />
      <Loader loading={loading} />
      <ScrollView style={{}}>
        <KeyboardAvoidingView
          style={Style.franchiesloginView}
          behavior={Platform.OS == 'ios' ? 'padding' : null}>
          <View>
            <Text style={{fontSize: 20, alignSelf: 'center'}}>
              Shop Details
            </Text>

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
                      <Picker.Item label={i.f_name} value={i._id} key={i} />
                    );
                  })}
              </Picker>
            </>
            <>
              <Text style={Style.franchieslbl}>Name</Text>
              <View style={Style.franchiesinputBox}>
                <TextInput
                  onChangeText={text => setFName(text)}
                  value={s_name}
                  style={Style.franchiesinput}
                  placeholder={'Name'}
                />
              </View>
            </>
            <>
              <Text style={Style.franchieslbl}>Location</Text>
              <View style={Style.franchiesinputBox}>
                <TextInput
                  value={s_location}
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
                  value={sname}
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
