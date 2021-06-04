import {StyleSheet} from 'react-native';
import {THEME} from '../../../shared/theme';
import {RF} from '../../../shared/theme/responsive';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.primaryBackground,
    paddingHorizontal: THEME.PADDING.NORMAL,
    paddingTop: THEME.MARGIN.SUPERHIGH,
  },
  button: {
    marginVertical: THEME.MARGIN.NORMAL,
  },
});

export default styles;
