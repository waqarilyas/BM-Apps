import {StyleSheet} from 'react-native';
import {THEME} from '../../../shared/theme';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: THEME.COLORS.primaryBackground,
  },
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.primaryBackground,
  },
  title: {
    fontFamily: THEME.FONTS.TYPE.REGULAR,
    color: THEME.COLORS.white,
    fontSize: THEME.FONTS.SIZE.XXSMALL,
    paddingHorizontal: THEME.PADDING.HIGH,
    marginTop: THEME.MARGIN.NORMAL,
    textAlign: 'center',
  },
  phrasesView: {
    width: '90%',
    height: '70%',
    backgroundColor: THEME.COLORS.secondaryBackground,
    borderRadius: THEME.RADIUS.BOX,
    alignSelf: 'center',
    marginVertical: THEME.MARGIN.NORMAL,
    justifyContent: 'center',
  },
  phraseView: {left: '40%'},
  phraseWord: {
    color: THEME.COLORS.white,
    fontFamily: THEME.FONTS.TYPE.REGULAR,
    fontSize: THEME.FONTS.SIZE.SMALL,
    marginBottom: THEME.MARGIN.LOW,
    textAlign: 'left',
  },
  blurViewStyle: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100%',
    borderRadius: THEME.RADIUS.BOX,
  },
  directions: {
    marginTop: THEME.MARGIN.NORMAL,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eye: {
    width: THEME.FONTS.SIZE.MEDIUM,
    height: THEME.FONTS.SIZE.MEDIUM,
    marginRight: THEME.MARGIN.LOW,
  },
  directionText: {
    color: THEME.COLORS.white,
    fontFamily: THEME.FONTS.TYPE.REGULAR,
    fontSize: THEME.FONTS.SIZE.MEDIUM,
  },
});

export default styles;
