import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Picker,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import Header from '../../components/Header/Header';
import DatePicker from 'react-native-datepicker';
import LinearGradient from 'react-native-linear-gradient';
import Style from '../../Style/Style';
import axios from 'axios';
import {baseUrl} from '../../baseUrl/baseUrl';
import Loader from '../../components/Loader/Loader';
import AsyncStorage from '@react-native-community/async-storage';
import DropdownAlert from 'react-native-dropdownalert';
import TopHeader from '../../components/TopHeader/TopHeader';
export default function ShopAttendance(props) {
  const [modalVisible, setModalVisible] = useState(true);
  const [attendancedate, setStartDate] = useState();
  const [user, setStateUser] = useState('');
  const [selectedCustomer, setCustomer] = useState([]);
  const [is_true] = useState(true);
  const [loading, setLoading] = useState(false);
  const [number_of_bottle, setBottle] = useState('');
  const [bottleitem, setBottleItem] = useState('');
  const [errors, setErrors] = useState({});
  const ddlAlert = useRef();
  const updateUser = user => {
    setStateUser(user);
  };

  const validateForm = () => {
    let formValid = true;
    let errors = {};
    if (number_of_bottle === '') {
      formValid = false;
      errors['number_of_bottle'] = '*Bottle Item is required';
    } else {
      delete errors['number_of_bottle'];
    }
    setErrors(errors);
    return formValid;
  };

  const save = async () => {
    console.log('=== get bottle item', bottleitem);
    const UserId = await AsyncStorage.getItem('UserId');
    const data = {
      user_id: user,
      date: attendancedate,
      approval_user_id: UserId,
      is_true: is_true,
    };
    const shopID = await AsyncStorage.getItem('shopId');
    console.log('shopID', shopID);
    const bottlecount = {
      shop_id: shopID,
      shop_name: '---',
      bottle_item: bottleitem,
    };
    console.log('payload data', bottlecount);

    setLoading(true);
    try {
      axios
        .post(`${baseUrl}/attendence`, data)
        .then(function(value) {
          setLoading(false);
          console.log('=== attendance', value);
          axios
            .post(`${baseUrl}/bottlecount`, bottlecount)
            .then(function(response) {
              console.log('==== bottle count', response);
            })
            .catch(function(error) {
              console.log('error', error);
              setLoading(false);
            });

          ddlAlert.current.alertWithType(
            'success',
            '',
            'Attendance Successfully added',
          );
          setTimeout(() => {
            props.navigation.navigate('Dashboard');
          }, 1000);
        })
        .catch(function(error) {
          setLoading(false);
          if (error.response.data.message == 'Please add minimum amount') {
            ddlAlert.current.alertWithType(
              'error',
              '',
              'Please add minimum amount',
            );
          } else {
            setTimeout(() => {
              if (attendancedate === '') {
                ddlAlert.current.alertWithType(
                  'error',
                  '',
                  'Attendance Date is required',
                );
              } else if (is_true === '') {
                ddlAlert.current.alertWithType(
                  'error',
                  '',
                  'Is_true Field is required',
                );
              } else if (user === '') {
                ddlAlert.current.alertWithType(
                  'error',
                  '',
                  'Customer Name is required',
                );
              }
            });
          }
        });
    } catch (error) {
      setLoading(false);
    }
  };

  const add = () => {
    if (validateForm()) {
      const data = {
        number_of_bottle: number_of_bottle,
      };
      console.log('bottle data', data);
      const totalbottle = data.number_of_bottle;
      console.log('total bottle', totalbottle);
      setBottleItem(totalbottle);
      setModalVisible(!modalVisible);
    }
  };
  useEffect(() => {
    const fetchCustomers = async () => {
      const shopId = await AsyncStorage.getItem('shopId');
      console.log('shopId', shopId);
      await axios(`${baseUrl}/users/allShops/${shopId}`)
        .then(result => {
          console.log('response customer', result);
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
      <Header name={'ATTENDANCE'} {...props} isBack={true} />
      <Loader loading={loading} />
      <View style={Style.topcontainer}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={{alignSelf: 'flex-start', marginTop: 15}}>
                Bottle
              </Text>
              <>
                <View style={Style.attendanceinputbox}>
                  <TextInput
                    value={number_of_bottle}
                    onChangeText={text => setBottle(text)}
                    style={Style.franchiesinput}
                    placeholder={'Number of Bottle'}
                    keyboardType="numeric"
                  />
                </View>

                {errors['number_of_bottle'] !== undefined && (
                  <Text
                    style={{
                      color: 'red',
                      alignSelf: 'flex-start',
                      marginTop: 5,
                    }}>
                    {errors['number_of_bottle']}
                  </Text>
                )}
              </>

              <TouchableOpacity
                onPress={() => add()}
                style={Style.attendancebtns}>
                <LinearGradient
                  colors={['#00BFFF', '#00BFFF']}
                  style={Style.franchiesbtn}
                  start={{x: 0.0, y: 0.0}}
                  end={{x: 0.0, y: 0.0}}>
                  <Text
                    style={{color: '#fff', fontWeight: '500', fontSize: 16}}>
                    Submit
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'column', paddingHorizontal: 20}}>
            <Text style={Style.fromtextcontainer}>Date</Text>
            <DatePicker
              style={Style.datepickercontainer}
              date={attendancedate}
              mode="date"
              placeholder="Select Date"
              format="DD-MM-YYYY"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                },
                dateInput: {
                  borderWidth: 0,
                  marginLeft: 15,
                },
                placeholderText: {
                  marginLeft: 15,
                  color: 'black',
                },
              }}
              onDateChange={attendancedate => setStartDate(attendancedate)}
            />
          </View>
        </View>
        <View style={Style.customernamecontainer}>
          <Text style={Style.attendancetextcontainer}>User</Text>

          <Picker
            selectedValue={user}
            onValueChange={updateUser}
            mode="dropdown">
            <Picker.Item label={'Select User'} value={0} />
            {selectedCustomer &&
              selectedCustomer.map(i => {
                return (
                  <Picker.Item
                    label={i.first_name === undefined ? i.name : i.first_name}
                    value={i._id}
                    key={i}
                  />
                );
              })}
          </Picker>
        </View>

        <TouchableOpacity
          onPress={() => save()}
          style={Style.attendancebtnShadow}>
          <LinearGradient
            colors={['#00BFFF', '#00BFFF']}
            style={Style.attendancebtn}
            start={{x: 0.0, y: 0.0}}
            end={{x: 1.2, y: 0.0}}>
            <Text style={{color: '#fff', fontWeight: '500', fontSize: 16}}>
              Save
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <DropdownAlert
          ref={ddlAlert}
          tapToCloseEnabled={true}
          updateStatusBar={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 22,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
