import React from 'react';
import {ActivityIndicator, StyleSheet, View, Modal} from 'react-native';
// import Modal from 'react-native-modal';
import {THEME} from '../../theme';

interface Props {
  isVisible: boolean;
}

const AppLoader = (props: Props) => {
  return (
    <Modal transparent visible={props.isVisible}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.4)',
          ...StyleSheet.absoluteFillObject,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator color={THEME.COLORS.accentBlue} size="large" />
      </View>
    </Modal>
  );
};

export default AppLoader;
