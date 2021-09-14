import {Dimensions, StyleSheet} from 'react-native';
import {THEME} from '../../../shared/theme';
import GLOBAL_STYLE from '../../../shared/theme/global';
import {RF} from '../../../shared/theme/responsive';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: THEME.COLORS.primaryBackground,
  },
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.primaryBackground,
    paddingHorizontal: THEME.PADDING.NORMAL,
  },
  productCard: {
    width: width - RF(32),
    height: width - RF(32),
    backgroundColor: THEME.COLORS.secondaryBackground,
    borderRadius: THEME.RADIUS.BOX,
    marginVertical: THEME.MARGIN.NORMAL,
    ...GLOBAL_STYLE.CENTER,
    flex: 1,
  },
  productImage: {
    width: '80%',
    height: RF(240),
    borderRadius: RF(10),
  },
  productText: {
    fontSize: THEME.FONTS.SIZE.MEDIUM,
    fontFamily: THEME.FONTS.TYPE.BOLD,
    color: THEME.COLORS.white,
    marginTop: RF(10),
  },
  details: {
    marginBottom: THEME.MARGIN.NORMAL,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailLabel: {
    textTransform: 'uppercase',
    fontSize: THEME.FONTS.SIZE.XSMALL,
    color: THEME.COLORS.textLight,
  },
  detailText: {
    fontSize: THEME.FONTS.SIZE.XSMALL,
    color: THEME.COLORS.white,
  },
});

export default styles;
