import {StyleSheet} from 'react-native';
import {THEME} from '../../../shared/theme';
import {HP, RF} from '../../../shared/theme/responsive';

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
  placesContainer: {
    marginTop: THEME.MARGIN.SUPERLOW,
  },
  placesInput: {
    backgroundColor: THEME.COLORS.secondaryBackground,
    height: HP(6),
    borderRadius: RF(30),
    color: THEME.COLORS.white,
    paddingHorizontal: RF(16),
  },
  placesText: {
    color: THEME.COLORS.white,
  },
  placesRow: {
    backgroundColor: THEME.COLORS.secondaryBackground,
  },
});

export default styles;
