import Modal from 'react-native-modal';
import React, {useState} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ICONS} from '../../../assets';
import {THEME} from '../../theme';
import {RF} from '../../theme/responsive';
import GLOBAL_STYLE from '../../theme/global';
import {AppShowToast} from '../../services/helper.service';
import Clipboard from '@react-native-clipboard/clipboard';
import L from '../../utils/LanguageHandler';

interface Props {
  isVisible: boolean;
  error?: boolean;
  toggleModal: () => void;
  isPaymentSuccess: boolean;
  paymentHash?: string;
}

const PaymentStatusModal = (props: Props) => {
  const [copied, setCopied] = useState(false);

  const onPressHash = () => {
    setCopied(true);

    AppShowToast('Copied');
    // console.log('address check', coin?.address);
    Clipboard.setString(props?.paymentHash || '');
  };
  return (
    <Modal
      animationIn="fadeIn"
      animationOut="fadeOut"
      backdropOpacity={0.85}
      isVisible={props.isVisible}>
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
          {props.isPaymentSuccess ? L('Congratulations') : L('Payment Failed')}
        </Text>
        <FastImage
          source={props.isPaymentSuccess ? ICONS.SUCCESS : ICONS.FAILED}
          resizeMode={FastImage.resizeMode.contain}
          style={styles.icon}
        />
        <TouchableOpacity onPress={onPressHash}>
          <Text style={styles.subText}>
            {props?.paymentHash || props.error}
          </Text>
        </TouchableOpacity>
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
    textAlign: 'center',
  },
  subText: {
    // borderWidth: 1,
    // borderColor: THEME.COLORS.white,
    padding: THEME.PADDING.LOW,
    fontSize: THEME.FONTS.SIZE.SMALL,
    color: THEME.COLORS.white,
    fontFamily: THEME.FONTS.TYPE.MEDIUM,

    textAlign: 'center',
  },
  subText1: {
    padding: THEME.PADDING.LOW,
    fontFamily: THEME.FONTS.TYPE.MEDIUM,

    fontSize: THEME.FONTS.SIZE.SMALL,
    color: THEME.COLORS.white,
    textAlign: 'center',
  },
});
