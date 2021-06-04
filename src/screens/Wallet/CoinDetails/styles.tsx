import {StyleSheet} from 'react-native';
import {THEME} from '../../../shared/theme';
import GLOBAL_STYLE from '../../../shared/theme/global';
import {RF} from '../../../shared/theme/responsive';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.primaryBackground,
  },
  tabs: {
    width: '100%',
    height: RF(50),
    flexDirection: 'row',
    marginTop: THEME.MARGIN.LOW,
  },
  tab: {
    width: '50%',
    ...GLOBAL_STYLE.CENTER,
    borderTopRightRadius: THEME.RADIUS.BOX,
    borderTopLeftRadius: THEME.RADIUS.BOX,
  },
  tabTitle: {
    color: THEME.COLORS.white,
  },
  balance: {
    fontSize: THEME.FONTS.SIZE.XXLARGE,
    fontFamily: THEME.FONTS.TYPE.SEMIBOLD,
    paddingBottom: THEME.PADDING.LOW,
    color: THEME.COLORS.white,
  },
  short: {
    fontSize: THEME.FONTS.SIZE.MEDIUM,
    color: THEME.COLORS.gold,
  },
  usdBalance: {
    fontSize: THEME.FONTS.SIZE.SMALL,
    color: THEME.COLORS.textLight,
    textAlign: 'center',
  },
  details: {
    alignSelf: 'center',
    marginVertical: THEME.MARGIN.SUPERHIGH,
    marginTop: THEME.MARGIN.NOVAHIGH,
  },
  actions: {
    paddingHorizontal: THEME.PADDING.LOW,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  transactions: {
    paddingTop: THEME.PADDING.HIGH,
    paddingHorizontal: THEME.PADDING.LOW,
  },
});

export default styles;
