import React, {useState, useRef, useReducer, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Picker,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import AsyncStorage from '@react-native-community/async-storage';
import Header from '../../components/Header/Header';
import Style from '../../Style/Style';
import axios from 'axios';
import {baseUrl} from '../../baseUrl/baseUrl';
import TopHeader from '../../components/TopHeader/TopHeader';
import LinearGradient from 'react-native-linear-gradient';
import Loader from '../../components/Loader/Loader';
import bottleListReducer from '../../redux/bottleListReducer';
const initialState = '';

export default function AddFranchiesBottleList(props) {
  const [number_of_bottle, setBottle] = useState('');
  const [loading, setLoading] = useState(false);
  const ddlAlert = useRef();
  const [shop, setStateShop] = useState('');
  const [shop_name, setShopName] = useState('');
  const [selectedShop, setShopData] = useState([]);
  const [state, dispatch] = useReducer(bottleListReducer, initialState);
  const updateShop = shop => {
    setStateShop(shop);
  };

  const save = () => {
    const data = {
      shop_id: shop,
      shop_name: shop_name,
      number_of_bottle: number_of_bottle,
      isActive: true,
    };
    setLoading(true);
    try {
      axios
        .post(`${baseUrl}/bottle`, data)
        .then(function(response) {
          setLoading(false);
          dispatch({
            type: 'ADD_BOTTLE_SUCCESS',
            data,
          });
          setTimeout(() => {
            ddlAlert.current.alertWithType(
              'success',
              '',
              'Bottle Details Add  Successful',
            );
            setTimeout(() => {
              props.navigation.navigate('FranchiesBottleList');
            }, 1000);
          }, 500);
        })
        .catch(function(error) {
          setLoading(false);

          dispatch({
            type: 'ERROR_ADD_BOTTLE',
            data,
          });
          ddlAlert.current.alertWithType(
            'error',
            '',
            'Please Field Bottle  Details',
          );
        });
    } catch (error) {
      setLoading(false);
      console.log('e', error);
    }
  };

  useEffect(() => {
    const fetchShop = async () => {
      const franchiseId = await AsyncStorage.getItem('franchiseId');
      await axios(`${baseUrl}/shop/franchies/${franchiseId}`)
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
    fetchShop();
  }, []);

  useEffect(() => {}, []);

  return (
    <SafeAreaView style={Style.topcontainer}>
      <TopHeader />
      <Loader loading={loading} />
      <Header name={'BOTTLE DETAIL'} {...props} isBack={true} />
      <ScrollView style={{}}>
        <KeyboardAvoidingView
          style={Style.franchiesloginView}
          behavior={Platform.OS == 'ios' ? 'padding' : null}>
          <View>
            <Text style={{fontSize: 20, alignSelf: 'center'}}>
              Bottle Details
            </Text>
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
              <Text style={Style.franchieslbl}>Shop Name</Text>
              <View style={Style.franchiesinputBox}>
                <TextInput
                  value={shop_name}
                  onChangeText={text => setShopName(text)}
                  style={Style.franchiesinput}
                  placeholder={'Shop Name'}
                />
              </View>
            </>

            <>
              <Text style={Style.franchieslbl}>Bottle</Text>
              <View style={Style.franchiesinputBox}>
                <TextInput
                  value={number_of_bottle}
                  onChangeText={text => setBottle(text)}
                  style={Style.franchiesinput}
                  placeholder={'Number of Bottle'}
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
