import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Header from '../../components/Header/Header';
import DatePicker from 'react-native-datepicker';
const window = Dimensions.get('window');
import borderRadius, {padding, margin} from '../../components/config/spacing';
import LinearGradient from 'react-native-linear-gradient';
import TopHeader from '../../components/TopHeader/TopHeader';
import lightColors from '../../components/config/colors';
export default function Report(props) {
  const [reportdate, setStartDate] = useState(new Date());
  const data = [
    {name: 'Customer 1'},
    {name: 'Customer 2'},
    {name: 'Customer 3'},
  ];
  const save = () => {};

  return (
    <View style={{flex: 1}}>
      <TopHeader />
      <Header name={'REPORT'} {...props} isBack={true} />
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'column', paddingHorizontal: 20}}>
            <Text style={styles.fromtextcontainer}>From Date</Text>
            <DatePicker
              style={styles.datepickercontainer}
              date={reportdate}
              mode="date"
              placeholder="From Date"
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
              onDateChange={reportdate => setStartDate(reportdate)}
            />
          </View>
        </View>
        <TouchableOpacity onPress={() => save()} style={styles.btnShadow}>
          <LinearGradient
            colors={['#00BFFF', '#00BFFF']}
            style={styles.btn}
            start={{x: 0.0, y: 0.0}}
            end={{x: 1.2, y: 0.0}}>
            <Text style={{color: '#fff', fontWeight: '500', fontSize: 16}}>
              Save
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {data.map((detail, i) => {
          return (
            <View key={i} style={styles.listView}>
              <View style={{flex: 1}}>
                <Text style={{fontSize: 16}}>{detail.name}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fromtextcontainer: {
    marginTop: window.height * 0.05,
    fontSize: 16,
    marginLeft: window.width * 0.02,
  },

  textcontainer: {
    fontSize: 16,
    marginLeft: window.width * 0.02,
  },

  totextcontaner: {
    marginTop: window.height * 0.05,
    fontSize: 16,
    marginLeft: window.width * 0.015,
  },

  datepickercontainer: {
    marginTop: window.height * 0.015,
  },

  btn: {
    height: 40,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    margin: margin.big,
    borderRadius: borderRadius.large,
    backgroundColor: lightColors.white,
    padding: padding.big,
  },
  btnShadow: {
    shadowColor: '#aaa',
    alignItems: 'center',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 1,
  },

  listView: {
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: borderRadius.large,
    backgroundColor: lightColors.white,
    padding: padding.small,
    shadowColor: '#aaa',
    flexDirection: 'row',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 3,
  },
});
