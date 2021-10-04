import {StyleSheet} from 'react-native';
import {THEME} from '../../../shared/theme';
import {RF} from '../../../shared/theme/responsive';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.primaryBackground,
  },
  innerContainer: {
    paddingHorizontal: RF(10),
    flex: 1,
    paddingTop: RF(20),
  },
  button: {
    marginBottom: THEME.MARGIN.HIGH,
    marginTop: THEME.MARGIN.HIGH,
    height: RF(40),
    width: '80%',
  },
  optionContainer: {
    width: '100%',
    backgroundColor: THEME.COLORS.secondaryBackground,
    borderRadius: THEME.RADIUS.SMALLBOX,
    padding: THEME.PADDING.LOW,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: THEME.MARGIN.NORMAL,
  },
  coinIcon: {
    width: RF(30),
    height: RF(30),
    marginRight: THEME.MARGIN.LOW,
  },
  errors: {
    color: THEME.COLORS.red,
    fontSize: RF(11),
    marginLeft: RF(10),
  },
});

export default styles;
