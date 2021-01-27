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

export default function ViewFranchiesBottleList(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const id = props.navigation.getParam('id');
      await axios(`${baseUrl}/bottle/${id}`)
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
    await axios(`${baseUrl}/bottle/${id}`)
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
      <Header name={'BOTTLE DETAIL'} {...props} isBack={true} />
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
              <View style={Style.topcontainer}>
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    marginTop: 10,
                  }}>
                  <Text style={{flex: 0.5}}>Shop Name</Text>
                  <Text style={{flex: 0.8}}>{detail.shop_name}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    marginTop: 10,
                  }}>
                  <Text style={{flex: 0.5}}>Number of Bottle</Text>
                  <Text style={{flex: 0.8}}>{detail.number_of_bottle}</Text>
                </View>
              </View>
            </View>
          );
        })}

        {loading == false && data.length === 0 ? (
          <View style={Style.franchieslistView}>
            <View style={Style.topcontainer}>
              <Text>No Bottle Details Available </Text>
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
