import {StyleSheet} from 'react-native';
import {THEME} from '../../../shared/theme';
import GLOBAL_STYLE from '../../../shared/theme/global';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.primaryBackground,
    paddingHorizontal: THEME.PADDING.LOW,
  },
  checkboxContainer: {
    flexDirection: 'row',
    ...GLOBAL_STYLE.CENTER,
    marginBottom: THEME.MARGIN.NORMAL,
  },
  text: {
    color: THEME.COLORS.textLight,
    flex: 1,
  },
});

export default styles;
