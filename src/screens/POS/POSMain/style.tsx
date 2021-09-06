import {StyleSheet} from 'react-native';
import {THEME} from '../../../shared/theme';
import {RF} from '../../../shared/theme/responsive';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.primaryBackground,
    paddingHorizontal: THEME.PADDING.NORMAL,
  },
  topActions: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: THEME.MARGIN.HIGH,
  },
  topAction: {
    flexDirection: 'row',
  },
  actionIcon: {
    width: THEME.FONTS.SIZE.SMALL,
    height: THEME.FONTS.SIZE.SMALL,
  },
  actionText: {
    marginLeft: THEME.MARGIN.LOW,
    fontSize: THEME.FONTS.SIZE.SMALL,
    color: THEME.COLORS.accentBlue,
  },
  productsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: THEME.MARGIN.LOW,
  },
  categoryLabel: {
    color: 'white',
    fontSize: THEME.FONTS.SIZE.LARGE,
    fontFamily: THEME.FONTS.TYPE.SEMIBOLD,
    marginBottom: 5,
  },
});

export default styles;
