import React from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {THEME} from '../../theme';
import GLOBAL_STYLE from '../../theme/global';
import {HP, RF, WP} from '../../theme/responsive';
import Icon from 'react-native-vector-icons/Entypo';

interface Props extends TouchableOpacityProps {
  title: string;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: string;
  loading?: boolean;
}

const PrimaryButton = (props: Props) => {
  return (
    <TouchableOpacity {...props} disabled={props.loading} activeOpacity={0.7}>
      <LinearGradient
        colors={[
          THEME.COLORS.gradientTopColor,
          THEME.COLORS.gradientBottomColor,
        ]}
        style={[styles.container, props.buttonStyle]}>
        {props.loading ? (
          <ActivityIndicator color={THEME.COLORS.white} />
        ) : (
          <>
            {props.icon && <Icon name={props.icon} style={styles.icon} />}
            <Text style={[styles.buttonText, props.textStyle]}>
              {props.title}
            </Text>
          </>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  container: {
    width: WP(80),
    height: HP(7),
    alignSelf: 'center',
    borderRadius: RF(30),
    ...GLOBAL_STYLE.CENTER,
    marginBottom: THEME.MARGIN.NORMAL,
    flexDirection: 'row',
  },
  icon: {
    fontSize: 20,
    color: THEME.COLORS.white,
    marginRight: THEME.MARGIN.LOW,
  },
  buttonText: {
    fontSize: THEME.FONTS.SIZE.XXSMALL,
    fontFamily: THEME.FONTS.TYPE.SEMIBOLD,
    color: THEME.COLORS.white,
    textAlign: 'center',
  },
});
