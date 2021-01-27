import React, {useState, useEffect, useRef} from 'react';
import {View, Text, Picker, TouchableOpacity} from 'react-native';
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
export default function Attendance(props) {
  const [attendancedate, setStartDate] = useState();
  const [user, setStateUser] = useState('');
  const [selectedCustomer, setCustomer] = useState([]);
  const [is_true] = useState(true);
  const [loading, setLoading] = useState(false);
  const ddlAlert = useRef();
  const updateUser = user => {
    setStateUser(user);
  };

  const save = async () => {
    const UserId = await AsyncStorage.getItem('UserId');
    const data = {
      user_id: user,
      date: attendancedate,
      approval_user_id: UserId,
      is_true: is_true,
    };

    setLoading(true);
    try {
      axios
        .post(`${baseUrl}/attendence`, data)
        .then(function(response) {
          setLoading(false);
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
        });
    } catch (error) {
      setLoading(false);
      console.log('e', error);
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
      <Header name={'ATTENDANCE'} {...props} isBack={true} />
      <Loader loading={loading} />
      <View style={Style.topcontainer}>
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
