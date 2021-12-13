import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ICONS} from '../../../assets';
import {THEME} from '../../theme';
import GLOBAL_STYLE from '../../theme/global';
import {RF} from '../../theme/responsive';

interface Props extends TouchableOpacityProps {
  onPress?: () => void;
  kind: 'send' | 'receive' | 'copy';
  title: string;
}

const TransactionButton = (props: Props) => {
  const Icon =
    props.kind === 'send'
      ? ICONS.SENT
      : props.kind === 'receive'
      ? ICONS.RECEIVED
      : ICONS.COPY;

  return (
    <TouchableOpacity style={styles.container} {...props}>
      <FastImage
        source={Icon}
        resizeMode={FastImage.resizeMode.contain}
        style={styles.icon}
      />
      <Text style={styles.title}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default TransactionButton;

const styles = StyleSheet.create({
  container: {
    // width: WP(15),
    height: RF(50),
    ...GLOBAL_STYLE.CENTER,
    borderRadius: THEME.RADIUS.SMALLBOX,
    borderWidth: 1.5,
    borderColor: THEME.COLORS.tintBlue,
    marginHorizontal: THEME.MARGIN.LOW,
    paddingHorizontal: RF(10),
  },
  icon: {
    height: THEME.FONTS.SIZE.XXSMALL,
    width: THEME.FONTS.SIZE.XXSMALL,
    marginTop: THEME.MARGIN.SUPERLOW,
    marginBottom: THEME.MARGIN.LOW,
    alignSelf: 'center',
  },
  title: {
    fontSize: THEME.FONTS.SIZE.XXXSMALL,
    fontFamily: THEME.FONTS.TYPE.MEDIUM,
    color: THEME.COLORS.white,
    alignSelf: 'center',
  },
});
