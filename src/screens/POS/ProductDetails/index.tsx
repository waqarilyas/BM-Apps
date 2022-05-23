import React, {useState} from 'react';
import {View, Text, ScrollView, Alert} from 'react-native';
import FastImage from 'react-native-fast-image';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import {ICONS} from '../../../assets';
import AppHeader from '../../../shared/components/AppHeader';
import AppLoader from '../../../shared/components/AppLoader';
import PrimaryButton from '../../../shared/components/PrimaryButton';
import {GenericNavigation} from '../../../shared/models/types';
import {deleteProduct} from '../../../shared/services/merchant.service';
import {RootState} from '../../../shared/store';
import {
  addProductToCart,
  decreaseItemCount,
  removeItemFromCart,
} from '../../../shared/store/reducers/posReducer';

import {THEME} from '../../../shared/theme';
import GLOBAL_STYLE from '../../../shared/theme/global';
import L from '../../../shared/utils/LanguageHandler';
import styles from './styles';

interface Props extends GenericNavigation {}

const ProductDetails = (props: Props) => {
  const {data} = props.route?.params;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {cart} = useSelector((state: RootState) => state.pos);

  const exists = cart.findIndex(item => item._id === data._id) != -1;

  const addToCart = () => {
    dispatch(addProductToCart(data));
    Toast.show({
      text1: L('Successful'),
      text2: L('Product added to cart successfully'),
      type: 'success',
    });
    // props.navigation?.navigate('Cart', {data});
  };

  const handleProductDelete = async () => {
    Alert.alert(
      L('Confirmation!'),
      L('Are you sure you want delete this product'),
      [
        {
          text: L('Cancel'),
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: L('YES'),
          onPress: async () => {
            setLoading(true);
            try {
              await deleteProduct(data._id);
              dispatch(decreaseItemCount(data));
              dispatch(removeItemFromCart(data));
              setLoading(false);

              Toast.show({
                text1: 'Success',
                text2: 'Product deleted successfully',
                type: 'success',
              });
              props.navigation?.goBack();
            } catch (err) {
              console.log('---error---', err);

              Toast.show({
                text1: 'Request Failed',
                text2: 'Unable to delete product at the moment',
                type: 'error',
              });

              setLoading(false);
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <View style={styles.mainContainer}>
      <AppHeader title={L('Product Details')} showBack showCart />
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
          title={exists ? L('Product added to cart') : L('Add to Cart')}
          onPress={exists ? null : addToCart}
          buttonStyle={{height: 43}}
          textStyle={GLOBAL_STYLE.LARGE_BUTTON_TEXT}
        />

        <PrimaryButton
          title={L('Delete Product')}
          onPress={handleProductDelete}
          buttonStyle={{height: 43}}
          textStyle={GLOBAL_STYLE.LARGE_BUTTON_TEXT}
        />
        <AppLoader isVisible={loading} />
      </ScrollView>
    </View>
  );
};

export default ProductDetails;
