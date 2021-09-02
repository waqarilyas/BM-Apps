import {StyleSheet} from 'react-native';
import {THEME} from '../../../shared/theme';
import {RF} from '../../../shared/theme/responsive';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.primaryBackground,
    padding: THEME.PADDING.NORMAL,
  },
  label: {
    color: THEME.COLORS.textLight,
    marginVertical: THEME.MARGIN.LOW,
    fontSize: THEME.FONTS.SIZE.SMALL,
  },
  mapView: {
    width: '100%',
    height: RF(150),
    borderRadius: THEME.RADIUS.OVAL,
    marginVertical: THEME.MARGIN.LOW,
    overflow: 'hidden',
  },
  imagesContainer: {
    marginBottom: THEME.MARGIN.LOW,
    width: '100%',
  },
  addButton: {
    width: '100%',
    marginBottom: THEME.MARGIN.HIGH,
    marginTop: THEME.MARGIN.HIGH,
  },
  errors: {
    fontSize: THEME.FONTS.SIZE.XXXSMALL,
    color: 'red',
    marginLeft: 10,
  },
});

export default styles;
