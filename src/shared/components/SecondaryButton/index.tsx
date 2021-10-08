import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';
import {THEME} from '../../theme';
import GLOBAL_STYLE from '../../theme/global';
import {HP, RF, WP} from '../../theme/responsive';

interface Props extends TouchableOpacityProps {
  title: string;
  buttonStyle?: StyleProp<ViewStyle>;
  loading?: boolean;
}

const SecondaryButton = (props: Props) => {
  return (
    <TouchableOpacity
      style={[styles.container, props.buttonStyle]}
      {...props}
      activeOpacity={0.7}>
      {props.loading ? (
        <ActivityIndicator color={THEME.COLORS.accentBlue} />
      ) : (
        <Text style={styles.buttonText}>{props.title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default SecondaryButton;

const styles = StyleSheet.create({
  container: {
    width: WP(80),
    height: HP(7),
    alignSelf: 'center',
    borderRadius: RF(30),
    ...GLOBAL_STYLE.CENTER,
    borderWidth: 2,
    borderColor: THEME.COLORS.lightBlue,
    marginBottom: THEME.MARGIN.NORMAL,
  },
  buttonText: {
    fontSize: THEME.FONTS.SIZE.XXSMALL,
    fontFamily: THEME.FONTS.TYPE.SEMIBOLD,
    textAlign: 'center',
    color: THEME.COLORS.white,
  },
});
