import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ICONS} from '../../../assets';
import {THEME} from '../../theme';
import GLOBAL_STYLE from '../../theme/global';
import {RF, WP} from '../../theme/responsive';

interface Props extends TouchableOpacityProps {
  onPress?: () => {};
  kind: 'send' | 'receive';
  title: string;
}

const TransactionButton = (props: Props) => {
  const Icon = props.kind === 'send' ? ICONS.SENT : ICONS.RECEIVED;
  const Background =
    props.kind === 'send' ? THEME.COLORS.blue : THEME.COLORS.green;
  return (
    <TouchableOpacity {...props}>
      <View style={[styles.container, {backgroundColor: Background}]}>
        <FastImage
          source={Icon}
          resizeMode={FastImage.resizeMode.contain}
          style={styles.icon}
          tintColor={THEME.COLORS.white}
        />
        <Text style={styles.title}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TransactionButton;

const styles = StyleSheet.create({
  container: {
    width: WP(45),
    height: RF(45),
    flexDirection: 'row',
    ...GLOBAL_STYLE.CENTER,
    borderRadius: THEME.RADIUS.OVAL,
  },
  icon: {
    height: THEME.FONTS.SIZE.XSMALL,
    width: THEME.FONTS.SIZE.XSMALL,
  },
  title: {
    fontSize: THEME.FONTS.SIZE.SMALL,
    color: THEME.COLORS.white,
    marginLeft: THEME.MARGIN.VERYLOW,
  },
});
