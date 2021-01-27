import React from 'react';
import {StyleSheet, View, Modal, ActivityIndicator} from 'react-native';
const Loader = props => {
  const {loading} = props;
  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {
        console.log('close modal');
      }}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator animating={loading} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#f4f4f4',
    height: 100,
    width: 100,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'space-around',
  },
});

export default Loader;
