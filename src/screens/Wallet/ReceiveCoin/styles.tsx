import {StyleSheet} from 'react-native';
import {THEME} from '../../../shared/theme';
import {RF} from '../../../shared/theme/responsive';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: THEME.COLORS.primaryBackground,
  },
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.primaryBackground,
    paddingTop: THEME.MARGIN.VERYHIGH,
  },
  coinIcon: {
    height: RF(60),
    width: RF(60),
    marginVertical: THEME.MARGIN.HIGH,
    alignSelf: 'center',
  },
  //Receive Styles
  qr: {
    width: RF(150),
    height: RF(150),
    alignSelf: 'center',
    marginVertical: THEME.MARGIN.VERYHIGH,
    marginTop: THEME.MARGIN.SUPERHIGH,
  },
  instruction: {
    color: THEME.COLORS.white,
    textAlign: 'center',
    fontSize: THEME.FONTS.SIZE.XXSMALL,
    paddingTop: THEME.PADDING.SUPERHIGH,
    paddingBottom: THEME.PADDING.NORMAL,
  },
  keyContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: '90%',
    borderRadius: 2,
    borderWidth: 2,
    paddingHorizontal: THEME.PADDING.HIGH,
    borderStyle: 'dashed',
    borderColor: THEME.COLORS.tintBlue,
    alignItems: 'center',
    justifyContent: 'center',
    height: RF(50),
    marginBottom: THEME.MARGIN.NORMAL,
  },
  keyText: {color: THEME.COLORS.white, fontSize: THEME.FONTS.SIZE.SMALL},
  copiedContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: THEME.MARGIN.NORMAL,
  },
  copied: {
    fontSize: THEME.FONTS.SIZE.SMALL,
    color: THEME.COLORS.green,
  },
  noteView: {
    marginHorizontal: THEME.MARGIN.NORMAL,
    marginTop: THEME.MARGIN.NORMAL,
  },
  note: {
    fontFamily: THEME.FONTS.TYPE.REGULAR,
    fontSize: THEME.FONTS.SIZE.XXXSMALL,
    color: THEME.COLORS.textLight,
    marginBottom: THEME.MARGIN.LOW,
  },
});

export default styles;
