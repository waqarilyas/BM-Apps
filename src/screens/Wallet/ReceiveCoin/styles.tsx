import {StyleSheet} from 'react-native';
import {THEME} from '../../../shared/theme';
import {RF} from '../../../shared/theme/responsive';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: THEME.COLORS.primaryBackground,
  },
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.primaryBackground,
    paddingTop: THEME.MARGIN.VERYHIGH,
  },
  coinIcon: {
    height: RF(60),
    width: RF(60),
    marginVertical: THEME.MARGIN.HIGH,
    alignSelf: 'center',
  },
  //Receive Styles
  qr: {
    width: RF(150),
    height: RF(150),
    alignSelf: 'center',
    marginVertical: THEME.MARGIN.VERYHIGH,
  },
  instruction: {
    color: THEME.COLORS.blue,
    textAlign: 'center',
    fontSize: THEME.FONTS.SIZE.SMALL,
    paddingVertical: THEME.PADDING.NORMAL,
  },
  keyContainer: {
    alignSelf: 'center',
    width: '90%',
    borderRadius: 2,
    borderWidth: 2,
    paddingHorizontal: THEME.PADDING.NORMAL,
    borderStyle: 'dashed',
    borderColor: THEME.COLORS.secondaryBackground,
    alignItems: 'center',
    justifyContent: 'center',
    height: RF(50),
    marginBottom: THEME.MARGIN.NORMAL,
  },
  keyText: {color: THEME.COLORS.white, fontSize: THEME.FONTS.SIZE.SMALL},
  copiedContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: THEME.MARGIN.NORMAL,
  },
  copied: {
    fontSize: THEME.FONTS.SIZE.SMALL,
    color: THEME.COLORS.green,
  },
  qrContainer: {
    alignSelf: 'center',
    padding: RF(5),
    backgroundColor: 'white',
  },
});

export default styles;
