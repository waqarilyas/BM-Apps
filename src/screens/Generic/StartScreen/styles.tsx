import {StyleSheet} from 'react-native';
import {THEME} from '../../../shared/theme';
import {RF} from '../../../shared/theme/responsive';

const styles = StyleSheet.create({
  heading: {
    fontSize: THEME.FONTS.SIZE.LARGE,
    fontFamily: THEME.FONTS.TYPE.REGULAR,
    color: THEME.COLORS.white,
    textAlign: 'center',
    marginTop: THEME.MARGIN.HIGH,
  },
  subHeading: {
    fontSize: THEME.FONTS.SIZE.XXSMALL,
    fontFamily: THEME.FONTS.TYPE.REGULAR,
    color: THEME.COLORS.textLight,
    textAlign: 'center',
    marginTop: THEME.MARGIN.NORMAL,
  },
  actionsContainer: {
    position: 'absolute',
    bottom: RF(70),
  },
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.primaryBackground,
    alignItems: 'center',
  },
  text: {color: 'white', fontSize: THEME.FONTS.SIZE.XXSMALL},
  linkText: {
    color: THEME.COLORS.accentBlue,
    textDecorationLine: 'underline',
  },
  footer: {
    position: 'absolute',
    bottom: RF(20),
  },
});

export default styles;
