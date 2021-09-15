import {StyleSheet} from 'react-native';
import {THEME} from '../../../shared/theme';
import {RF} from '../../../shared/theme/responsive';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.primaryBackground,
  },
  middleContainer: {
    flex: 1,
  },
  addButton: {
    marginBottom: THEME.MARGIN.HIGH,
    marginTop: THEME.MARGIN.HIGH,
    height: RF(40),
    width: '80%',
  },
  filterContainer: {
    backgroundColor: THEME.COLORS.secondaryBackground,
    alignItems: 'center',
    width: RF(80),
    paddingVertical: RF(6),
    marginRight: RF(5),
    borderRadius: RF(8),
  },
  selectionImage: {
    height: RF(35),
    width: RF(35),
  },
  filtersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: RF(5),
    paddingLeft: RF(10),
  },
  selectionName: {
    fontSize: RF(11),
    marginTop: RF(3),
    color: THEME.COLORS.white,
  },
  addressContainer: {
    backgroundColor: THEME.COLORS.secondaryBackground,
    marginTop: RF(10),
    padding: RF(10),
    alignSelf: 'center',
    width: '90%',
    borderRadius: RF(8),
  },
  addressName: {
    fontWeight: '800',
    color: THEME.COLORS.white,
  },
  listHeader: {
    color: THEME.COLORS.white,
    marginTop: RF(20),
    fontWeight: '800',
    marginLeft: RF(15),
    fontSize: RF(14),
  },
  address: {
    fontSize: RF(11),
    marginTop: RF(3),
    color: THEME.COLORS.white,
  },
  selectedFilter: {
    borderWidth: 1,
    borderColor: THEME.COLORS.gold,
  },
});

export default styles;
