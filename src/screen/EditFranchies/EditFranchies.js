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
export default function EditFranchies(props) {
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useReducer(franchiesreducer, initialState);
  const ddlAlert = useRef();
  const id = props.navigation.getParam('id');
  const name = props.navigation.getParam('fname');
  const location = props.navigation.getParam('flocation');
  const user = props.navigation.getParam('fusername');
  const fmobileno = props.navigation.getParam('fmobile');
  const fremail = props.navigation.getParam('femail');
  const frbanknumber = props.navigation.getParam('fbanknumber');
  const frifsccode = props.navigation.getParam('fifsccode');
  const [fname, setFName] = useState(name);
  const [flocation, setFLocation] = useState(location);
  const [fusername, setUserName] = useState(user);
  const [fmobile, setMobile] = useState(fmobileno);
  const [femail, setEmail] = useState(fremail);
  const [fbanknumber, setBankNumber] = useState(frbanknumber);
  const [fifsccode, setIfsccode] = useState(frifsccode);
  useEffect(() => {
    setFName(fname);
    setFLocation(flocation);
    setUserName(fusername);
    setMobile(fmobile);
    setEmail(femail);
    setBankNumber(fbanknumber);
    setIfsccode(fifsccode);
  });

  const save = () => {
    const data = {
      f_name: fname,
      f_location: flocation,
      name: fusername,
      mobile: fmobile,
      email: femail,
      bank_number: fbanknumber,
      ifsc_code: fifsccode,
    };

    setLoading(true);
    try {
      axios
        .put(`${baseUrl}/franchise/${id}`, data)
        .then(function(response) {
          setLoading(false);
          dispatch({
            type: 'EDIT_FRANCHIES',
            data,
          });
          setTimeout(() => {
            ddlAlert.current.alertWithType(
              'success',
              '',
              'Franchies Details Update Succesful',
            );
            setTimeout(() => {
              props.navigation.navigate('Franchies');
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
                  value={fname}
                  style={Style.franchiesinput}
                  placeholder={'Name'}
                />
              </View>
            </>
            <>
              <Text style={Style.franchieslbl}>Location</Text>
              <View style={Style.franchiesinputBox}>
                <TextInput
                  value={flocation}
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
                  value={fusername}
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
                  value={fmobile}
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
                  value={femail}
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
                  value={fbanknumber}
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
                  value={fifsccode}
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
