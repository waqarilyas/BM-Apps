import {StyleSheet} from 'react-native';
import {THEME} from '../../../shared/theme';
import {RF} from '../../../shared/theme/responsive';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.primaryBackground,
    padding: THEME.PADDING.LOW,
  },
  label: {
    color: THEME.COLORS.textLight,
    marginVertical: THEME.MARGIN.LOW,
    fontSize: THEME.FONTS.SIZE.SMALL,
  },
  coinsList: {marginVertical: THEME.MARGIN.LOW},
});

export default styles;
