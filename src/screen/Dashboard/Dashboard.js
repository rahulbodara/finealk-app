import React, {useState, useEffect, useRef, useReducer} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  RefreshControl,
} from 'react-native';
import Header from '../../components/Header/Header';
import {Icon} from '../../components/icons/icon';
import AsyncStorage from '@react-native-community/async-storage';
import TopHeader from '../../components/TopHeader/TopHeader';
import {padding, borderRadius} from '../../components/config/spacing';
import lightColors from '../../components/config/colors';
import paymentreducer from '../../redux/paymentreducer';
import axios from 'axios';
import {baseUrl} from '../../baseUrl/baseUrl';
const initialState = '';

export default function Dashboard(props) {
  const [role, SetRoleName] = useState();
  const [remainbottle, setTotalBottledta] = useState([]);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [state, dispatch] = useReducer(paymentreducer, initialState);
  useEffect(() => {
    const fetchRole = async () => {
      const role = await AsyncStorage.getItem('roleName');
      SetRoleName(role);
    };
    const fetchTotalAmount = async () => {
      const UserId = await AsyncStorage.getItem('UserId');

      await axios(`${baseUrl}/account/${UserId}`)
        .then(async result => {
          console.log('Total Amount Result', result);
          const totalAmount = result.data.data.totalAmount;
          console.log('total Amount', totalAmount);
          await AsyncStorage.setItem('totalAmount', totalAmount);
          setData(result.data.data);
          dispatch({
            type: 'GET_USER_PAYMENT',
            data,
          });
        })
        .catch(function(error) {
          console.log('ee', error);
        });
    };
    const fetchRemainBottle = async () => {
      const shopID = await AsyncStorage.getItem('shopId');
      console.log('shopID', shopID);
      await axios(`${baseUrl}/bottlecount/shop/${shopID}`)
        .then(result => {
          console.log('=== response remainn bottle', result);
          setTotalBottledta(result.data.data);
        })
        .catch(function(error) {
          console.log('error', error);
        });
    };
    fetchRole();
    fetchRemainBottle();
    fetchTotalAmount();
  }, [role]);

  const onRefresh = () => {
    setRefreshing(true);
    const fetchTotalAmount = async () => {
      const UserId = await AsyncStorage.getItem('UserId');

      await axios(`${baseUrl}/account/${UserId}`)
        .then(result => {
          setRefreshing(false);
          setData(result.data.data);
          dispatch({
            type: 'GET_USER_PAYMENT',
            data,
          });
        })
        .catch(function(error) {
          setRefreshing(false);
          console.log('ee', error);
        });
    };
    const fetchRemainBottle = async () => {
      const shopID = await AsyncStorage.getItem('shopId');
      console.log('shopID', shopID);
      await axios(`${baseUrl}/bottlecount/shop/${shopID}`)
        .then(result => {
          console.log('=== response remainn bottle', result);
          setTotalBottledta(result.data.data);
        })
        .catch(function(error) {
          console.log('error', error);
        });
    };
    fetchTotalAmount();
    fetchRemainBottle();
  };

  return (
    <View style={{flex: 1}}>
      <TopHeader />
      <Header name={'DASHBORAD'} {...props} />
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
        <KeyboardAvoidingView>
          <View style={{flex: 1}}>
            {role === 'Shop' ? (
              <View>
                <View
                  style={{
                    borderRadius: borderRadius.large,
                    backgroundColor: lightColors.white,
                    shadowColor: '#aaa',
                    flexDirection: 'row',
                  }}>
                  <View style={styles.amountgridview}>
                    <View>
                      <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                        Total Amount
                      </Text>
                    </View>
                    <View>
                      <Text style={{fontSize: 16, alignSelf: 'center'}}>
                        {data.totalAmount === '' ? '' : data.totalAmount}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.amountgridview}>
                    <View>
                      <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                        Total Remaining Bottle
                      </Text>
                    </View>
                    <View>
                      <Text style={{fontSize: 16, alignSelf: 'center'}}>
                        {remainbottle.count === '' ? '' : remainbottle.count}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{flexDirection: 'row', margin: 20}}>
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate('ShopPage')}
                    style={[styles.loginView, {marginRight: 8}]}>
                    <View style={styles.gridview}>
                      <View style={styles.containerview}>
                        <View style={styles.imagebackview}>
                          <Icon size={30} name="shopping-bag" color="white" />
                        </View>
                      </View>
                      <View style={styles.containerview}>
                        <Text style={{fontSize: 16, alignSelf: 'center'}}>
                          Customer
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate('ShopAttendance')}
                    style={[styles.loginView, {marginLeft: 8}]}>
                    <View style={styles.gridview}>
                      <View style={styles.containerview}>
                        <View style={styles.imagebackview}>
                          <Icon size={30} name="trello" color="white" />
                        </View>
                      </View>
                      <View style={styles.containerview}>
                        <Text style={{fontSize: 16, alignSelf: 'center'}}>
                          Attendance
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}

            {role === null ? (
              <Text
                style={{
                  marginLeft: 15,
                  marginTop: 15,
                }}>
                {' '}
                No Dashboard Available{' '}
              </Text>
            ) : null}

            {role === 'Super Admin' ? (
              <View>
                <View style={styles.amountview}>
                  <View style={styles.amountgridview}>
                    <View>
                      <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                        Total Amount
                      </Text>
                    </View>
                    <View>
                      <Text style={{fontSize: 16, alignSelf: 'center'}}>
                        {data.totalAmount === '' ? '' : data.totalAmount}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{flexDirection: 'row', margin: 20}}>
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate('Franchies')}
                    style={[styles.loginView, {marginRight: 8}]}>
                    <View style={styles.gridview}>
                      <View style={styles.containerview}>
                        <View style={styles.imagebackview}>
                          <Icon
                            size={30}
                            name="codepen"
                            style={styles.imagecontainer}
                            color="white"
                          />
                        </View>
                      </View>
                      <View style={styles.containerview}>
                        <Text style={{fontSize: 16, alignSelf: 'center'}}>
                          Franchies
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate('Payment')}
                    style={[styles.loginView, {marginLeft: 8}]}>
                    <View style={styles.gridview}>
                      <View style={styles.containerview}>
                        <View style={styles.imagebackview}>
                          <Icon size={30} name="credit-card" color="white" />
                        </View>
                      </View>
                      <View style={styles.containerview}>
                        <Text style={{fontSize: 16, alignSelf: 'center'}}>
                          Payment
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={{flexDirection: 'row', marginHorizontal: 20}}>
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate('Attendance')}
                    style={[styles.loginView, {marginRight: 8}]}>
                    <View style={styles.gridview}>
                      <View style={styles.containerview}>
                        <View style={styles.imagebackview}>
                          <Icon size={30} name="trello" color="white" />
                        </View>
                      </View>
                      <View style={styles.containerview}>
                        <Text style={{fontSize: 16, alignSelf: 'center'}}>
                          Attendance
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate('UserList')}
                    style={[styles.userview, {marginLeft: 8}]}>
                    <View style={styles.gridview}>
                      <View style={styles.containerview}>
                        <View style={styles.imagebackview}>
                          <Icon size={30} name="users" color="white" />
                        </View>
                      </View>
                      <View style={styles.containerview}>
                        <Text style={{fontSize: 16, alignSelf: 'center'}}>
                          User
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', margin: 20}}>
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate('ShopList')}
                    style={[styles.loginView, {marginRight: 8}]}>
                    <View style={styles.gridview}>
                      <View style={styles.containerview}>
                        <View style={styles.imagebackview}>
                          <Icon size={30} name="shopping-bag" color="white" />
                        </View>
                      </View>
                      <View style={styles.containerview}>
                        <Text style={{fontSize: 16, alignSelf: 'center'}}>
                          Shop
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate('UsersDetails')}
                    style={[styles.loginView, {marginLeft: 8}]}>
                    <View style={styles.gridview}>
                      <View style={styles.containerview}>
                        <View style={styles.imagebackview}>
                          <Icon size={30} name="user-check" color="white" />
                        </View>
                      </View>
                      <View style={styles.containerview}>
                        <Text style={{fontSize: 16, alignSelf: 'center'}}>
                          Account
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', margin: 20}}>
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate('BottleList')}
                    style={[styles.shopuserview, {marginRight: 8, bottom: 15}]}>
                    <View style={styles.gridview}>
                      <View style={styles.containerview}>
                        <View style={styles.imagebackview}>
                          <Icon size={30} name="package" color="white" />
                        </View>
                      </View>
                      <View style={styles.containerview}>
                        <Text style={{fontSize: 16, alignSelf: 'center'}}>
                          Bottle List
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}

            {role === 'Franchies' ? (
              <View>
                <View
                  style={{
                    borderRadius: borderRadius.large,
                    backgroundColor: lightColors.white,
                    shadowColor: '#aaa',
                    flexDirection: 'row',
                  }}>
                  <View style={styles.amountgridview}>
                    <View>
                      <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                        Total Amount
                      </Text>
                    </View>
                    <View>
                      <Text style={{fontSize: 16, alignSelf: 'center'}}>
                        {data.totalAmount === '' ? '' : data.totalAmount}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.amountgridview}>
                    <View>
                      <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                        Total Remaining Bottle
                      </Text>
                    </View>
                    <View>
                      <Text style={{fontSize: 16, alignSelf: 'center'}}>
                        {remainbottle.count === '' ? '' : remainbottle.count}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{flexDirection: 'row', margin: 20}}>
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate('FranchiesShopList')
                    }
                    style={[styles.loginView, {marginRight: 8}]}>
                    <View style={styles.gridview}>
                      <View style={styles.containerview}>
                        <View style={styles.imagebackview}>
                          <Icon
                            size={30}
                            name="shopping-bag"
                            style={styles.imagecontainer}
                            color="white"
                          />
                        </View>
                      </View>
                      <View style={styles.containerview}>
                        <Text style={{fontSize: 16, alignSelf: 'center'}}>
                          Shop
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate('FranchiesBottleList')
                    }
                    style={[styles.loginView, {marginLeft: 8}]}>
                    <View style={styles.gridview}>
                      <View style={styles.containerview}>
                        <View style={styles.imagebackview}>
                          <Icon size={30} name="package" color="white" />
                        </View>
                      </View>
                      <View style={styles.containerview}>
                        <Text style={{fontSize: 16, alignSelf: 'center'}}>
                          Bottle List
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}

            {role === 'Customer' ? (
              <View>
                <View style={styles.amountview}>
                  <View style={styles.amountgridview}>
                    <View>
                      <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                        Total Amount
                      </Text>
                    </View>
                    <View>
                      <Text style={{fontSize: 16, alignSelf: 'center'}}>
                        {data.totalAmount === '' ? '' : data.totalAmount}
                      </Text>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    marginHorizontal: 20,
                    marginBottom: 20,
                    marginTop: 20,
                  }}>
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate('CustomerAttendance')
                    }
                    style={[styles.loginView, {marginRight: 8}]}>
                    <View style={styles.gridview}>
                      <View style={styles.containerview}>
                        <View style={styles.imagebackview}>
                          <Icon size={30} name="trello" color="white" />
                        </View>
                      </View>
                      <View style={styles.containerview}>
                        <Text style={{fontSize: 16, alignSelf: 'center'}}>
                          Attendance
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate('CustomerPayment')}
                    style={[styles.loginView, {marginLeft: 8}]}>
                    <View style={styles.gridview}>
                      <View style={styles.containerview}>
                        <View style={styles.imagebackview}>
                          <Icon size={30} name="user-check" color="white" />
                        </View>
                      </View>
                      <View style={styles.containerview}>
                        <Text style={{fontSize: 16, alignSelf: 'center'}}>
                          Payment
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', margin: 20}}>
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate('Wallet')}
                    style={[styles.shopuserview, {marginRight: 8, bottom: 10}]}>
                    <View style={styles.gridview}>
                      <View style={styles.containerview}>
                        <View style={styles.imagebackview}>
                          <Icon
                            size={30}
                            name="user-check"
                            style={styles.imagecontainer}
                            color="white"
                          />
                        </View>
                      </View>
                      <View style={styles.containerview}>
                        <Text style={{fontSize: 16, alignSelf: 'center'}}>
                          Wallet
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  loginView: {
    borderRadius: borderRadius.large,
    backgroundColor: lightColors.white,
    shadowColor: '#aaa',
    flex: 1,
    padding: padding.big,
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 3,
  },

  imagebackview: {
    borderRadius: borderRadius.large,
    backgroundColor: lightColors.headercolor,
    padding: 20,
  },
  amountview: {
    borderRadius: borderRadius.large,
    backgroundColor: lightColors.white,
    shadowColor: '#aaa',
    margin: 5,
    marginTop: 15,
    alignSelf: 'center',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 3,
  },

  userview: {
    borderRadius: borderRadius.large,
    backgroundColor: lightColors.white,
    shadowColor: '#aaa',
    flex: 1,
    padding: padding.big,
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 3,
  },

  shopuserview: {
    borderRadius: 10,
    backgroundColor: lightColors.white,
    shadowColor: '#aaa',
    flex: 0.4,
    padding: padding.big,
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 3,
  },

  gridview: {
    flexDirection: 'column',
    alignSelf: 'center',
    justifyContent: 'center',
  },

  amountgridview: {
    flexDirection: 'column',
    alignSelf: 'center',
    justifyContent: 'center',
    margin: 25,
  },

  containerview: {
    marginTop: 10,
  },

  imagecontainer: {
    resizeMode: 'contain',
    width: 15,
    height: 15,
  },
});
