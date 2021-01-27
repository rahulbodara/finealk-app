import React, {useState, useRef, useReducer, useEffect} from 'react';
import {View, Text, ScrollView, RefreshControl, Dimensions} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import Header from '../../components/Header/Header';
import Loader from '../../components/Loader/Loader';
import Style from '../../Style/Style';
import axios from 'axios';
import {baseUrl} from '../../baseUrl/baseUrl';
import {Table, Row, Rows} from 'react-native-table-component';
import TopHeader from '../../components/TopHeader/TopHeader';
import Icon from 'react-native-vector-icons/FontAwesome';
import attendancereportreducer from '../../redux/attedancereportreducer';
import moment from 'moment';
const initialState = '';
const window = Dimensions.get('window');
export default function FranchiesAttendanceReport(props) {
  const [attendancedata, setAttendancedata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [tableHead] = useState(['Date', 'Attendance', 'Time']);
  const [widthArr] = useState([90, 120, 120]);
  const [state, dispatch] = useReducer(attendancereportreducer, initialState);
  const id = props.navigation.getParam('id');

  useEffect(() => {
    setLoading(true);
    const fetchAttendanceReport = async () => {
      await axios(`${baseUrl}/attendence/${id}`)
        .then(result => {
          setAttendancedata(result.data.data);
          dispatch({
            type: 'GET_USER_ATTENDENCE_REPORT',
            attendancedata,
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
    fetchAttendanceReport();
  }, []);

  const ddlAlert = useRef();

  const getTableData = item => {
    const dataValue = [];

    item.sort((a, b) => b.date.localeCompare(a.date));

    for (let i = 0; i < item.length; i++) {
      const attendancerportjson = {};
      attendancerportjson.is_true = item[i].is_true ? (
        <Icon name="check" style={{left: 75}} />
      ) : (
        <Icon name="times" style={{left: 75}} />
      );
      (attendancerportjson.Date = item[i].date === '' ? '' : item[i].date),
        (attendancerportjson.updateDate = moment(
          item[i].updatedAt === '' ? '' : item[i].updatedAt,
        ).format('hh:mm:SS'));
      dataValue.push([
        attendancerportjson.Date,
        attendancerportjson.is_true,
        attendancerportjson.updateDate,
      ]);
    }
    return dataValue;
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await axios(`${baseUrl}/attendence/${id}`)
      .then(result => {
        setAttendancedata(result.data.data);
        dispatch({
          type: 'GET_USER_ATTENDENCE_REPORT',
          attendancedata,
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

  const AttendanceResponse = attendancedata;

  let tableData = getTableData(AttendanceResponse);

  return (
    <View style={Style.topcontainer}>
      <TopHeader />
      <Header name={'ATTENDANCE REPORT'} {...props} isBack={true} />
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
        {loading == false && attendancedata.length === 0 ? (
          <View style={Style.franchieslistView}>
            <View style={Style.topcontainer}>
              <Text>No Attendance Report Available </Text>
            </View>
          </View>
        ) : (
          <View
            style={{
              marginTop: window.height * 0.05,
              marginHorizontal: 25,
              marginVertical: 10,
            }}>
            <ScrollView style={Style.dataWrapper} horizontal={true}>
              <Table>
                <Row
                  data={tableHead}
                  widthArr={widthArr}
                  style={{height: 50, backgroundColor: '#E4EDF1'}}
                  textStyle={Style.text}
                />

                <Table>
                  <Rows
                    data={tableData}
                    widthArr={widthArr}
                    style={{height: 50, alignSelf: 'center'}}
                    textStyle={Style.text}
                  />
                </Table>
              </Table>
            </ScrollView>
          </View>
        )}
      </ScrollView>
      <DropdownAlert
        ref={ddlAlert}
        tapToCloseEnabled={true}
        updateStatusBar={false}
      />
    </View>
  );
}
