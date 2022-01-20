import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {THEME} from '../../theme';
import {HP, RF, WP} from '../../theme/responsive';
import FastImage, {Source} from 'react-native-fast-image';
import {ICONS} from '../../../assets';

interface Props {
  coinName: String | undefined;
  address: String | undefined;
  coinImage: Source;
  onPress?: () => void;
}

const ForwardAddCard = (props: Props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.container}>
      <View style={styles.topView}>
        <View style={styles.itemView}>
          <FastImage
            source={props.coinImage}
            style={styles.coinImage}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Text style={styles.coinName}>{props.coinName}</Text>
        </View>
        <TouchableOpacity>
          <FastImage source={ICONS.DELETE_RED} style={styles.delete} />
        </TouchableOpacity>
      </View>
      <Text style={styles.addressTitle}>Address</Text>
      <View style={styles.addressContainer}>
        <Text style={styles.addressText}>{props.address}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ForwardAddCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: THEME.COLORS.darkGrey,
    borderRadius: RF(5),
    paddingHorizontal: RF(16),
    paddingVertical: THEME.PADDING.VERYLOW,
    marginVertical: THEME.MARGIN.LOW,
  },
  topView: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    marginVertical: THEME.MARGIN.LOW,
  },
  itemView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressContainer: {
    width: '90%',

    marginVertical: THEME.MARGIN.LOW,
    borderWidth: 1.5,
    borderColor: THEME.COLORS.lightBlue,
    borderStyle: 'dashed',
    borderRadius: 1,
  },
  coinName: {
    marginHorizontal: 10,
    color: THEME.COLORS.white,
    fontSize: THEME.FONTS.SIZE.XXSMALL,
    fontFamily: THEME.FONTS.TYPE.REGULAR,
  },
  coinImage: {
    height: RF(25),
    width: RF(20),
  },
  delete: {
    height: RF(18),
    width: RF(14),
    alignSelf: 'center',
  },
  addressTitle: {
    color: 'grey',
    fontSize: THEME.FONTS.SIZE.XXSMALL,
    fontFamily: THEME.FONTS.TYPE.REGULAR,
  },
  addressText: {
    padding: 10,
    color: THEME.COLORS.white,
    fontSize: THEME.FONTS.SIZE.XXSMALL,
    fontFamily: THEME.FONTS.TYPE.REGULAR,
  },
});
