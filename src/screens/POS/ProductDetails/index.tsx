import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import FastImage from 'react-native-fast-image';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import {ICONS} from '../../../assets';
import AppHeader from '../../../shared/components/AppHeader';
import PrimaryButton from '../../../shared/components/PrimaryButton';
import {GenericNavigation} from '../../../shared/models/types';
import {RootState} from '../../../shared/store';
import {addProductToCart} from '../../../shared/store/reducers/posReducer';

import {THEME} from '../../../shared/theme';
import GLOBAL_STYLE from '../../../shared/theme/global';
import styles from './styles';

interface Props extends GenericNavigation {}

const ProductDetails = (props: Props) => {
  const {data} = props.route?.params;
  const dispatch = useDispatch();
  const {cart} = useSelector((state: RootState) => state.pos);

  const exists = cart.findIndex(item => item._id === data._id) != -1;

  const addToCart = () => {
    dispatch(addProductToCart(data));
    Toast.show({
      text1: 'Success',
      text2: 'Product added to cart successfully',
      type: 'success',
    });
    // props.navigation?.navigate('Cart', {data});
  };
  return (
    <View style={styles.mainContainer}>
      <AppHeader title="Product Details" showBack showCart />
      <ScrollView bounces={false} style={styles.container}>
        <View style={styles.productCard}>
          <FastImage
            source={{uri: data.image}}
            resizeMode={FastImage.resizeMode.cover}
            style={styles.productImage}
          />
          <Text style={styles.productText}>{data.title}</Text>
          <Text
            style={[
              styles.productText,
              {
                fontFamily: THEME.FONTS.TYPE.BOLD,
                paddingTop: THEME.PADDING.LOW,
                fontSize: THEME.FONTS.SIZE.SMALL,
                marginTop: 0,
              },
            ]}>
            ${data.price}
          </Text>
        </View>
        {/* <View style={styles.details}>
          <View style={styles.detailsRow}>
            <View style={{width: '50%'}}>
              <Text style={styles.detailLabel}>Brand</Text>
              <Text style={styles.detailText}>Lily’s Ankle Boots</Text>
            </View>
            <View style={{width: '50%'}}>
              <Text style={[styles.detailLabel, {textAlign: 'right'}]}>
                SKU
              </Text>
              <Text style={[styles.detailText, {textAlign: 'right'}]}>
                0590458902809
              </Text>
            </View>
          </View>
        </View> */}

        {/* <View style={styles.details}>
          <View style={styles.detailsRow}>
            <View style={{width: '50%'}}>
              <Text style={styles.detailLabel}>CONDITION</Text>
              <Text style={styles.detailText}>Brand New, With Box</Text>
            </View>
            <View style={{width: '50%'}}>
              <Text style={[styles.detailLabel, {textAlign: 'right'}]}>
                MATERIAL
              </Text>
              <Text style={[styles.detailText, {textAlign: 'right'}]}>
                Faux Sued, Velvet
              </Text>
            </View>
          </View>
        </View> */}

        {/* <View style={styles.details}>
          <View style={styles.detailsRow}>
            <View style={{width: '50%'}}>
              <Text style={styles.detailLabel}>CATEGORY</Text>
              <Text style={styles.detailText}>Women Shoes</Text>
            </View>
            <View style={{width: '50%'}}>
              <Text style={[styles.detailLabel, {textAlign: 'right'}]}>
                Fitting
              </Text>
              <Text style={[styles.detailText, {textAlign: 'right'}]}>
                True To Size
              </Text>
            </View>
          </View>
        </View> */}

        <PrimaryButton
          title={exists ? 'Product added to cart' : 'Add to Cart'}
          onPress={exists ? null : addToCart}
          textStyle={GLOBAL_STYLE.LARGE_BUTTON_TEXT}
        />
      </ScrollView>
    </View>
  );
};

export default ProductDetails;
