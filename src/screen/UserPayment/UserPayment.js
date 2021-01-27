import React, {useState, useRef, useReducer, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  Dimensions,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import Header from '../../components/Header/Header';
import Loader from '../../components/Loader/Loader';
import Style from '../../Style/Style';
import axios from 'axios';
import moment from 'moment';
import {baseUrl} from '../../baseUrl/baseUrl';
import {Table, Row, Rows} from 'react-native-table-component';
import paymentreducer from '../../redux/paymentreducer';
import TopHeader from '../../components/TopHeader/TopHeader';
import ViewShot from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import RNImageToPdf from 'react-native-image-to-pdf';
import LinearGradient from 'react-native-linear-gradient';
import Mailer from 'react-native-mail';
const initialState = '';
const window = Dimensions.get('window');
export default function UserPayment(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [tableHead] = useState([
    'Name',
    'Amount',
    'Type',
    'Total Amount',
    'Date',
  ]);
  const [widthArr] = useState([65, 65, 45, 90, 90]);
  const [state, dispatch] = useReducer(paymentreducer, initialState);
  const viewShot = useRef();
  const id = props.navigation.getParam('id');
  const email = props.navigation.getParam('email');
  useEffect(() => {
    setLoading(true);
    viewShot.current.capture().then(uri => {});
    const fetchUserPayment = async () => {
      await axios(`${baseUrl}/account/${id}`)
        .then(result => {
          setData(result.data.data.dataList);
          dispatch({
            type: 'GET_USER_PAYMENT',
            data,
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
    fetchUserPayment();
  }, []);

  const ddlAlert = useRef();

  const getTableData = item => {
    const dataValue = [];
    for (let i = 0; i < item.length; i++) {
      const paymentJson = {};
      paymentJson.name = item[i].name ? item[i].name : ' - ';
      paymentJson.amount = item[i].amount ? item[i].amount : '-';
      paymentJson.total_amount =
        item[i].total_amount == '' ? '' : item[i].total_amount;
      paymentJson.updateDate = moment(
        item[i].updatedAt === '' ? '' : item[i].updatedAt,
      ).format('DD-MM-YYYY hh:mm:SS');
      paymentJson.type = item[i].credit == undefined ? 'Credit' : 'Debit';
      dataValue.push([
        paymentJson.name,
        paymentJson.amount,
        paymentJson.type,
        paymentJson.total_amount,
        paymentJson.updateDate,
      ]);
    }
    return dataValue;
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await axios(`${baseUrl}/account/${id}`)
      .then(result => {
        setData(result.data.data.dataList);
        dispatch({
          type: 'GET_USER_PAYMENT',
          data,
        });
        setRefreshing(false);
      })
      .catch(function(error) {
        setRefreshing(false);
        setTimeout(() => {
          ddlAlert.current.alertWithType('error', '', error.message);
        }, 500);
      });
  };

  const save = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'for download pdf',
          message: '',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      } else {
      }
    } catch (err) {}
    viewShot.current.capture().then(async uri => {
      const options = {
        imagePaths: [uri.replace('file://', '')],
        name: `${+new Date()}.pdf`,
        maxSize: {width: 900, height: 900},
        quality: 0.7,
      };

      const pdfFilePath = await RNImageToPdf.createPDFbyImages(options);
      let path = pdfFilePath.filePath;

      if (Platform.OS !== 'ios') {
        path = `${
          RNFS.ExternalStorageDirectoryPath
        }/InvoiceBill_${Number()}.pdf`;
        try {
          await RNFS.copyFile(pdfFilePath.filePath, path).then(() => {
            ddlAlert.current.alertWithType(
              'success',
              '',
              'file InvoiceBill_.pdf download successfully',
            );
            // setTimeout(() => {
            //   props.navigation.navigate('Dashboard');
            // }, 1000);
          });
        } catch (error) {
          return;
        }
      }
      Mailer.mail(
        {
          subject: 'Invoice Receipt',
          recipients: [email],
          body: '<b>Your Receipt </b>',
          isHTML: true,
          attachment: {
            path,
            type: 'pdf',
            name: `${+new Date()}.pdf`,
          },
        },
        (error, event) => {
          Alert.alert(
            error,
            event,
            [
              {
                text: 'Ok',
                onPress: () => console.log('OK: Email Error Response'),
              },
              {
                text: 'Cancel',
                onPress: () => console.log('CANCEL: Email Error Response'),
              },
            ],
            {cancelable: true},
          );
        },
      );
    });
  };
  const UserPaymentResponse = data;

  let tableData = getTableData(UserPaymentResponse);

  return (
    <View style={Style.topcontainer}>
      <TopHeader />
      <Header name={'PAYMENT DETAIL'} {...props} isBack={true} />
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
        <ViewShot
          ref={viewShot}
          options={{format: 'jpg', quality: 0.9}}
          style={{
            backgroundColor: '#fff',
            marginHorizontal: 5,
            marginVertical: 10,
          }}>
          {loading == false && data.length === 0 ? (
            <View style={Style.franchieslistView}>
              <View style={Style.topcontainer}>
                <Text>No User Payment Available </Text>
              </View>
            </View>
          ) : (
            <View
              style={{
                marginTop: window.height * 0.05,
                marginHorizontal: 5,
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
                      style={{height: 50}}
                      textStyle={Style.text}
                    />
                  </Table>
                </Table>
              </ScrollView>
            </View>
          )}
        </ViewShot>
        {data.length > 0 ? (
          <View>
            <TouchableOpacity
              onPress={() => save()}
              style={Style.franchiesbtnShadow}>
              <LinearGradient
                colors={['#00BFFF', '#00BFFF']}
                style={Style.paymentbtn}
                start={{x: 0, y: 0.0}}
                end={{x: 1.2, y: 0.0}}>
                <Text style={{color: '#fff', fontWeight: '500', fontSize: 16}}>
                  Dowanload Invoice
                </Text>
              </LinearGradient>
            </TouchableOpacity>
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
