import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RF} from '../../theme/responsive';
import FastImage from 'react-native-fast-image';
import {THEME} from '../../theme';
import {ICONS} from '../../../assets';
import GLOBAL_STYLE from '../../theme/global';

interface Props {
  status: 'Pending' | 'Completed' | 'Payment Error';
  short: string;
  amount: string;
  date: string;
  onPress?: () => void;
}

const HistoryItem = (props: Props) => {
  const getStatusColor = () => {
    if (props.status === 'Pending') {
      return THEME.COLORS.textLight;
    } else if (props.status === 'Completed') {
      return THEME.COLORS.green;
    } else {
      return THEME.COLORS.red;
    }
  };

  return (
    <TouchableOpacity onPress={props.onPress} style={styles.container}>
      <>
        <View style={styles.left}>
          <FastImage
            source={ICONS.RECEIVED}
            resizeMode={FastImage.resizeMode.contain}
            style={{width: '45%', height: '45%'}}
          />
        </View>
        <View style={styles.main}>
          <Text style={styles.price}>
            {props.amount} {props.short.toUpperCase()}
          </Text>
          <Text
            style={[
              styles.smallText,
              {textAlign: 'left', fontSize: THEME.FONTS.SIZE.XXSMALL},
            ]}>
            {props.date}
          </Text>
        </View>
        <View style={styles.right}>
          <Text style={styles.smallText}>Status</Text>
          <Text
            style={[styles.smallText, {color: getStatusColor(), top: RF(0.5)}]}>
            {props.status}
          </Text>
        </View>
      </>
    </TouchableOpacity>
  );
};

export default HistoryItem;

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
  left: {width: '20%', height: '100%', ...GLOBAL_STYLE.CENTER},
  main: {flex: 1, justifyContent: 'space-around'},
  price: {fontSize: THEME.FONTS.SIZE.MEDIUM, color: THEME.COLORS.white},
  smallText: {
    textAlign: 'right',
    fontSize: THEME.FONTS.SIZE.XXSMALL,
    color: THEME.COLORS.textLight,
  },
  right: {height: '100%', justifyContent: 'space-around'},
});
