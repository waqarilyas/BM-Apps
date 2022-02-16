import {StyleSheet} from 'react-native';
import {THEME} from '../../../shared/theme';
import {RF} from '../../../shared/theme/responsive';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.primaryBackground,
    paddingHorizontal: RF(10),
    paddingVertical: RF(5),
  },
  historyContainer: {
    backgroundColor: THEME.COLORS.darkGrey,
    // paddingVertical: RF(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: RF(10),
    borderRadius: RF(4),
    marginTop: RF(10),
    flex: 1,
    minHeight: RF(60),
  },
  sendIcon: {
    height: RF(30),
    width: RF(30),
    marginRight: RF(10),
  },
  historyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingVertical: RF(10),
    paddingLeft: RF(10),
  },
  title: {
    color: THEME.COLORS.white,
    fontWeight: '800',
    fontSize: RF(14),
    // flex: 1,
  },
  titleCenter: {
    color: THEME.COLORS.white,
    fontWeight: '800',
    fontSize: RF(14),
    textAlign: 'center',
  },
  date: {
    fontSize: RF(11),
    // marginTop: RF(4),
    color: THEME.COLORS.white,
  },
  amount: {
    fontWeight: '900',
    color: THEME.COLORS.white,
    fontSize: RF(16),
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftInner: {
    justifyContent: 'center',
    flex: 1,
  },
  shareContainer: {
    backgroundColor: THEME.COLORS.gold,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: RF(10),
    marginLeft: RF(5),
  },
});

export default styles;
