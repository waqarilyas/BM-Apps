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
    paddingHorizontal: THEME.PADDING.NORMAL,
  },
  tipInput: {
    color: THEME.COLORS.white,
    paddingVertical: 0,
    width: RF(50),
    textAlign: 'right',
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
    alignItems: 'center',
  },
  productCount: {flexDirection: 'row'},
  countView: {
    borderWidth: 1,
    height: RF(30),
    width: RF(30),
    ...GLOBAL_STYLE.CENTER,
    borderColor: THEME.COLORS.accentBlue,
  },
  countText: {color: THEME.COLORS.white, fontSize: THEME.FONTS.SIZE.SMALL},
  totalContainer: {
    padding: THEME.PADDING.NORMAL,
    backgroundColor: THEME.COLORS.secondaryBackground,
    borderRadius: THEME.RADIUS.BOX,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: THEME.MARGIN.VERYLOW,
  },
  totalText: {color: THEME.COLORS.white, fontSize: THEME.FONTS.SIZE.XSMALL},
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
  bottomButtonContainer: {
    marginTop: THEME.MARGIN.NORMAL,
  },
});

export default styles;
