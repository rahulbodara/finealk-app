import {Dimensions} from 'react-native';
import sizes from '../components/config/sizes';
import {padding, margin, borderRadius} from '../components/config/spacing';
import lightColors from '../components/config/colors';
const window = Dimensions.get('window');
export default {
  topcontainer: {
    flex: 1,
  },

  walletcontainer :{
    flex : 1,
    alignSelf : 'center'
  },

  paymentbuttoncontainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 5,
    marginTop: window.height * 0.15,
    marginHorizontal: 16,
  },

  alkanationimage: {
    flexDirection: 'row',
    marginTop: window.height * 0.05,
  },

  alkaaimage: {
    width: 150,
    height: 100,
    resizeMode: 'contain',
    flex: 0.5,
  },

  alkabimage: {
    width: 150,
    height: 100,
    resizeMode: 'contain',
    flex: 0.5,
    left: window.width * 0.01,
  },

  paymentbutton: {
    borderWidth: 0.5,
    borderColor: '#A0A0A0',
    borderRadius: 3,
    paddingVertical: 5,
    paddingHorizontal: 20,
    justifyContent: 'center',
    height: window.height * 0.12,
  },

  contacttextcontainer: {
    marginLeft: window.width * 0.05,
    marginTop: window.height * 0.05,
    marginBottom: window.height * 0.02,
    fontSize: sizes.h7,
  },

  contactmaincontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: window.width * 0.02,
    marginVertical: 15,
  },

  emailiconconttainer: {
    justifyContent: 'center',
    flex: 2,
  },

  contacttextcontainers: {
    fontWeight: 'bold',
    marginLeft: window.width * 0.01,
  },

  contacticoncontainer: {
    flex: 1.5,
    justifyContent: 'center',
  },

  emailiconconttainer: {
    justifyContent: 'center',
    flex: 2,
  },

  contacttitlecontainer: {
    flex: 8,
    justifyContent: 'center',
    marginLeft: window.width * 0.01,
  },

  contacttitletxt: {
    fontSize: sizes.h8,
  },

  contactcontainer: {
    flex: 8.5,
    justifyContent: 'center',
    marginLeft: window.width * 0.02,
  },

  abouttextcontainer: {
    fontSize: sizes.h4,
    marginTop: window.height * 0.03,
    alignSelf: 'center',
    fontWeight: 'bold',
  },

  microcusteringtext: {
    fontWeight: 'bold',
    fontSize: sizes.h4,
    marginTop: window.height * 0.03,
    marginLeft: window.width * 0.1,
    marginRight: window.width * 0.1,
  },

  alkalitext: {
    fontWeight: 'bold',
    fontSize: sizes.h4,
    marginTop: window.height * 0.03,
    alignSelf: 'center',
    justifyContent: 'center',
  },

  antioxidationtext: {
    fontWeight: 'bold',
    fontSize: sizes.h4,
    marginTop: window.height * 0.03,
    marginLeft: window.width * 0.1,
    marginRight: window.width * 0.1,
  },

  directorname: {
    fontWeight: 'bold',
    marginLeft: window.width * 0.025,
    marginTop: window.height * 0.01,
  },

  descriptioncontainer: {
    marginTop: window.height * 0.05,
    margin: margin.big,
  },

  microcusteringcontainer: {
    marginTop: window.height * 0.05,
    marginBottom: window.height * 0.05,
    margin: margin.big,
  },

  antioxidationcontainer: {
    marginTop: window.height * 0.05,
    marginBottom: window.height * 0.05,
    margin: margin.big,
  },

  alkicontainer: {
    marginTop: window.height * 0.05,
    marginBottom: window.height * 0.05,
    margin: margin.big,
  },

  imagesize: {
    resizeMode: 'contain',
    width: 304,
    height: 236,
  },

  imagecontainermicro: {
    marginTop: window.height * 0.01,
    alignItems: 'center',
    justifyContent: 'center',
  },

  imagecontainer: {
    marginLeft: window.width * 0.03,
    marginTop: window.height * 0.02,
  },

  directorcontainer: {
    fontWeight: 'bold',
    fontSize: sizes.h4,
    marginLeft: window.width * 0.05,
  },

  directorview: {
    flexDirection: 'row',
  },

  directerdescription: {
    marginLeft: window.width * 0.05,
    marginRight: window.width * 0.25,
  },

  directorprofile: {
    flexDirection: 'row',
    marginTop: window.height * 0.02,
    marginBottom: window.height * 0.02,
  },

  text: {alignSelf: 'center'},
  rowtext: {alignSelf: 'center'},
  dataWrapper: {marginTop: -1},

  directorprofiledescritption: {
    marginLeft: window.width * 0.04,
    marginRight: window.width * 0.36,
  },

  flatlist: {
    marginTop: window.height * 0.05,
    marginBottom: window.height * 0.2,
  },

  mediaView: {
    width: window.width * 0.75,
    height: window.height * 0.2,
    backgroundColor: lightColors.b1,
    alignSelf: 'center',
    marginLeft: window.width * 0.1,
    marginRight: window.width * 0.1,
    marginTop: window.height * 0.01,
    marginBottom: window.height * 0.01,
  },

  homecontainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  cardcontainer: {
    marginTop: window.width * 0.05,
    width: window.width * 0.4,
    marginLeft: window.width * 0.04,
    marginHorizontal: 20,
  },

  galleryimagecontainer: {
    resizeMode: 'contain',
    width: '100%',
    height: window.height * 0.2,
  },

  homecardcontainer: {
    marginTop: window.width * 0.05,
    width: window.width * 0.4,
    marginLeft: window.width * 0.06,
    marginBottom: window.width * 0.02,
    height: window.height * 0.2,
  },

  homecontainerview: {
    alignSelf: 'center',
    justifyContent: 'center',
  },

  homegridview: {
    flexDirection: 'column',
  },

  homecontainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  homeimagecontainer: {
    resizeMode: 'contain',
    width: window.width * 0.4,
    height: window.height * 0.15,
  },
  loginView: {
    marginHorizontal: 20,
    borderRadius: borderRadius.large,
    backgroundColor: lightColors.white,
    padding: padding.big,
    shadowColor: '#aaa',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 3,
  },

  mainloginView: {
    marginHorizontal: 20,
    marginVertical: window.height * 0.15,
    borderRadius: borderRadius.large,
    backgroundColor: '#fff',
    padding: padding.big,
    shadowColor: '#aaa',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 3,
  },
  loginlbl: {
    color: '#545454',
    marginVertical: 5,
  },
  logininputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 0,
    marginVertical: 5,
    backgroundColor: lightColors.white,
    shadowColor: '#aaa',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 1,
  },
  logininput: {
    height: 40,
    padding: 0,
    flex: 1,
    paddingLeft: 10,
  },

  loginbtn: {
    marginTop: 10,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
  },

  paymentbuttonview: {
    marginTop: 35,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
  },
  loginbtnShadow: {
    shadowColor: '#aaa',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 1,
  },

  userlbl: {color: '#545454', marginVertical: 5},
  userinputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 0,
    marginVertical: 5,
    backgroundColor: lightColors.white,
    shadowColor: '#aaa',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 1,
  },
  userinput: {height: 40, padding: 0, flex: 1, paddingLeft: 10},
  userloginView: {
    margin: margin.big,
    borderRadius: borderRadius.large,
    backgroundColor: lightColors.white,
    padding: padding.big,
    shadowColor: '#aaa',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 3,
  },
  userbtn: {
    height: 40,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    margin: margin.big,
    borderRadius: borderRadius.large,
    backgroundColor: lightColors.white,
    padding: padding.big,
  },
  userbtnShadow: {
    shadowColor: '#aaa',
    alignItems: 'center',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 1,
  },

  fromtextcontainer: {
    marginTop: window.height * 0.05,
    fontSize: sizes.h4,
    marginLeft: window.width * 0.02,
  },

  customernamecontainer: {
    marginTop: window.height * 0.03,
    margin: margin.big,
  },

  attendancetext: {
    marginTop: window.height * 0.03,
    margin: margin.big,
  },

  cardviewcontainer: {
    margin: margin.big,
  },

  viewcontainer: {
    flexDirection: 'row',
    marginTop: window.height * 0.01,
    marginBottom: window.height * 0.01,
    margin: margin.big,
  },

  franchiescontainer: {
    marginTop: window.height * 0.06,
    margin: margin.big,
  },

  attendancetextcontainer: {
    fontSize: 16,
    marginLeft: window.width * 0.02,
  },

  datepickercontainer: {
    marginTop: window.height * 0.015,
  },

  attendancebtn: {
    height: 40,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    margin: margin.big,
    borderRadius: borderRadius.large,
    backgroundColor: lightColors.white,
    padding: padding.big,
  },
  attendancebtnShadow: {
    shadowColor: '#aaa',
    alignItems: 'center',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 1,
  },

  mcontainer: {
    backgroundColor: lightColors.primary,
    marginTop: window.width * 0.03,
    height: window.height * 0.065,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: borderRadius.sbig,
    flex: 0.65,
    padding: padding.small,
  },

  alcontainer: {
    backgroundColor: lightColors.secondary,
    marginTop: window.width * 0.03,
    height: window.height * 0.065,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: borderRadius.sbig,
    flex: 0.65,
    padding: padding.small,
    marginLeft: 5,
  },

  ancontainer: {
    backgroundColor: lightColors.lightweight,
    marginTop: window.width * 0.03,
    height: window.height * 0.065,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: borderRadius.sbig,
    flex: 0.65,
    padding: padding.small,
    marginLeft: 5,
  },

  waterindustrydesc: {
    width: 175,
    alignSelf: 'center',
  },

  maincontainerhome: {
    flexDirection: 'row',
    flex: 1,
    padding: padding.base,
  },

  middlecontainer: {
    marginTop: 10,
  },

  middletext: {
    fontSize: sizes.h2,
    fontWeight: 'bold',
    alignSelf: 'center',
  },

  centercontainer: {
    flexDirection: 'row',
    marginTop: 10,
  },

  centerimagecontainer: {
    width: 40,
    height: 40,
    alignSelf: 'center',
  },

  centertext: {
    fontWeight: 'bold',
    fontSize: sizes.h5,
    alignSelf: 'center',
    marginVertical: 5,
  },

  middlewave: {
    alignSelf: 'center',
    marginVertical: 75,
  },

  middletextview: {
    flexDirection: 'row',
    flex: 1,
    marginTop: 10,
  },

  middleview: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 10,
  },

  bottles: {
    fontSize: sizes.h7,
    fontWeight: 'bold',
  },

  line: {
    backgroundColor: lightColors.linecolor,
    width: 2,
    height: 100,
    marginLeft: 10,
    marginTop: 5,
  },

  bottlescontainer: {
    marginLeft: window.width * 0.025,
    marginRight: window.width * 0.49,
  },

  image3container: {
    flexDirection: 'column',
    marginTop: 15,
    backgroundColor: lightColors.white,
    borderRadius: borderRadius.small,
    marginLeft: 10,
    marginBottom: 15,
    width: 275,
    height: 275,
    padding: padding.big,
  },

  image3view: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 100,
    height: 75,
  },

  image3text: {
    fontSize: sizes.h5,
    backgroundColor: lightColors.imagecolor,
    textAlign: 'center',
    borderRadius: borderRadius.big,
    borderWidth: 1,
    borderColor: lightColors.imagecolor,
    marginTop: 10,
    padding: padding.base,
  },

  image3de: {
    fontWeight: 'bold',
    marginTop: 10,
    alignSelf: 'center',
  },

  descriptioncard: {
    marginTop: 10,
    textAlign: 'center',
  },

  fprice: {
    color: '#f5a93f',
  },
  lprice: {
    color: '#cccccc',
    paddingHorizontal: 10,
  },

  priceviewcontainer: {
    marginTop: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  delivercontainer: {
    flexDirection: 'column',
    padding: padding.big,
  },
  hometextcontainer: {
    color: '#000',
    fontSize: sizes.h9,
    fontWeight: 'bold',
  },

  franchieslistView: {
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: borderRadius.large,
    backgroundColor: lightColors.white,
    padding: padding.small,
    shadowColor: '#aaa',
    flex: 1,
    flexDirection: 'row',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 3,
  },

  franchieslistMenu: {
    marginHorizontal: 10,
    marginVertical: 10,
    padding: padding.small,
    flex: 1,
    flexDirection: 'row',
  },
  franchieslbl: {color: '#545454', marginVertical: 10},
  franchiesinputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 0,
    marginVertical: 5,
    backgroundColor: lightColors.white,
    shadowColor: '#aaa',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 1,
  },

  attendanceinputbox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 0,
    marginVertical: 5,
    backgroundColor: lightColors.white,
    shadowColor: '#aaa',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 1,
    marginTop: 10,
  },
  franchiesinput: {
    height: 40,
    padding: 0,
    flex: 1,
    paddingLeft: 10,
  },
  franchiesloginView: {
    margin: margin.big,
    borderRadius: borderRadius.large,
    backgroundColor: lightColors.white,
    padding: padding.big,
    shadowColor: '#aaa',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 3,
  },
  franchiesbtn: {
    height: 40,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    margin: margin.big,
    borderRadius: borderRadius.large,
    backgroundColor: lightColors.white,
    padding: padding.big,
  },

  paymentbtn: {
    height: 40,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    margin: margin.big,
    borderRadius: borderRadius.large,
    backgroundColor: lightColors.white,
    padding: padding.big,
  },
  franchiesbtnShadow: {
    shadowColor: '#aaa',
    alignItems: 'center',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 1,
  },

  attendancebtns: {
    shadowColor: '#aaa',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 1,
  },
};
