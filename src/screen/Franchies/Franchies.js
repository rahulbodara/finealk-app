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
import franchiesreducer from '../../redux/franchiesreducer';
import Style from '../../Style/Style';
import axios from 'axios';
import Searchbar from '../../components/Searchbar/Searchbar';
import {baseUrl} from '../../baseUrl/baseUrl';
import TopHeader from '../../components/TopHeader/TopHeader';
const initialState = '';

export default function Franchies(props) {
  const [franchiesData, setFranchiesData] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isActive] = useState(false);
  const [filteredData, setstateFilter] = useState([]);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
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
          setLoading(false);
          setFranchiesData(result.data.data);
        })
        .catch(function(error) {
          console.log('ee', error);
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
  }, [franchiesData]);

  const [state, dispatch] = useReducer(franchiesreducer, initialState);
  const ddlAlert = useRef();

  const Add = () => {
    props.navigation.navigate('Add');
  };

  const onRefresh = async () => {
    setRefreshing(true);
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
        setFranchiesData(result.data.data);
        setRefreshing(false);
      })
      .catch(function(error) {
        console.log('ee', error);
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
      .put(`${baseUrl}/franchise/${id}`, data)
      .then(function(response) {
        setLoading(false);
        dispatch({
          type: 'DELETE_FRANCHICES',
          franchiesData,
        });
        setTimeout(() => {
          ddlAlert.current.alertWithType(
            'success',
            '',
            'Franchies  Details Delete Succesful',
          );
        }, 500);
      })
      .catch(function(error) {
        setLoading(false);
      });
  };

  const searchFilterFunction = text => {
    let filteredData = franchiesData.filter(function(item) {
      const itemData = `${item.f_name.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    setFilterText(text);
    setstateFilter(filteredData);
  };

  return (
    <View style={Style.topcontainer}>
      <TopHeader />
      <Header name={'FRANCHIES'} {...props} isBack={true} />
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
              <Text>No Franchies Available </Text>
            </View>
          </View>
        ) : null}
        {filteredData.map((detail, i) => {
          return (
            <View key={i}>
              <View style={Style.franchieslistView}>
                <View style={Style.topcontainer}>
                  <Text style={{fontSize: 16}}>{detail.f_name}</Text>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate('ViewFranchies', {
                      id: detail._id,
                    })
                  }>
                  <AntDesign name="eye" size={25} color={'#00BFFF'} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{paddingHorizontal: 20}}
                  onPress={() =>
                    props.navigation.navigate('EditFranchies', {
                      id: detail._id,
                      fname: detail.f_name,
                      flocation: detail.f_location,
                      fusername : detail.name,
                      fmobile : detail.mobile,
                      femail : detail.email,
                      fbanknumber : detail.bank_number,
                      fifsccode : detail.ifsc_code,
                      data: detail,
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
