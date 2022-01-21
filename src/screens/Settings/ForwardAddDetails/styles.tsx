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
    paddingHorizontal: THEME.PADDING.MID_LOW,
    paddingTop: THEME.PADDING.SUPERHIGH,
  },
  label: {
    color: 'grey',
    fontSize: THEME.FONTS.SIZE.XXSMALL,
    fontFamily: THEME.FONTS.TYPE.REGULAR,
  },
  modalHeading: {
    alignSelf: 'center',
    marginBottom: THEME.MARGIN.LOW,
    color: THEME.COLORS.white,
    fontFamily: THEME.FONTS.TYPE.SEMIBOLD,
    fontSize: THEME.FONTS.SIZE.SMALL,
  },
  coinImage: {height: RF(25), width: RF(25), alignSelf: 'center'},
  coinName: {
    color: THEME.COLORS.white,
    fontSize: THEME.FONTS.SIZE.XXSMALL,
    fontFamily: THEME.FONTS.TYPE.REGULAR,
    marginHorizontal: THEME.MARGIN.NORMAL,
    alignSelf: 'center',
  },
  addressContainer: {
    borderRadius: THEME.RADIUS.SMALLBOX,
    backgroundColor: THEME.COLORS.darkGrey,
    flexDirection: 'row',
    paddingHorizontal: THEME.PADDING.NORMAL,
    paddingVertical: RF(19),
    marginVertical: THEME.MARGIN.NORMAL,
    alignItems: 'center',
  },
  addressText: {
    color: THEME.COLORS.white,
    fontSize: THEME.FONTS.SIZE.XXSMALL,
    fontFamily: THEME.FONTS.TYPE.REGULAR,
  },
  pickerButton: {
    borderRadius: THEME.RADIUS.SMALLBOX,
    backgroundColor: THEME.COLORS.darkGrey,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: THEME.MARGIN.NORMAL,
    paddingVertical: THEME.MARGIN.NORMAL,
    marginVertical: THEME.MARGIN.NORMAL,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: THEME.MARGIN.NORMAL,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: THEME.COLORS.white,
    borderRadius: THEME.RADIUS.OVAL,
    padding: THEME.PADDING.NORMAL,
  },
  labelItem: {
    alignSelf: 'center',
    color: THEME.COLORS.white,
    fontSize: THEME.FONTS.SIZE.SMALL,
    fontFamily: THEME.FONTS.TYPE.MEDIUM,
    marginHorizontal: THEME.MARGIN.LOW,
  },
  buttonView: {
    borderBottomWidth: 0.5,
    borderColor: THEME.COLORS.darkGrey,
    padding: THEME.PADDING.NORMAL,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  chevronDown: {height: RF(10), width: RF(10), alignSelf: 'center'},
  itemText: {
    color: THEME.COLORS.white,
    fontSize: THEME.FONTS.SIZE.SMALL,
  },
  cross: {width: RF(25), height: RF(25)},
});

export default styles;
