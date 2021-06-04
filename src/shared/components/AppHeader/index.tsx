import React from 'react';
import {StyleSheet, Text, View, Platform} from 'react-native';
import {THEME} from '../../theme';
import {RF, WP} from '../../theme/responsive';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/core';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import {ICONS} from '../../../assets';
import GLOBAL_STYLE from '../../theme/global';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface Props {
  title?: string;
  showBack?: boolean;
  showCart?: boolean;
  showSearch?: boolean;
  backAction?: () => void;
}

const AppHeader = (props: Props) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  let notificationCount = 7;

  const showCart = () => {
    navigation.navigate('Cart');
  };

  const showSearch = () => {
    console.log('Show Search');
  };
  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <View style={styles.left}>
        {props.showBack ? (
          <Icon
            onPress={navigation.goBack}
            name="keyboard-backspace"
            size={30}
            style={styles.icon}
          />
        ) : (
          <View />
        )}
        <Text style={styles.header}>{props.title || ''}</Text>
      </View>
      <View style={styles.right}>
        {props.showSearch ? (
          <TouchableOpacity onPress={showSearch}>
            <FastImage
              source={ICONS.SEARCH}
              resizeMode={FastImage.resizeMode.contain}
              style={styles.search}
            />
          </TouchableOpacity>
        ) : null}
        {props.showCart ? (
          <TouchableOpacity onPress={showCart}>
            <FastImage
              source={ICONS.CART}
              resizeMode={FastImage.resizeMode.contain}
              style={styles.cart}
            />
            <View style={styles.countView}>
              <Text style={styles.count}>{notificationCount}</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </View>
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.COLORS.primaryBackground,
    width: '100%',
    height: RF(Platform.OS == 'ios' ? 40 : 80),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: RF(10),
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    color: 'white',
  },
  header: {
    textAlignVertical: 'center',
    color: THEME.COLORS.white,
    fontFamily: THEME.FONTS.TYPE.SEMIBOLD,
    fontSize: THEME.FONTS.SIZE.MEDIUM,
    marginLeft: THEME.MARGIN.NORMAL,
  },
  right: {
    flexDirection: 'row',
  },
  cart: {
    width: RF(24),
    height: RF(24),
    marginLeft: THEME.MARGIN.NORMAL,
  },
  search: {
    width: RF(20),
    height: RF(20),
    marginLeft: THEME.MARGIN.NORMAL,
  },
  count: {
    color: THEME.COLORS.white,
  },
  countView: {
    position: 'absolute',
    top: RF(Platform.OS === 'ios' ? 10 : 7),
    right: RF(9),
    backgroundColor: THEME.COLORS.countRed,
    height: RF(18),
    width: RF(18),
    borderRadius: RF(9),
    ...GLOBAL_STYLE.CENTER,
  },
});
