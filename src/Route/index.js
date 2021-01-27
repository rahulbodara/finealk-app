import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import Drower from '../components/Drower/Drower';
import Dashboard from '../screen/Dashboard/Dashboard';
import Login from '../screen/Login/index';
import Attendance from '../screen/Attendance/Attendance';
import Payment from '../screen/Payment/Payment';
import Report from '../screen/Report/Report';
import AboutUs from '../screen/AboutUs/index';
import ContactUs from '../screen/ContactUs/index';
import Home from '../screen/Home/index';
import Gallery from '../screen/Gallery/index';
import VideoScreen from '../screen/VideoScreen/index';
import Franchies from '../screen/Franchies/Franchies';
import User from '../screen/User/User';
import Add from '../screen/Add/Add';
import EditFranchies from '../screen/EditFranchies/EditFranchies';
import UserList from '../screen/UserList/UserList';
import UserView from '../screen/UserView/UserView';
import AddShop from '../screen/AddShop/AddShop';
import ShopList from '../screen/ShopList/ShopList';
import EditShop from '../screen/EditShop/EditShop';
import ViewFranchies from '../screen/ViewFranchies/ViewFranchies';
import ViewShop from '../screen/ViewShop/ViewShop';
import ViewCustomer from '../screen/ViewCustomer/ViewCustomer';
import Microcustering from '../screen/Microcustering/Microcustering';
import Antioxidation from '../screen/Antioxidation/Antioxidation';
import Alkalinization from '../screen/Alkalinization/Alkalinization';
import UsersDetails from '../screen/UsersDetails/UsersDetails';
import UserPayment from '../screen/UserPayment/UserPayment';
import CustomerPayment from '../screen/CustomerPayment/CustomerPayment';
import AttdanceReport from '../screen/AttdanceReport/AttdanceReport';
import FranchiesPayment from '../screen/FranchiesPayment/FranchiesPayment';
import FranchiesAttendanceReport from '../screen/FranchiesAttendanceReport/FranchiesAttendanceReport';
import CustomerAttendance from '../screen/CustomerAttendance/CustomerAttendance';
import ShopPage from '../screen/ShopPage/ShopPage';
import FranchiesShopList from '../screen/FranchiesShopList/FranchiesShopList';
import AddFranchiesShop from '../screen/AddFranchiesShop/AddFranchiesShop';
import AddShopUser from '../screen/AddShopUser/AddShopUser';
import ShopAttendance from '../screen/ShopAttendance/ShopAttendance';
import AddBottleList from '../screen/AddBottleList/AddBottleList';
import BottleList from '../screen/BottleList/BottleList';
import EditBottleList from '../screen/EditBottleList/EditBottleList';
import ViewBottleList from '../screen/ViewBottleList/ViewBottleList';
import FranchiesBottleList from '../screen/FranchiesBottleList/FranchiesBottleList';
import AddFranchiesBottleList from '../screen/AddFranchiesBottleList/AddFranchiesBottleList';
import EditFranchiesBottleList from '../screen/EditFranchiesBottleList/EditFranchiesBottleList';
import ViewFranchiesBottleList from '../screen/ViewFranchiesBottleList/ViewFranchiesBottleList';
import EditFranchiesShop from '../screen/EditFranchiesShop/EditFranchiesShop';
import Wallet from '../screen/Wallet/Wallet';

const StackNavigatorOptions = {
  initialRouteName: 'Default',
  headerMode: 'none',
};

const DashboardStack = createStackNavigator(
  {
    Dashboard: {screen: Dashboard},
    Franchies: {screen: Franchies},
    EditFranchies: {screen: EditFranchies},
    UserList: {screen: UserList},
    User: {screen: User},
    Add: {screen: Add},
    UserView: {screen: UserView},
    ShopList: {screen: ShopList},
    AddShopUser: {screen: AddShopUser},
    ShopAttendance: {screen: ShopAttendance},
    AddShop: {screen: AddShop},
    EditShop: {screen: EditShop},
    Attendance: {screen: Attendance},
    Payment: {screen: Payment},
    ViewFranchies: {screen: ViewFranchies},
    FranchiesShopList: {screen: FranchiesShopList},
    AddFranchiesShop: {screen: AddFranchiesShop},
    ViewShop: {screen: ViewShop},
    ViewCustomer: {screen: ViewCustomer},
    UsersDetails: {screen: UsersDetails},
    UserPayment: {screen: UserPayment},
    CustomerPayment: {screen: CustomerPayment},
    AttdanceReport: {screen: AttdanceReport},
    FranchiesPayment: {screen: FranchiesPayment},
    FranchiesAttendanceReport: {screen: FranchiesAttendanceReport},
    CustomerAttendance: {screen: CustomerAttendance},
    ShopPage: {screen: ShopPage},
    BottleList: {screen: BottleList},
    AddBottleList: {screen: AddBottleList},
    EditBottleList: {screen: EditBottleList},
    ViewBottleList: {screen: ViewBottleList},
    FranchiesBottleList: {screen: FranchiesBottleList},
    AddFranchiesBottleList: {screen: AddFranchiesBottleList},
    EditFranchiesBottleList: {screen: EditFranchiesBottleList},
    ViewFranchiesBottleList: {screen: ViewFranchiesBottleList},
    EditFranchiesShop: {screen: EditFranchiesShop},
    Wallet: {screen: Wallet},
  },
  {
    initialRouteName: 'Dashboard',
    headerMode: 'none',
  },
);

const DrawerMenu = createDrawerNavigator(
  {
    DashboardStack: {screen: DashboardStack},
    Login: {screen: Login},
    Home: {screen: Home},
    Gallery: {screen: Gallery},
    VideoScreen: {screen: VideoScreen},
    AboutUs: {screen: AboutUs},
    ContactUs: {screen: ContactUs},
    Report: {screen: Report},
    Microcustering: {screen: Microcustering},
    Antioxidation: {screen: Antioxidation},
    Alkalinization: {screen: Alkalinization},
    DashboardValue: {screen: DashboardStack},
  },
  {
    initialRouteName: 'Home',
    contentComponent: Drower,
    contentOptions: {
      activeTintColor: '#e91e63',
    },
  },
);

const AppNavigator = createStackNavigator(
  {
    Default: {screen: DrawerMenu},
  },
  StackNavigatorOptions,
);

const App = createAppContainer(AppNavigator);
export default App;
