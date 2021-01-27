import React, {useState} from 'react';
import {View, TextInput, Image, Platform} from 'react-native';
import PropTypes from 'prop-types';
import sizes from '../config/sizes';

const InputText = props => {
  const [iconName, setStateIcon] = useState(props.inActiveIcon);
  const [underLineColor] = useState('#333');

  const onFocus = () => {
    setStateIcon({
      iconName: props.activeIcon,
      underLineColor: '#333',
    });
  };
  const onBlur = () => {
    setStateIcon({
      iconName: props.inActiveIcon,
      underLineColor: '#333',
    });
  };
  let iosInputStyle = {
    paddingBottom: 20,
    paddingTop: 20,
  };

  let androidInputStyle = {
    paddingBottom: 15,
    paddingTop: 15,
  };

  let inputStyle = Platform.OS == 'ios' ? iosInputStyle : androidInputStyle;
  return (
    <View style={[props.style]}>
      <TextInput
        {...props}
        style={[
          {
            textAlign: 'left',
            fontSize: sizes.h8,
            paddingLeft: 35,
            color: 'rgb(117, 117, 117)',
          },
          inputStyle,
        ]}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </View>
  );
};
export default InputText;
