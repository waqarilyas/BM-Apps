import {StyleSheet} from 'react-native';
import {THEME} from '../../../shared/theme';
import {HP, RF} from '../../../shared/theme/responsive';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: THEME.COLORS.primaryBackground,
  },
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.primaryBackground,
    padding: THEME.PADDING.NORMAL,
  },
  coinIcon: {
    width: RF(30),
    height: RF(30),
    marginRight: THEME.MARGIN.LOW,
    marginLeft: THEME.MARGIN.LOW,
  },
  label: {color: THEME.COLORS.textLight},
  optionContainer: {
    width: '100%',
    backgroundColor: THEME.COLORS.secondaryBackground,
    borderRadius: THEME.RADIUS.SMALLBOX,
    padding: THEME.PADDING.LOW,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: THEME.MARGIN.NORMAL,
  },
  amountContainer: {
    alignSelf: 'center',
    marginVertical: THEME.MARGIN.LOW,
  },
  amountBTC: {
    color: THEME.COLORS.white,
    fontSize: THEME.FONTS.SIZE.SMALL,
    textAlign: 'center',
  },
  amountUSD: {
    marginTop: THEME.MARGIN.SUPERLOW,
    color: THEME.COLORS.textLight,
    fontSize: THEME.FONTS.SIZE.MEDIUM,
    textAlign: 'center',
  },
  qr: {
    width: RF(150),
    height: RF(150),
    alignSelf: 'center',
    marginVertical: THEME.MARGIN.NORMAL,
  },
  instruction: {
    color: THEME.COLORS.accentBlue,
    textAlign: 'center',
    fontSize: THEME.FONTS.SIZE.XSMALL,
    paddingVertical: THEME.PADDING.NORMAL,
    flex: 1,
  },
  keyContainer: {
    alignSelf: 'center',
    // width: '90%',
    borderRadius: 2,
    borderWidth: 2,
    paddingHorizontal: THEME.PADDING.NORMAL,
    borderStyle: 'dashed',
    borderColor: THEME.COLORS.secondaryBackground,
    alignItems: 'center',
    justifyContent: 'center',
    height: RF(40),
  },
  keyText: {color: THEME.COLORS.white, fontSize: THEME.FONTS.SIZE.SMALL},
  copiedContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: THEME.MARGIN.NORMAL,
  },
  copied: {
    fontSize: THEME.FONTS.SIZE.SMALL,
    color: THEME.COLORS.green,
  },
  shareButton: {
    width: '80%',
    height: HP(4.5),
    marginTop: THEME.MARGIN.LOW,
  },
  confirmButton: {
    width: '80%',
    height: HP(4.5),
    // marginTop: THEME.MARGIN.LOW,
  },

  qrContainer: {
    // width: '100%',
    alignItems: 'center',
    backgroundColor: THEME.COLORS.white,
    alignSelf: 'center',
    padding: 4,
  },
  rightButton: {
    backgroundColor: THEME.COLORS.accentBlue,
    paddingVertical: RF(3),
    paddingHorizontal: RF(5),
    borderRadius: RF(3),
  },
  rightText: {
    color: THEME.COLORS.white,
    fontWeight: '600',
  },
  personalContainer: {marginVertical: THEME.MARGIN.NORMAL},
  personalTitle: {
    color: THEME.COLORS.white,
    fontSize: THEME.FONTS.SIZE.MEDIUM,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: THEME.MARGIN.NORMAL,
  },
  errors: {
    fontSize: THEME.FONTS.SIZE.XXXSMALL,
    color: 'red',
    marginLeft: 10,
  },
  middleLeft: {
    // backgroundColor: 'red',
    flex: 0.5,
  },
  middleRight: {
    // backgroundColor: 'yellow',
    flex: 1,
  },
  middleContainer: {
    // flexDirection: 'row',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyIcon: {
    height: RF(14),
    width: RF(14),
    tintColor: THEME.COLORS.white,
  },
  rightIconContainer: {
    backgroundColor: THEME.COLORS.accentBlue,

    paddingHorizontal: RF(5),
    borderRadius: RF(3),
    marginRight: RF(5),
    padding: RF(3.5),
  },
  apfeeContainer: {
    // backgroundColor:'red',
    flexDirection: 'row',
    alignItems: 'center',
  },
  apInput: {
    flex: 1,
    marginRight: RF(10),
  },
  optionalText: {
    fontSize: RF(12),
    color: THEME.COLORS.textLight,
  },
});

export default styles;
