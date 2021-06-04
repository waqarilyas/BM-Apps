import {Dimensions, StyleSheet} from 'react-native';
import {THEME} from '../../../shared/theme';
import GLOBAL_STYLE from '../../../shared/theme/global';
import {RF} from '../../../shared/theme/responsive';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.primaryBackground,
    paddingHorizontal: THEME.PADDING.NORMAL,
  },
  imageContainer: {
    width: width - RF(32),
    height: width - RF(64),
    backgroundColor: THEME.COLORS.secondaryBackground,
    borderRadius: THEME.RADIUS.BOX,
    marginVertical: THEME.MARGIN.NORMAL,
  },
  saveButton: {width: '100%', marginVertical: THEME.MARGIN.HIGH},
  cameraContainer: {
    width: RF(50),
    height: 50,
    borderRadius: RF(25),
    position: 'absolute',
    bottom: RF(-10),
    right: RF(-10),
    ...GLOBAL_STYLE.CENTER,
  },
  cameraIcon: {color: THEME.COLORS.white},
});

export default styles;
