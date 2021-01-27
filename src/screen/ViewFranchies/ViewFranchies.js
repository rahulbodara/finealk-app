import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import Header from '../../components/Header/Header';
import Loader from '../../components/Loader/Loader';
import Style from '../../Style/Style';
import axios from 'axios';
import {baseUrl} from '../../baseUrl/baseUrl';
import TopHeader from '../../components/TopHeader/TopHeader';

export default function ViewFranchies(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const id = props.navigation.getParam('id');
      await axios(`${baseUrl}/shop/franchies/${id}`)
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
    await axios(`${baseUrl}/shop/franchies/${id}`)
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
      <Header name={'SHOP'} {...props} isBack={true} />
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
        {data.map((detail, i) => {
          return (
            <View key={i} style={Style.franchieslistView}>
              <TouchableOpacity
                style={Style.topcontainer}
                onPress={() =>
                  props.navigation.navigate('ViewCustomer', {
                    id: detail._id,
                  })
                }>
                <Text>{detail.s_name}</Text>
              </TouchableOpacity>
            </View>
          );
        })}

        {loading == false && data.length === 0 ? (
          <View style={Style.franchieslistView}>
            <View style={Style.topcontainer}>
              <Text>No Shop Available </Text>
            </View>
          </View>
        ) : null}
      </ScrollView>
      <DropdownAlert
        ref={ddlAlert}
        tapToCloseEnabled={true}
        updateStatusBar={false}
      />
    </View>
  );
}
