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
    alignSelf: 'center',
  },
  saveButton: {width: '100%', marginVertical: THEME.MARGIN.HIGH},
  cameraContainer: {
    width: RF(40),
    height: RF(40),
    zIndex: 3,
    borderRadius: RF(20),
    position: 'absolute',
    bottom: RF(5),
    right: RF(5),
    ...GLOBAL_STYLE.CENTER,
  },
  cameraIcon: {color: THEME.COLORS.white},
  image: {
    flex: 1,
    borderRadius: THEME.RADIUS.BOX,
  },
  errors: {
    fontSize: THEME.FONTS.SIZE.XXXSMALL,
    color: 'red',
    marginLeft: 10,
  },
  gError: {
    textAlign: 'center',
    marginTop: THEME.MARGIN.LOW,
  },
});

export default styles;
