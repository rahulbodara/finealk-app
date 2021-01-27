import Toast from 'react-native-simple-toast';

const Toaster = props => {
  if (props.visible) {
    Toast.showWithGravity(props.message, Toast.LONG, Toast.TOP);
    return null;
  }
  return null;
};

export default Toaster;
