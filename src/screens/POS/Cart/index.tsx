import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ICONS} from '../../../assets';
import AppHeader from '../../../shared/components/AppHeader';
import styles from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RF} from '../../../shared/theme/responsive';
import {THEME} from '../../../shared/theme';
import DashedLine from '../../../shared/components/DashedLine';
import AppInput from '../../../shared/components/AppInput';
import PrimaryButton from '../../../shared/components/PrimaryButton';
import {GenericNavigation} from '../../../shared/models/types';

interface Props extends GenericNavigation {}

const Cart = (props: Props) => {
  const removeProoduct = () => console.log('Product Delete');
  const incrementProduct = () => console.log('Increment Product');
  const decrementProduct = () => console.log('Decrement Product');

  const navToTip = () => props.navigation?.navigate('AddTip');

  const renderProductCard = () => {
    return (
      <View style={styles.productCard}>
        <FastImage
          source={ICONS.DUMMY_IMAGE}
          resizeMode={FastImage.resizeMode.contain}
          style={styles.productImage}
        />
        <View style={styles.productDetail}>
          <View style={styles.productTopRow}>
            <Text numberOfLines={1} style={styles.productTitle}>
              Faux Sued Ankle Boots
            </Text>
            <Icon
              onPress={removeProoduct}
              name="delete-outline"
              size={RF(28)}
              color={THEME.COLORS.textLight}
            />
          </View>
          <View style={styles.productBottomRow}>
            <Text numberOfLines={1} style={styles.productPrice}>
              $49.99
            </Text>
            <View style={styles.productCount}>
              <TouchableOpacity
                style={styles.countView}
                onPress={decrementProduct}>
                <Text style={styles.countText}>-</Text>
              </TouchableOpacity>
              <View
                style={[
                  styles.countView,
                  {backgroundColor: THEME.COLORS.blue},
                ]}>
                <Text
                  style={[
                    styles.countText,
                    {fontSize: THEME.FONTS.SIZE.XSMALL},
                  ]}>
                  1
                </Text>
              </View>
              <TouchableOpacity
                style={styles.countView}
                onPress={incrementProduct}>
                <Text style={styles.countText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <>
      <AppHeader title="Cart" showBack />
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.productContainer}>{renderProductCard()}</View>
        <View style={styles.totalContainer}>
          <View style={styles.totalRow}>
            <Text style={styles.totalText}>Items</Text>
            <Text style={styles.totalText}>$ 49.99</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalText}>Tax</Text>
            <Text style={styles.totalText}>$ 01.99</Text>
          </View>
          <DashedLine />
          <View style={[styles.totalRow, {marginTop: THEME.MARGIN.LOW}]}>
            <Text
              style={[
                styles.totalText,
                {fontFamily: THEME.FONTS.TYPE.SEMIBOLD},
              ]}>
              Total
            </Text>
            <Text
              style={[
                styles.totalText,
                {fontFamily: THEME.FONTS.TYPE.SEMIBOLD},
              ]}>
              $ 66.99
            </Text>
          </View>
        </View>
        <View style={styles.personalContainer}>
          <Text style={styles.personalTitle}>Personal Information</Text>
          <View style={styles.nameContainer}>
            <AppInput placeholder="First Name" inputStyle={{width: '48x%'}} />
            <AppInput placeholder="Last Name" inputStyle={{width: '48x%'}} />
          </View>
          <AppInput placeholder="Email Name" />
          <AppInput placeholder="Billing Address" />
        </View>
        <PrimaryButton title="Check out" onPress={navToTip} />
      </KeyboardAwareScrollView>
    </>
  );
};

export default Cart;
