import {StyleSheet} from 'react-native';
import {THEME} from '.';
import {WP} from './responsive';

const GLOBAL_STYLE = StyleSheet.create({
  CENTER: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  MAIN: {
    flex: 1,
    backgroundColor: THEME.COLORS.primaryBackground,
    paddingHorizontal: THEME.PADDING.LOW,
  },
  ROW: {
    flexDirection: 'row',
  },
});

export default GLOBAL_STYLE;
