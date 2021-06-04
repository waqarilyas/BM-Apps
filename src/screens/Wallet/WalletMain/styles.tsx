import {StyleSheet} from 'react-native';
import {THEME} from '../../../shared/theme';
import GLOBAL_STYLE from '../../../shared/theme/global';
import {RF} from '../../../shared/theme/responsive';

const styles = StyleSheet.create({
  container: {
    ...GLOBAL_STYLE.MAIN,
  },
  //Chart Styles
  pieChart: {
    height: RF(200),
    width: RF(200),
    alignSelf: 'center',
    marginVertical: THEME.MARGIN.NORMAL,
  },
  innerCircle: {
    position: 'absolute',
    top: RF(40),
    alignSelf: 'center',
    width: RF(150),
    height: RF(150),
    borderRadius: RF(75),
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerLargeText: {
    fontSize: THEME.FONTS.SIZE.XLARGE,
    color: THEME.COLORS.white,
    fontFamily: THEME.FONTS.TYPE.SEMIBOLD,
  },
  innerSmallText: {
    fontSize: THEME.FONTS.SIZE.XSMALL,
    fontFamily: THEME.FONTS.TYPE.REGULAR,
  },
  //List Container
  listContainer: {
    flex: 1,
    marginTop: THEME.MARGIN.LOW,
  },
});

export default styles;
