import React, {useState} from 'react';
import {Linking, StyleSheet, Text, View} from 'react-native';
import {RF} from '../../theme/responsive';
import FastImage from 'react-native-fast-image';
import {THEME} from '../../theme';
import {ICONS} from '../../../assets';
import GLOBAL_STYLE from '../../theme/global';
import {Transaction} from '../../models/types';
import moment from 'moment';
interface Props {
  kind: 'sent' | 'received';
  short: string;
  item: Transaction;
}

const TransactionItem = (props: Props) => {
  const TRANSACTION_COLOR =
    props.kind === 'sent' ? THEME.COLORS.blue : THEME.COLORS.green;
  const TRANSACTION_ICON = props.kind === 'sent' ? ICONS.SENT : ICONS.RECEIVED;
  const TRANSACTION_TEXT = props.kind === 'sent' ? 'Sent' : 'Received';
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <FastImage
          source={TRANSACTION_ICON}
          resizeMode={FastImage.resizeMode.contain}
          style={{width: '45%', height: '45%'}}
        />
      </View>
      <View style={styles.main}>
        <Text style={styles.price}>
          {TRANSACTION_TEXT} {props.item.coinSymbol.toUpperCase()}
        </Text>
        <Text style={styles.smallText}>
          {moment(props.item.timeStamp).format('MMM DD, YYYY, h:mm:ss a')}
        </Text>
      </View>
      <View style={styles.right}>
        <Text style={[styles.smallText, {color: TRANSACTION_COLOR}]}>
          {Number(props.item.amount)} {props.item.coinSymbol.toUpperCase()}
        </Text>
        <Text style={styles.smallText}>$1450.00 USD</Text>
      </View>
    </View>
  );
};

export default TransactionItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: RF(65),
    borderRadius: THEME.RADIUS.BOX,
    flexDirection: 'row',
    paddingHorizontal: THEME.PADDING.LOW,
    paddingVertical: THEME.PADDING.LOW,
    backgroundColor: THEME.COLORS.secondaryBackground,
    marginBottom: THEME.MARGIN.LOW,
  },
  left: {width: '16%', height: '100%', ...GLOBAL_STYLE.CENTER},
  main: {flex: 1, justifyContent: 'space-around'},
  price: {fontSize: THEME.FONTS.SIZE.SMALL, color: THEME.COLORS.white},
  smallText: {
    fontSize: THEME.FONTS.SIZE.XXSMALL,
    color: THEME.COLORS.textLight,
  },
  right: {height: '100%', justifyContent: 'space-around'},
});
