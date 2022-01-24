import {StyleSheet, Dimensions} from 'react-native';
import {THEME} from '../../../shared/theme';
import GLOBAL_STYLE from '../../../shared/theme/global';
import {HP, RF} from '../../../shared/theme/responsive';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.primaryBackground,
    paddingHorizontal: RF(15),
  },

  personalContainer: {
    marginVertical: THEME.MARGIN.NORMAL,
    flex: 1,
  },
  personalTitle: {
    color: THEME.COLORS.white,
    fontSize: THEME.FONTS.SIZE.MEDIUM,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: THEME.MARGIN.NORMAL,
  },
  errors: {
    fontSize: THEME.FONTS.SIZE.XXXSMALL,
    color: 'red',
    marginLeft: 10,
  },
  middleLeft: {
    // backgroundColor: 'red',
    flex: 0.5,
  },
  middleRight: {
    // backgroundColor: 'yellow',
    flex: 1,
  },
  middleContainer: {
    // flexDirection: 'row',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyIcon: {
    height: RF(14),
    width: RF(14),
    tintColor: THEME.COLORS.white,
  },
  rightIconContainer: {
    backgroundColor: THEME.COLORS.accentBlue,

    paddingHorizontal: RF(5),
    borderRadius: RF(3),
    marginRight: RF(5),
    padding: RF(3.5),
  },
  apfeeContainer: {
    // backgroundColor:'red',
    flexDirection: 'row',
    alignItems: 'center',
  },
  apInput: {
    flex: 1,
    marginRight: RF(10),
  },
  optionalText: {
    fontSize: RF(12),
    color: THEME.COLORS.textLight,
  },
  confirmButton: {
    width: '80%',
    height: HP(5),
    marginTop: THEME.MARGIN.LOW,
  },
  imageContainer: {
    width: width - RF(32),
    height: width - RF(100),
    backgroundColor: THEME.COLORS.secondaryBackground,
    borderRadius: THEME.RADIUS.BOX,
    // marginTop: THEME.MARGIN.NORMAL,
    alignSelf: 'center',
  },
  image: {
    flex: 1,
    borderRadius: THEME.RADIUS.BOX,
  },
  cameraIcon: {color: THEME.COLORS.white},
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
  liscenceText: {
    color: THEME.COLORS.white,
    fontFamily: THEME.FONTS.TYPE.MEDIUM,
    marginTop: RF(10),
    marginBottom: RF(10),
  },
});

export default styles;
