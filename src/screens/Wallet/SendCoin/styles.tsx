import {StyleSheet} from 'react-native';
import {THEME} from '../../../shared/theme';
import GLOBAL_STYLE from '../../../shared/theme/global';
import {RF} from '../../../shared/theme/responsive';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.primaryBackground,
    paddingTop: THEME.PADDING.HIGH,
    paddingHorizontal: THEME.PADDING.NORMAL,
  },
  labelContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  max: {
    backgroundColor: THEME.COLORS.accentBlue,
    width: '20%',
    padding: THEME.PADDING.LOW,
    ...GLOBAL_STYLE.CENTER,
    borderRadius: THEME.RADIUS.OVAL,
  },
  maxText: {color: 'white', fontSize: THEME.FONTS.SIZE.XXXSMALL},
  label: {
    fontSize: THEME.FONTS.SIZE.SMALL,
    color: THEME.COLORS.white,
  },
  sideInfo: {width: '100%', alignItems: 'flex-end'},
  availBalalnce: {
    color: THEME.COLORS.textLight,
    fontFamily: THEME.FONTS.TYPE.REGULAR,
  },
  details: {
    width: '100%',
    backgroundColor: THEME.COLORS.secondaryBackground,
    height: RF(75),
    borderRadius: THEME.RADIUS.BOX,
    ...GLOBAL_STYLE.CENTER,
    marginTop: THEME.MARGIN.VERYHIGH,
    marginBottom: THEME.MARGIN.HIGH,
  },
  detailsText: {
    color: THEME.COLORS.white,
  },
  availableText: {
    textAlign: 'left',
    paddingTop: THEME.PADDING.VERYLOW,
    color: THEME.COLORS.green,
  },
  usdText: {
    color: THEME.COLORS.textLight,
    fontSize: THEME.FONTS.SIZE.XXXSMALL,
    textAlign: 'right',
  },
});

export default styles;
