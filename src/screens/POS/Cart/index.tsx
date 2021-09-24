import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import AppHeader from '../../../shared/components/AppHeader';
import DashedLine from '../../../shared/components/DashedLine';
import EmptyScreenComponent from '../../../shared/components/EmptyScreenComponent';
import PrimaryButton from '../../../shared/components/PrimaryButton';
import {GenericNavigation} from '../../../shared/models/types';
import {calculateTotal} from '../../../shared/services/helper.service';
import {RootState} from '../../../shared/store';
import {
  decreaseItemCount,
  increaseItemCount,
  removeItemFromCart,
} from '../../../shared/store/reducers/posReducer';
import {THEME} from '../../../shared/theme';
import GLOBAL_STYLE from '../../../shared/theme/global';
import {RF} from '../../../shared/theme/responsive';
import L from '../../../shared/utils/LanguageHandler';
import styles from './styles';

interface Props extends GenericNavigation {}

const Cart = (props: Props) => {
  const dispatch = useDispatch();

  const removeProduct = (item: any) => dispatch(removeItemFromCart(item));
  const incrementProduct = (item: any) => {
    dispatch(increaseItemCount(item));
  };
  const decrementProduct = (item: any) => dispatch(decreaseItemCount(item));
  const {cart, totalCartAmount, customPrice, APFee, totalTaxAmount} =
    useSelector((state: RootState) => state.pos);

  const navToPayment = () =>
    props.navigation?.navigate('Payment', {type: 'cart'});

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
            <Text numberOfLines={1} style={styles.productPrice}>
              Tax: {data.tax}%
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
    <View style={styles.mainContainer}>
      <AppHeader title={L('Cart')} showBack />
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
            {/* <AppInput
              placeholder={L('Enter Custom Price')}
              keyboardType="number-pad"
              onChangeText={p => {
                dispatch(setCustomPrice(parseFloat(p)));
              }}
            /> */}

            {/* <View style={styles.productContainer}>{renderProductCard()}</View> */}
            <View style={styles.totalContainer}>
              <View style={styles.totalRow}>
                <Text style={styles.totalText}>{L('Price')}</Text>
                <Text style={styles.totalText}>
                  $ {customPrice ? customPrice : totalCartAmount}
                </Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalText}>{L('Tax Deduction')}</Text>
                <Text style={styles.totalText}>
                  ${' '}
                  {customPrice
                    ? APFee
                      ? APFee
                      : 0
                    : totalTaxAmount.toFixed(2)}{' '}
                </Text>
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
                  {L('Total')}
                </Text>
                <Text
                  style={[
                    styles.totalText,
                    {fontFamily: THEME.FONTS.TYPE.SEMIBOLD},
                  ]}>
                  ${' '}
                  {customPrice
                    ? calculateTotal(customPrice, APFee ? APFee : 0)
                    : totalCartAmount + totalTaxAmount}
                </Text>
              </View>
            </View>
            {/* <View style={styles.personalContainer}>
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
            </View> */}
            <View style={styles.bottomButtonContainer}>
              <PrimaryButton
                title={L('Check out')}
                onPress={navToPayment}
                textStyle={[GLOBAL_STYLE.LARGE_BUTTON_TEXT]}
              />
            </View>
          </>
        </KeyboardAwareScrollView>
      ) : (
        <EmptyScreenComponent title={L('Nothing in cart')} />
      )}
    </View>
  );
};

export default Cart;
