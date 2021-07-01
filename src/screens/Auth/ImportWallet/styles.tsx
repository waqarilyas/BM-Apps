import {StyleSheet} from 'react-native';
import {THEME} from '../../../shared/theme';
import {RF} from '../../../shared/theme/responsive';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.primaryBackground,
    paddingHorizontal: THEME.PADDING.LOW,
  },
  heading: {
    fontSize: THEME.FONTS.SIZE.LARGE,
    fontFamily: THEME.FONTS.TYPE.REGULAR,
    color: THEME.COLORS.white,
    textAlign: 'center',
    marginTop: THEME.MARGIN.HIGH,
  },
  inputContainer: {
    marginVertical: THEME.MARGIN.NORMAL,
  },
  actionsContainer: {
    position: 'absolute',
    bottom: RF(70),
    alignSelf: 'center',
  },
});

export default styles;
