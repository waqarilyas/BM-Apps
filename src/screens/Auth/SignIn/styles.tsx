import {StyleSheet} from 'react-native';
import {THEME} from '../../../shared/theme';
import GLOBAL_STYLE from '../../../shared/theme/global';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.primaryBackground,
    paddingHorizontal: THEME.PADDING.LOW,
  },
  inputContainer: {
    marginTop: THEME.MARGIN.SUPERHIGH,
    marginBottom: THEME.MARGIN.LOW,
  },
});

export default styles;
