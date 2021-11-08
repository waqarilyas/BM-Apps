import React from 'react';
import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RF} from '../../theme/responsive';
import FastImage from 'react-native-fast-image';
import {THEME} from '../../theme';
import {ICONS} from '../../../assets';
import GLOBAL_STYLE from '../../theme/global';
import {Transaction} from '../../models/types';
import moment from 'moment';
import L from '../../utils/LanguageHandler';
const Web3 = require('web3');

interface Props {
  kind: 'sent' | 'received';
  item: Transaction;
  coinSymbol: string;
}
const TransactionItem = (props: Props) => {
  const TRANSACTION_ICON = props.kind === 'sent' ? ICONS.SEND : ICONS.RECEIVEDT;
  const TRANSACTION_TEXT = props.kind === 'sent' ? L('Sent') : L('Received');
  let transactionTime = new Date(props.item.timeStamp);

  const openExplorer = async () => {
    try {
      const supported = await Linking.canOpenURL(props.item.explorerUrl);
      if (supported) {
        await Linking.openURL(props.item.explorerUrl);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={openExplorer}
      style={styles.container}>
      <View style={styles.left}>
        <FastImage
          source={TRANSACTION_ICON}
          resizeMode={FastImage.resizeMode.contain}
          style={{width: '95%', height: '95   %'}}
        />
      </View>
      <View style={styles.main}>
        <Text style={styles.price}>
          {props.item.amount} {props.item.coinSymbol.toUpperCase()}
        </Text>
        <Text style={styles.smallText}>
          {moment(transactionTime).format('MMM DD, YYYY, h:mm:ss a')}
        </Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.rightText}>{TRANSACTION_TEXT}</Text>
        {/* <Text style={styles.smallText}>$1450.00 USD</Text> */}
      </View>
    </TouchableOpacity>
  );
};

export default TransactionItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: RF(65),

    borderRadius: THEME.RADIUS.BOX,
    flexDirection: 'row',
    paddingHorizontal: THEME.PADDING.MID_LOW,
    paddingVertical: THEME.PADDING.LOW,
    backgroundColor: THEME.COLORS.primaryBackground,
    marginHorizontal: THEME.MARGIN.HIGH,
    marginBottom: THEME.MARGIN.LOW,
    alignSelf: 'center',
  },
  left: {width: '16%', height: '100%', ...GLOBAL_STYLE.CENTER},
  main: {flex: 1, justifyContent: 'space-around', marginLeft: THEME.MARGIN.LOW},
  price: {fontSize: THEME.FONTS.SIZE.SMALL, color: THEME.COLORS.white},
  smallText: {
    fontSize: THEME.FONTS.SIZE.XXXSMALL,
    color: THEME.COLORS.textLight,
  },
  right: {height: '100%', justifyContent: 'space-around'},
  rightText: {
    fontSize: THEME.FONTS.SIZE.XSMALL,
    fontFamily: THEME.FONTS.TYPE.MEDIUM,
    color: THEME.COLORS.white,
  },
});
