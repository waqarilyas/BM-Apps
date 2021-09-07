import React from 'react';
import {View, Text, TextInput, TouchableOpacity, FlatList} from 'react-native';
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
import {useSelector, useDispatch} from 'react-redux';
import GLOBAL_STYLE from '../../../shared/theme/global';
import {RootState} from '../../../shared/store';
import {
  decreaseItemCount,
  increaseItemCount,
  removeItemFromCart,
} from '../../../shared/store/reducers/posReducer';
import EmptyScreenComponent from '../../../shared/components/EmptyScreenComponent';

interface Props extends GenericNavigation {}

const Cart = (props: Props) => {
  const dispatch = useDispatch();

  const removeProduct = (item: any) => dispatch(removeItemFromCart(item));
  const incrementProduct = (item: any) => {
    dispatch(increaseItemCount(item));
  };
  const decrementProduct = (item: any) => dispatch(decreaseItemCount(item));
  const {cart, totalCartAmount, totalTax} = useSelector(
    (state: RootState) => state.pos,
  );

  const navToPayment = () => props.navigation?.navigate('Payment');

  const RenderProductCard = ({data}: any) => {
    return (
      <View style={styles.productCard}>
        <FastImage
          source={{uri: data.image}}
          resizeMode={FastImage.resizeMode.cover}
          style={styles.productImage}
        />
        <View style={styles.productDetail}>
          <View style={styles.productTopRow}>
            <Text numberOfLines={1} style={styles.productTitle}>
              {data.title}
            </Text>
            <Icon
              onPress={() => removeProduct(data)}
              name="delete-outline"
              size={RF(28)}
              color={THEME.COLORS.textLight}
            />
          </View>
          <View style={styles.productBottomRow}>
            <Text numberOfLines={1} style={styles.productPrice}>
              ${data.price}
            </Text>
            <View style={styles.productCount}>
              <TouchableOpacity
                style={styles.countView}
                onPress={() => decrementProduct(data)}>
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
                  {data.count}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.countView}
                onPress={() => incrementProduct(data)}>
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
      {cart.length > 0 ? (
        <KeyboardAwareScrollView style={styles.container}>
          <>
            <FlatList
              data={cart}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({item, index}) => {
                return (
                  <View style={styles.productContainer}>
                    <RenderProductCard data={item} />
                  </View>
                );
              }}
            />

            {/* <View style={styles.productContainer}>{renderProductCard()}</View> */}
            <View style={styles.totalContainer}>
              <View style={styles.totalRow}>
                <Text style={styles.totalText}>Items</Text>
                <Text style={styles.totalText}>$ {totalCartAmount}</Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalText}>Tax</Text>
                <Text style={styles.totalText}>$ {totalTax}</Text>
              </View>
              {/* <View style={styles.totalRow}>
                <Text style={styles.totalText}>Tip</Text>
                <TextInput
                  placeholder="Enter Tip"
                  placeholderTextColor={THEME.COLORS.textLight}
                  style={styles.tipInput}
                />
              </View> */}
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
                  $ {totalCartAmount + totalTax}
                </Text>
              </View>
            </View>
            <View style={styles.personalContainer}>
              <Text style={styles.personalTitle}>Personal Information</Text>
              <View style={styles.nameContainer}>
                <AppInput
                  placeholder="First Name"
                  inputStyle={{width: '48%'}}
                />
                <AppInput placeholder="Last Name" inputStyle={{width: '48%'}} />
              </View>
              <AppInput placeholder="Email Name" />
              <AppInput placeholder="Billing Address" />
            </View>
            <PrimaryButton
              title="Check out"
              onPress={navToPayment}
              textStyle={GLOBAL_STYLE.LARGE_BUTTON_TEXT}
            />
          </>
        </KeyboardAwareScrollView>
      ) : (
        <EmptyScreenComponent title="Nothing in cart" />
      )}
    </>
  );
};

export default Cart;
