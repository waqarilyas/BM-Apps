import {StyleSheet} from 'react-native';
import {THEME} from '../../../shared/theme';
import {RF} from '../../../shared/theme/responsive';

const styles = StyleSheet.create({
  heading: {
    fontSize: THEME.FONTS.SIZE.XLARGE,
    fontFamily: THEME.FONTS.TYPE.REGULAR,
    color: THEME.COLORS.white,
    textAlign: 'center',
    marginTop: THEME.MARGIN.HIGH,
    marginBottom: RF(100),
  },
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.primaryBackground,
    alignItems: 'center',
  },
  text: {color: 'white', fontSize: THEME.FONTS.SIZE.XSMALL},
  linkText: {
    color: THEME.COLORS.accentBlue,
    textDecorationLine: 'underline',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
  },
});

export default styles;
