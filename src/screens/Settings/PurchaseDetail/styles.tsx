import {StyleSheet} from 'react-native';
import {THEME} from '../../../shared/theme';
import {RF} from '../../../shared/theme/responsive';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.primaryBackground,
    paddingHorizontal: THEME.PADDING.LOW,
  },
  statusImageContainer: {
    width: '100%',
    height: RF(150),
    paddingVertical: THEME.PADDING.NORMAL,
  },
  statusIcon: {
    height: '100%',
    width: '100%',
  },
  productContainer: {marginVertical: THEME.MARGIN.LOW},
  productCard: {
    padding: THEME.PADDING.NORMAL,
    borderRadius: THEME.RADIUS.BOX,
    width: '100%',
    backgroundColor: THEME.COLORS.secondaryBackground,
    flexDirection: 'row',
    marginBottom: THEME.MARGIN.VERYLOW,
  },
  productDetail: {
    flex: 1,
    justifyContent: 'space-around',
    marginLeft: THEME.MARGIN.NORMAL,
  },
  productImage: {
    width: RF(60),
    height: RF(60),
  },
  productTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productTitle: {
    fontSize: THEME.FONTS.SIZE.XSMALL,
    color: THEME.COLORS.white,
    fontFamily: THEME.FONTS.TYPE.SEMIBOLD,
  },
  productBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: THEME.MARGIN.LOW,
    alignItems: 'center',
  },
  productPrice: {
    fontFamily: THEME.FONTS.TYPE.SEMIBOLD,
    color: THEME.COLORS.white,
  },
  //Total Styles
  totalContainer: {
    padding: THEME.PADDING.NORMAL,
    backgroundColor: THEME.COLORS.secondaryBackground,
    borderRadius: THEME.RADIUS.BOX,
  },
  infoContainer: {
    padding: THEME.PADDING.NORMAL,
    backgroundColor: THEME.COLORS.secondaryBackground,
    borderRadius: THEME.RADIUS.BOX,
    marginBottom: THEME.MARGIN.NORMAL,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: THEME.MARGIN.VERYLOW,
  },
  totalText: {color: THEME.COLORS.white, fontSize: THEME.FONTS.SIZE.XSMALL},
  title: {
    color: THEME.COLORS.white,
    fontSize: THEME.FONTS.SIZE.LARGE,
    marginVertical: THEME.MARGIN.LOW,
  },
  statusContainer: {
    width: '100%',
    height: RF(65),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: THEME.PADDING.NORMAL,
    backgroundColor: THEME.COLORS.secondaryBackground,
  },
  lightText: {
    color: THEME.COLORS.textLight,
    fontSize: THEME.FONTS.SIZE.XSMALL,
    marginTop: THEME.MARGIN.LOW,
  },
});

export default styles;
