import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
const drawerIcon = require('../../../image/applogo.png');
const window = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';
import sizes from '../config/sizes';
export default function Header(props) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('users')
      .then(users => {
        if (users !== null) {
          let signInUsers = JSON.parse(users);
          setUsers({
            users: signInUsers,
          });
        } else {
          setUsers({
            users: [],
          });
        }
      })
      .catch(err => {
        console.log('getting users error', err);
      });
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View
          style={{
            marginTop: window.height * 0.1,
            marginBottom: window.height * 0.1,
          }}>
          <Image source={drawerIcon} style={{alignSelf: 'center'}} />
        </View>
        <View style={styles.sub}>
          {users.users && users.users.length > 0 ? (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('DashboardStack');
              }}
              style={styles.maincontainer}>
              <View style={styles.iconcontainer}>
                <Icon size={17} name="aperture" />
              </View>
              <View style={styles.titlecontainer}>
                <Text style={styles.titletxt}>Dashboard</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Login')}
              style={styles.maincontainer}>
              <View style={styles.iconcontainer}>
                <Icon size={17} name="log-in" />
              </View>
              <View style={styles.titlecontainer}>
                <Text style={styles.titletxt}>Login</Text>
              </View>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Home')}
            style={styles.maincontainer}>
            <View style={styles.iconcontainer}>
              <Icon size={17} name="home" />
            </View>
            <View style={styles.titlecontainer}>
              <Text style={styles.titletxt}>Home</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('AboutUs')}
            style={styles.maincontainer}>
            <View style={styles.iconcontainer}>
              <Icon size={17} name="heart" />
            </View>
            <View style={styles.titlecontainer}>
              <Text style={styles.titletxt}>About Us </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('ContactUs')}
            style={styles.maincontainer}>
            <View style={styles.iconcontainer}>
              <Icon size={17} name="phone" />
            </View>
            <View style={styles.titlecontainer}>
              <Text style={styles.titletxt}>Contact Us </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => props.navigation.navigate('Gallery')}
            style={styles.maincontainer}>
            <View style={styles.iconcontainer}>
              <Icon size={17} name="grid" />
            </View>
            <View style={styles.titlecontainer}>
              <Text style={styles.titletxt}>Gallery</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('VideoScreen')}
            style={styles.maincontainer}>
            <View style={styles.iconcontainer}>
              <Icon size={17} name="video" />
            </View>
            <View style={styles.titlecontainer}>
              <Text style={styles.titletxt}>Video</Text>
            </View>
          </TouchableOpacity>
          {users.users && users.users.length > 0 ? (
            <TouchableOpacity
              onPress={async () => {
                await AsyncStorage.removeItem('users');
                setUsers({users: []});
                props.navigation.navigate('Login');
              }}
              style={styles.maincontainer}>
              <View style={styles.iconcontainer}>
                <Icon size={17} name="log-out" />
              </View>
              <View style={styles.titlecontainer}>
                <Text style={styles.titletxt}>Logout</Text>
              </View>
            </TouchableOpacity>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sub: {
    justifyContent: 'center',
    marginTop: window.height * 0.0008,
  },

  maincontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 20,
    marginVertical: 15,
  },

  iconcontainer: {
    flex: 1.5,
    justifyContent: 'center',
  },

  titlecontainer: {
    flex: 8.5,
    justifyContent: 'center',
  },

  titletxt: {
    fontSize: sizes.h8,
  },
});
