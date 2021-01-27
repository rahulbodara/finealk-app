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
import shopreducer from '../../redux/shopreducer';
import Style from '../../Style/Style';
import axios from 'axios';
import {baseUrl} from '../../baseUrl/baseUrl';
import LinearGradient from 'react-native-linear-gradient';
import TopHeader from '../../components/TopHeader/TopHeader';
const initialState = '';
export default function AddShop(props) {
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useReducer(shopreducer, initialState);
  const ddlAlert = useRef();
  const [s_name, setFName] = useState('');
  const [s_location, setFLocation] = useState('');
  const [franchise, setStateFranchies] = useState('');
  const [selectedfranchies, setDataFranchies] = useState([]);
  const [name, setUserName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [bank_number, setBankNumber] = useState('');
  const [ifsc_code, setIfsccode] = useState('');
  const updateFranchies = franchise => {
    setStateFranchies(franchise);
  };
  useEffect(() => {
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

    fetchFranchies();
  }, []);

  const save = () => {
    const data = {
      franchies: franchise,
      s_name: s_name,
      s_location: s_location,
      name: name,
      mobile: mobile,
      email: email,
      bank_number: bank_number,
      ifsc_code: ifsc_code,
    };
    setLoading(true);
    try {
      axios
        .post(`${baseUrl}/shop`, data)
        .then(function(response) {
          setLoading(false);
          dispatch({
            type: 'ADD_SHOP_SUCCESS',
            data,
          });
          setTimeout(() => {
            ddlAlert.current.alertWithType(
              'success',
              '',
              'Shop Details Add  Successful',
            );
            setTimeout(() => {
              props.navigation.navigate('ShopList');
            }, 1000);
          }, 500);
        })
        .catch(function(error) {
          setLoading(false);
          dispatch({
            type: 'ERROR_ADD_SHOP',
            data,
          });
          ddlAlert.current.alertWithType(
            'error',
            '',
            'Please Field Shop Details',
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
