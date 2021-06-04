import {StyleSheet} from 'react-native';
import {THEME} from '../../../shared/theme';
import {RF} from '../../../shared/theme/responsive';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: THEME.COLORS.primaryBackground,
  },
  nearByView: {
    width: '100%',
    backgroundColor: THEME.COLORS.primaryBackground,
    borderTopLeftRadius: RF(20),
    borderTopRightRadius: RF(20),
    // top: RF(-10),
    flexDirection: 'row',
    alignItems: 'center',
    padding: THEME.PADDING.HIGH,
  },
  text: {
    fontSize: THEME.FONTS.SIZE.MEDIUM,
    color: 'white',
    marginLeft: THEME.MARGIN.LOW,
  },
  locationContainer: {
    position: 'absolute',
    bottom: RF(0),
    right: RF(0),
  },
  locationImage: {
    width: RF(60),
    height: RF(60),
  },
});

export default styles;
