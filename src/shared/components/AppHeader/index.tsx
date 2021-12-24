import {useNavigation} from '@react-navigation/core';
import React, {ReactChild} from 'react';
import {
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {ICONS} from '../../../assets';
import {RootState} from '../../store';
import {setShowBalances} from '../../store/reducers/walletReducer';
import {THEME} from '../../theme';
import GLOBAL_STYLE from '../../theme/global';
import {RF} from '../../theme/responsive';

interface Props {
  title?: string | undefined;
  showBack?: boolean;
  showCart?: boolean;
  showSearch?: boolean;
  showEye?: boolean;
  backAction?: () => void;
  headerStyle?: StyleProp<ViewStyle>;
  searchAction?: () => void;
  customRightView?: ReactChild;
}

const AppHeader = (props: Props) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const {isRendered} = useSelector((state: RootState) => state.wallet);
  const {cart} = useSelector((state: RootState) => state.pos);
  const {showBalances} = useSelector((state: RootState) => state.wallet);

  let notificationCount = cart.length;

  const showCart = () => {
    navigation.navigate('Cart');
  };

  const toggleEye = () => dispatch(setShowBalances(!showBalances));

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          backgroundColor: isRendered
            ? THEME.COLORS.secondaryBackground
            : THEME.COLORS.primaryBackground,
        },
        props.headerStyle,
      ]}>
      <View style={styles.left}>
        {props.showBack ? (
          <Icon
            onPress={props.backAction ? props.backAction : navigation.goBack}
            name="keyboard-backspace"
            size={30}
            style={styles.icon}
          />
        ) : (
          <View />
        )}
        <Text
          style={[
            styles.header,
            {
              fontSize:
                props.title?.length >= 25
                  ? THEME.FONTS.SIZE.XXSMALL
                  : THEME.FONTS.SIZE.MEDIUM,
            },
          ]}>
          {props.title || ''}
        </Text>
      </View>
      <View style={styles.right}>
        {props.showEye ? (
          <TouchableOpacity
            activeOpacity={1}
            onPress={toggleEye}
            style={styles.rightButton}>
            <FastImage
              source={showBalances ? ICONS.EYE_OFF : ICONS.EYE}
              resizeMode={FastImage.resizeMode.contain}
              style={{width: RF(25), height: RF(25)}}
            />
          </TouchableOpacity>
        ) : (
          <View />
        )}
        {props.showSearch ? (
          <TouchableOpacity onPress={props.searchAction}>
            <FastImage
              source={ICONS.SEARCH}
              resizeMode={FastImage.resizeMode.contain}
              style={styles.search}
            />
          </TouchableOpacity>
        ) : null}
        {props.showCart ? (
          <TouchableOpacity onPress={showCart} style={{paddingBottom: RF(4)}}>
            <FastImage
              source={ICONS.CART}
              resizeMode={FastImage.resizeMode.contain}
              style={styles.cart}
            />
            <View style={styles.countView}>
              <Text
                style={[
                  styles.count,
                  Platform.OS == 'android' && {
                    lineHeight: 16,
                  },
                ]}>
                {notificationCount}
              </Text>
            </View>
          </TouchableOpacity>
        ) : props.customRightView ? (
          props.customRightView
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
  rightButton: {
    // justifyContent: "center",
    alignItems: 'center',
    marginRight: THEME.MARGIN.LOW,
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
    // backgroundColor: 'yellow',
  },
  countView: {
    position: 'absolute',
    top: RF(Platform.OS === 'ios' ? 10 : 7),
    right: RF(9),
    backgroundColor: THEME.COLORS.countRed,
    height: RF(18),
    width: RF(18),
    borderRadius: RF(9),
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',

    // ...GLOBAL_STYLE.CENTER,
  },
});
