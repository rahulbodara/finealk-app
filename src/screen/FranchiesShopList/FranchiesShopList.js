import React, {useState, useRef, useReducer, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DropdownAlert from 'react-native-dropdownalert';
import Header from '../../components/Header/Header';
import Loader from '../../components/Loader/Loader';
import Style from '../../Style/Style';
import axios from 'axios';
import {baseUrl} from '../../baseUrl/baseUrl';
import shopreducer from '../../redux/shopreducer';
import Searchbar from '../../components/Searchbar/Searchbar';
import TopHeader from '../../components/TopHeader/TopHeader';
import AsyncStorage from '@react-native-community/async-storage';
const initialState = '';

export default function FranchiesShopList(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isActive] = useState(false);
  const [shopData, setShopData] = useState([]);
  const [filteredData, setstateFilter] = useState([]);
  const [filterText, setFilterText] = useState('');
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const franchiseId = await AsyncStorage.getItem('franchiseId');
      await axios(`${baseUrl}/shop/franchies/${franchiseId}`)
        .then(result => {
          console.log('shop result', result);
          let temp = [];
          for (let i = 0; i < result.data.data.length; i++) {
            let data = result.data.data[i];
            if (data.isActive) {
              temp.push(data);
            }
          }

          result.data.data = temp;
          setShopData(result.data.data);
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

  useEffect(() => {
    if (filterText === '') {
      searchFilterFunction('');
    }
  }, [shopData]);
  const [state, dispatch] = useReducer(shopreducer, initialState);
  const ddlAlert = useRef();

  const Add = () => {
    props.navigation.navigate('AddFranchiesShop');
  };

  const onRefresh = async () => {
    setRefreshing(true);
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
        setRefreshing(false);
      })
      .catch(function(error) {
        setRefreshing(false);
        setTimeout(() => {
          ddlAlert.current.alertWithType('error', '', error.message);
        }, 500);
      });
  };

  const Delete = async id => {
    const data = {
      isActive: isActive,
    };

    setLoading(true);
    await axios
      .put(`${baseUrl}/shop/${id}`, data)
      .then(function(response) {
        setLoading(false);
        dispatch({
          type: 'DELETE_SHOP',
          shopData,
        });
        setTimeout(() => {
          ddlAlert.current.alertWithType(
            'success',
            '',
            'Shop Details Delete Succesful',
          );
        }, 500);
      })
      .catch(function(error) {
        setLoading(false);
      });
  };

  const searchFilterFunction = text => {
    let filteredData = shopData.filter(function(item) {
      const itemData = `${item.s_name.toUpperCase()}`;

      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    setFilterText(text);
    setstateFilter(filteredData);
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
        <Searchbar
          value={filterText}
          onChangeText={value => searchFilterFunction(value)}
        />
        {loading == false && filteredData.length === 0 ? (
          <View style={Style.franchieslistView}>
            <View style={Style.topcontainer}>
              <Text>No Shop Available </Text>
            </View>
          </View>
        ) : null}
        {filteredData.map((detail, i) => {
          return (
            <View key={i} style={Style.franchieslistView}>
              <View style={Style.topcontainer}>
                <Text style={{fontSize: 16}}>{detail.s_name}</Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('ViewShop', {
                    id: detail._id,
                  })
                }>
                <AntDesign name="eye" size={25} color={'#00BFFF'} />
              </TouchableOpacity>
              <TouchableOpacity style={{paddingHorizontal: 20}}>
                <AntDesign
                  name="edit"
                  size={25}
                  onPress={() =>
                    props.navigation.navigate('EditFranchiesShop', {
                      id: detail._id,
                      s_name: detail.s_name,
                      s_location: detail.s_location,
                      sname: detail.name,
                      mobile: detail.mobile,
                      email: detail.email,
                      bank_number: detail.bank_number,
                      ifsc_code: detail.ifsc_code,
                      franchies: detail.franchies,
                      data: detail,
                    })
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Delete(detail._id)}>
                <AntDesign name="delete" size={25} color={'red'} />
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
      <TouchableOpacity
        onPress={() => Add()}
        style={{position: 'absolute', right: 10, bottom: 10}}>
        <AntDesign name="pluscircle" size={40} color={'#00BFFF'} />
      </TouchableOpacity>
      <DropdownAlert
        ref={ddlAlert}
        tapToCloseEnabled={true}
        updateStatusBar={false}
      />
    </View>
  );
}
