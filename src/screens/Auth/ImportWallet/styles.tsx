import {StyleSheet} from 'react-native';
import {THEME} from '../../../shared/theme';
import {HP, RF} from '../../../shared/theme/responsive';

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
  input: {
    borderRadius: THEME.RADIUS.BOX,
    height: HP(16),
    paddingHorizontal: THEME.PADDING.LOW,
    paddingVertical: THEME.PADDING.LOW,
  },
  actionsContainer: {
    position: 'absolute',
    bottom: RF(70),
    alignSelf: 'center',
  },
  textInput: {
    fontSize: THEME.FONTS.SIZE.SMALL,
  },
});

export default styles;
