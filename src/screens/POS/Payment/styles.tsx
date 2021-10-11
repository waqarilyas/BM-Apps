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
    fontSize: THEME.FONTS.SIZE.MEDIUM,
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
    fontSize: THEME.FONTS.SIZE.SMALL,
    paddingVertical: THEME.PADDING.NORMAL,
  },
  keyContainer: {
    alignSelf: 'center',
    width: '90%',
    borderRadius: 2,
    borderWidth: 2,
    paddingHorizontal: THEME.PADDING.NORMAL,
    borderStyle: 'dashed',
    borderColor: THEME.COLORS.secondaryBackground,
    alignItems: 'center',
    justifyContent: 'center',
    height: RF(50),
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
    width: '55%',
    height: HP(6),
    marginTop: THEME.MARGIN.LOW,
  },
  confirmButton: {
    width: '80%',
    height: HP(6),
    marginTop: THEME.MARGIN.LOW,
  },

  qrContainer: {
    width: '100%',
    alignItems: 'center',
  },
});

export default styles;
