import {StyleSheet} from 'react-native';
import {THEME} from '../../../shared/theme';
import {RF} from '../../../shared/theme/responsive';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: THEME.COLORS.primaryBackground,
  },
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.primaryBackground,
    padding: THEME.PADDING.NORMAL,
  },
  label: {color: THEME.COLORS.textLight},
  clearHistory: {alignSelf: 'flex-end'},
  clearHistoryText: {
    color: THEME.COLORS.accentBlue,
  },
  transactions: {marginVertical: THEME.MARGIN.NORMAL},
});

export default styles;
