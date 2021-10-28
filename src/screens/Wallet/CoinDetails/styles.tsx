import {StyleSheet} from 'react-native';
import {THEME} from '../../../shared/theme';
import GLOBAL_STYLE from '../../../shared/theme/global';
import {RF} from '../../../shared/theme/responsive';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: THEME.COLORS.primaryBackground,
  },
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.primaryBackground,
  },
  tabs: {
    width: '100%',
    height: RF(50),
    flexDirection: 'row',
    // marginTop: THEME.MARGIN.LOW,
  },
  tab: {
    width: '50%',
    ...GLOBAL_STYLE.CENTER,
    borderTopRightRadius: THEME.RADIUS.BOX,
    borderTopLeftRadius: THEME.RADIUS.BOX,
  },
  tabTitle: {
    fontSize: THEME.FONTS.SIZE.XSMALL,
    color: THEME.COLORS.white,
  },
  balance: {
    alignSelf: 'center',
    fontSize: THEME.FONTS.SIZE.LARGE,
    fontFamily: THEME.FONTS.TYPE.MEDIUM,
    paddingBottom: THEME.PADDING.VERYLOW,
    color: THEME.COLORS.white,
  },
  short: {
    fontSize: THEME.FONTS.SIZE.LARGE,
    color: THEME.COLORS.white,
  },
  usdBalance: {
    fontSize: THEME.FONTS.SIZE.XXSMALL,
    color: THEME.COLORS.white,
    textAlign: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
    marginTop: THEME.MARGIN.HIGH,
  },
  details: {
    alignSelf: 'center',
    marginVertical: THEME.MARGIN.HIGH,
    marginTop: THEME.MARGIN.SUPERHIGH,
  },
  actions: {
    paddingHorizontal: THEME.PADDING.LOW,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  transactions: {
    paddingHorizontal: THEME.PADDING.LOW,
    // marginTop: THEME.MARGIN.HIGH,
  },
  secondaryHeader: {
    marginTop: THEME.MARGIN.HIGH,
    marginLeft: THEME.MARGIN.NORMAL,
    marginBottom: THEME.MARGIN.VERYLOW,
    fontSize: THEME.FONTS.SIZE.XSMALL,
    fontFamily: THEME.FONTS.TYPE.REGULAR,
    color: THEME.COLORS.white,
  },
  coinImage: {
    height: RF(80),
    width: RF(80),
    marginBottom: THEME.MARGIN.NORMAL,
    alignSelf: 'center',
  },
});

export default styles;
