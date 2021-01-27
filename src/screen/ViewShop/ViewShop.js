import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import Header from '../../components/Header/Header';
import Loader from '../../components/Loader/Loader';
import Style from '../../Style/Style';
import axios from 'axios';
import {baseUrl} from '../../baseUrl/baseUrl';
import TopHeader from '../../components/TopHeader/TopHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
export default function ViewShop(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const id = props.navigation.getParam('id');
      await axios(`${baseUrl}/users/allShops/${id}`)
        .then(result => {
          setData(result.data.data);
          setLoading(false);
        })
        .catch(function(error) {
          setLoading(false);
          setTimeout(() => {
            ddlAlert.current.alertWithType('error', '', error.message);
          }, 500);
        });
    };
    fetchData();
  }, []);

  const ddlAlert = useRef();

  const onRefresh = async () => {
    setRefreshing(true);
    const id = props.navigation.getParam('id');

    await axios(`${baseUrl}/users/allShops/${id}`)
      .then(result => {
        setData(result.data.data);
        setRefreshing(false);
      })
      .catch(function(error) {

        setRefreshing(false);
        setTimeout(() => {
          ddlAlert.current.alertWithType('error', '', error.message);
        }, 500);
      });
  };

  return (
    <View style={Style.topcontainer}>
      <TopHeader />
      <Header name={'Customer'} {...props} isBack={true} />
      <Loader loading={loading} />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#EBEBEB"
            title="Loading"
            titleColor="#EBEBEB"
            colors={['#2196F3']}
            progressBackgroundColor="#EBEBEB"
          />
        }>
        {loading == false && data.length === 0 ? (
          <View style={Style.franchieslistView}>
            <View style={Style.topcontainer}>
              <Text>No Customer Available </Text>
            </View>
          </View>
        ) : null}
        {data
          ? data.length > 0
            ? data.map((detail, i) => {
                return (
                  <View key={i} style={Style.franchieslistView}>
                    <View style={Style.topcontainer}>
                      <View style={{flexDirection: 'row', flex: 1}}>
                        <Text style={{flex: 0.5}}>First Name</Text>
                        <Text style={{flex: 0.8}}>{detail.first_name}</Text>
                      </View>
                      <View
                        style={{flexDirection: 'row', flex: 1, marginTop: 10}}>
                        <Text style={{flex: 0.5}}>Last Name</Text>
                        <Text style={{flex: 0.8}}>{detail.last_name}</Text>
                      </View>
                      <View
                        style={{flexDirection: 'row', flex: 1, marginTop: 10}}>
                        <Text style={{flex: 0.5}}>Mobile</Text>
                        <Text style={{flex: 0.8}}>{detail.mobile}</Text>
                      </View>
                      <View
                        style={{flexDirection: 'row', flex: 1, marginTop: 10}}>
                        <Text style={{flex: 0.5}}>Role</Text>
                        <Text style={{flex: 0.8}}>{detail.role}</Text>
                      </View>
                      <View
                        style={{flexDirection: 'row', flex: 1, marginTop: 10}}>
                        <Text style={{flex: 0.5}}>Email</Text>
                        <Text style={{flex: 0.8}}>{detail.email}</Text>
                      </View>
                      <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            marginTop: 10,
                          }}>
                          <Text style={{flex: 0.5}}>Address</Text>
                          <Text style={{flex: 0.8}}>{detail.address}</Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            marginTop: 10,
                          }}>
                          <Text style={{flex: 0.5}}>Bank Number</Text>
                          <Text style={{flex: 0.8}}>{detail.bank_number}</Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            marginTop: 10,
                          }}>
                          <Text style={{flex: 0.5}}>IFSC Code</Text>
                          <Text style={{flex: 0.8}}>{detail.ifsc_code}</Text>
                        </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginTop: 10,
                          alignSelf: 'flex-end',
                        }}>
                        <TouchableOpacity
                          style={{paddingHorizontal: 20}}
                          onPress={() =>
                            props.navigation.navigate('FranchiesPayment', {
                              id: detail._id,
                              email: detail.email,
                            })
                          }>
                          <AntDesign name="wallet" size={25} />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() =>
                            props.navigation.navigate(
                              'FranchiesAttendanceReport',
                              {
                                id: detail._id,
                              },
                            )
                          }>
                          <AntDesign name="eye" size={25} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                );
              })
            : null
          : null}
      </ScrollView>
      <DropdownAlert
        ref={ddlAlert}
        tapToCloseEnabled={true}
        updateStatusBar={false}
      />
    </View>
  );
}
