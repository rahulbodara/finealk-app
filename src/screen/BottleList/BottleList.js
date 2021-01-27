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
import bottleListReducer from '../../redux/bottleListReducer';
import Style from '../../Style/Style';
import axios from 'axios';
import Searchbar from '../../components/Searchbar/Searchbar';
import {baseUrl} from '../../baseUrl/baseUrl';
import TopHeader from '../../components/TopHeader/TopHeader';
const initialState = '';

export default function BottleList(props) {
  const [bottleData, setBottleData] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isActive] = useState(false);
  const [filteredData, setstateFilter] = useState([]);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      await axios(`${baseUrl}/bottle`)
        .then(result => {
          let temp = [];
          for (let i = 0; i < result.data.data.length; i++) {
            let data = result.data.data[i];
            if (data.isActive) {
              temp.push(data);
            }
          }

          result.data.data = temp;
          setLoading(false);
          setBottleData(result.data.data);
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
  }, [bottleData]);

  const [state, dispatch] = useReducer(bottleListReducer, initialState);
  const ddlAlert = useRef();

  const Add = () => {
    props.navigation.navigate('AddBottleList');
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await axios(`${baseUrl}/bottle`)
      .then(result => {
        let temp = [];
        for (let i = 0; i < result.data.data.length; i++) {
          let data = result.data.data[i];
          if (data.isActive) {
            temp.push(data);
          }
        }
        result.data.data = temp;
        setBottleData(result.data.data);
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
      .put(`${baseUrl}/bottle/${id}`, data)
      .then(function(response) {
        setLoading(false);
        dispatch({
          type: 'DELETE_BOTTLE_LIST',
          bottleData,
        });
        setTimeout(() => {
          ddlAlert.current.alertWithType(
            'success',
            '',
            'Bottle  Details Delete Succesful',
          );
        }, 500);
      })
      .catch(function(error) {
        setLoading(false);
        console.log('e', error.response);
      });
  };

  const searchFilterFunction = text => {
    let filteredData = bottleData.filter(function(item) {
      const itemData = `${item.shop_name.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    setFilterText(text);
    setstateFilter(filteredData);
  };

  return (
    <View style={Style.topcontainer}>
      <TopHeader />
      <Header name={'BOTTLE'} {...props} isBack={true} />
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
              <Text>No Bottle Available </Text>
            </View>
          </View>
        ) : null}
        {filteredData.map((detail, i) => {
          return (
            <View key={i}>
              <View style={Style.franchieslistView}>
                <View style={Style.topcontainer}>
                  <Text style={{fontSize: 16}}>{detail.shop_name}</Text>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate('ViewBottleList', {
                      id: detail._id,
                    })
                  }>
                  <AntDesign name="eye" size={25} color={'#00BFFF'} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{paddingHorizontal: 20}}
                  onPress={() =>
                    props.navigation.navigate('EditBottleList', {
                      id: detail._id,
                      fshopname: detail.shop_name,
                      fnumberbottle: detail.number_of_bottle,
                      fshopid: detail.shop_id,
                    })
                  }>
                  <AntDesign name="edit" size={25} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Delete(detail._id)}>
                  <AntDesign name="delete" size={25} color={'red'} />
                </TouchableOpacity>
              </View>
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
