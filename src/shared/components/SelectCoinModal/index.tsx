import React, {ReactChild, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Pressable,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';
import {ICONS} from '../../../assets';
import {COINS} from '../../../assets/coins';
import {RootState} from '../../store';
import {THEME} from '../../theme';
import GLOBAL_STYLE from '../../theme/global';
import {HP, WP, RF} from '../../theme/responsive';
import L from '../../utils/LanguageHandler';

interface Props {
  isVisible: boolean | undefined;
  toggleModal: (val: any) => any;
  RenderOptions?: ReactChild | null;
}

const SelectCoinModal = (props: Props) => {
  return (
    <Modal
      hasBackdrop={true}
      backdropOpacity={0.9}
      backdropColor={THEME.COLORS.textLight}
      onBackdropPress={props.toggleModal}
      isVisible={props.isVisible}
      style={{marginHorizontal: 0, marginBottom: 0}}>
      <View style={styles.container}>
        <TouchableOpacity onPress={props.toggleModal} style={[styles.close]}>
          <FastImage
            source={ICONS.CROSS}
            tintColor={THEME.COLORS.white}
            style={styles.cross}
          />
        </TouchableOpacity>
        {props.RenderOptions}
      </View>
    </Modal>
  );
};

export default SelectCoinModal;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: THEME.PADDING.NORMAL,
    paddingBottom: THEME.PADDING.HIGH,
    paddingHorizontal: THEME.PADDING.NORMAL,
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: THEME.RADIUS.OVAL,
    borderTopRightRadius: THEME.RADIUS.OVAL,

    backgroundColor: THEME.COLORS.primaryBackground,
  },
  heading: {
    fontSize: THEME.FONTS.SIZE.MEDIUM,
    fontFamily: THEME.FONTS.TYPE.BOLD,
    textAlign: 'center',
    color: THEME.COLORS.white,
    marginBottom: THEME.MARGIN.MID_LOW,
  },
  close: {
    position: 'absolute',
    height: '17%',
    width: '8%',
    borderColor: 'white',
    ...GLOBAL_STYLE.CENTER,
    borderRadius: THEME.RADIUS.SMALLBOX,
    right: THEME.MARGIN.VERYHIGH,
    top: -RF(10),
    backgroundColor: THEME.COLORS.tintBlue,
  },
  textView: {
    ...GLOBAL_STYLE.ROW,
    marginBottom: THEME.MARGIN.LOW,
    borderRadius: THEME.RADIUS.SMALLBOX,
    paddingVertical: THEME.PADDING.NORMAL,
    paddingHorizontal: THEME.PADDING.LOW,
    color: THEME.COLORS.white,
  },
  contactName: {
    fontSize: THEME.FONTS.SIZE.XXSMALL,
    fontFamily: THEME.FONTS.TYPE.REGULAR,
  },

  modalCoin: {
    height: RF(35),
    width: RF(35),
  },
  noContactView: {
    width: '100%',
    height: HP(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  noContactText: {color: THEME.COLORS.textLight},
  cardRight: {
    flex: 1,
    paddingLeft: RF(8),
  },
  cardSymbol: {
    fontSize: THEME.FONTS.SIZE.XSMALL,
    fontFamily: THEME.FONTS.TYPE.REGULAR,
    fontWeight: 'bold',
  },
  cross: {width: '55%', height: '45%'},
  label: {
    alignSelf: 'center',
    color: THEME.COLORS.white,
    fontSize: THEME.FONTS.SIZE.SMALL,
    fontFamily: THEME.FONTS.TYPE.MEDIUM,
  },
  buttonView: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: THEME.COLORS.darkGrey,
    paddingVertical: THEME.PADDING.NORMAL,
  },
});
