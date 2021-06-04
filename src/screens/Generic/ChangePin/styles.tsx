import {StyleSheet} from 'react-native';
import {THEME} from '../../../shared/theme';
import {RF} from '../../../shared/theme/responsive';
import {Platform} from 'react-native';

export const CELL_SIZE = RF(40);
export const CELL_BORDER_RADIUS = RF(20);
export const DEFAULT_CELL_BG_COLOR = THEME.COLORS.secondaryBackground;
export const NOT_EMPTY_CELL_BG_COLOR = THEME.COLORS.white;
export const ACTIVE_CELL_BG_COLOR = THEME.COLORS.secondaryBackground;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.primaryBackground,
    paddingHorizontal: THEME.PADDING.NORMAL,
  },
  screenTitle: {
    fontSize: THEME.FONTS.SIZE.MEDIUM,
    color: THEME.COLORS.white,
    textAlign: 'center',
    marginTop: THEME.MARGIN.LOW,
  },
  screenSubTitle: {
    fontSize: THEME.FONTS.SIZE.SMALL,
    color: THEME.COLORS.textLight,
    textAlign: 'center',
  },
  //Code Field
  codeFieldRoot: {
    height: CELL_SIZE,
    paddingHorizontal: 20,
    justifyContent: 'center',
    marginVertical: THEME.MARGIN.HIGH,
  },
  cell: {
    marginHorizontal: 8,
    height: CELL_SIZE,
    width: CELL_SIZE,
    lineHeight: CELL_SIZE - 5,
    fontSize: 30,
    textAlign: 'center',
    color: THEME.COLORS.white,
    backgroundColor: '#fff',
  },
});

export default styles;
