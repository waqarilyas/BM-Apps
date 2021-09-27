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
    ...GLOBAL_STYLE.MAIN,
  },
  pieChart: {
    height: RF(180),
    width: RF(180),
    alignSelf: 'center',
    marginVertical: THEME.MARGIN.NORMAL,
  },
  innerCircle: {
    position: 'absolute',
    top: RF(36),
    alignSelf: 'center',
    width: RF(135),
    height: RF(135),
    borderRadius: RF(135 / 2),
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
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
