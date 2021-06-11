import {StyleSheet} from 'react-native';
import {THEME} from '../../../shared/theme';
import {RF} from '../../../shared/theme/responsive';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.primaryBackground,
    padding: THEME.PADDING.LOW,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: THEME.MARGIN.NORMAL,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: THEME.COLORS.white,
    borderRadius: THEME.RADIUS.OVAL,
    padding: THEME.PADDING.NORMAL,
  },
  itemText: {color: THEME.COLORS.white, fontSize: THEME.FONTS.SIZE.SMALL},
});

export default styles;
