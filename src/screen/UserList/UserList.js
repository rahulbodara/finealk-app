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
import userreducer from '../../redux/userreducer';
import Style from '../../Style/Style';
import axios from 'axios';
import {baseUrl} from '../../baseUrl/baseUrl';
import Searchbar from '../../components/Searchbar/Searchbar';
import TopHeader from '../../components/TopHeader/TopHeader';
const initialState = '';

export default function UserList(props) {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [userData, setUserData] = useState([]);
  const [filteredData, setstateFilter] = useState([]);
  const [filterText, setFilterText] = useState('');
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
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
          setUserData(result.data.data);
          dispatch({
            type: 'GET_USER_SUCCESS',
            userData,
          });
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
  }, [userData]);

  const [state, dispatch] = useReducer(userreducer, initialState);
  const ddlAlert = useRef();
  const Add = () => {
    props.navigation.navigate('User');
  };

  const onRefresh = async () => {
    setRefreshing(true);
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
        setUserData(result.data.data);
        setRefreshing(false);
      })
      .catch(function(error) {
        setRefreshing(false);
        setTimeout(() => {
          ddlAlert.current.alertWithType('error', '', error.message);
        }, 500);
      });
  };

  const searchFilterFunction = text => {
    let filteredData = userData.filter(function(item) {
      const itemData = `${item.first_name.toUpperCase()}`;

      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    setFilterText(text);
    setstateFilter(filteredData);
  };

  return (
    <View style={Style.topcontainer}>
      <TopHeader />
      <Header name={'USER'} {...props} isBack={true} />
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
              <Text>No User Available </Text>
            </View>
          </View>
        ) : null}
        {filteredData.map((detail, i) => {
          return (
            <View key={i} style={Style.franchieslistView}>
              <TouchableOpacity
                style={Style.topcontainer}
                onPress={() =>
                  props.navigation.navigate('UserView', {
                    userdetails: detail,
                  })
                }>
                <Text style={{fontSize: 16}}>{detail.first_name}</Text>
                <Text style={{fontSize: 16}}>{detail.email}</Text>
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
