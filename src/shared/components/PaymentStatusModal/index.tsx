import Modal from 'react-native-modal';
import React from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ICONS} from '../../../assets';
import {THEME} from '../../theme';
import {RF} from '../../theme/responsive';
import GLOBAL_STYLE from '../../theme/global';

interface Props {
  isVisible: boolean;
  error: boolean;
  toggleModal: () => void;
}

const PaymentStatusModal = (props: Props) => {
  return (
    <Modal backdropOpacity={0.85} isVisible={props.isVisible}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.crossContainer}
          onPress={props.toggleModal}>
          <FastImage
            source={ICONS.CROSS}
            resizeMode={FastImage.resizeMode.contain}
            style={styles.cross}
          />
        </TouchableOpacity>
        <Text style={styles.mainText}>
          {props.error ? 'Congratulations' : 'Error'}
        </Text>
        <FastImage
          source={!props.error ? ICONS.FAILED : ICONS.SUCCESS}
          resizeMode={FastImage.resizeMode.contain}
          style={styles.icon}
        />
        <Text style={styles.subText}>
          {props.error ? 'Payment Successfull' : 'Payment Failed'}
        </Text>
      </View>
    </Modal>
  );
};

export default PaymentStatusModal;

const styles = StyleSheet.create({
  container: {flex: 1, ...GLOBAL_STYLE.CENTER},
  crossContainer: {
    width: RF(25),
    height: RF(25),
    position: 'absolute',
    top: RF(Platform.OS === 'ios' ? 40 : 0),
    right: RF(10),
  },
  cross: {
    width: '100%',
    height: '100%',
  },
  icon: {
    width: RF(150),
    height: RF(150),
    marginVertical: THEME.MARGIN.HIGH,
  },
  mainText: {
    fontSize: THEME.FONTS.SIZE.XXLARGE,
    fontFamily: THEME.FONTS.TYPE.SEMIBOLD,
    color: THEME.COLORS.white,
  },
  subText: {
    fontSize: THEME.FONTS.SIZE.LARGE,
    color: THEME.COLORS.white,
  },
});
