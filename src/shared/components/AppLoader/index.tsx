import React from 'react';
import {ActivityIndicator} from 'react-native';
import Modal from 'react-native-modal';
import {THEME} from '../../theme';

interface Props {
  isVisible: boolean;
}

const AppLoader = (props: Props) => {
  return (
    <Modal backdropOpacity={0.5} isVisible={props.isVisible}>
      <ActivityIndicator color={THEME.COLORS.accentBlue} size="large" />
    </Modal>
  );
};

export default AppLoader;
