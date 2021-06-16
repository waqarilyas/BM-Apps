import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ICONS} from '../../../assets';
import AppHeader from '../../../shared/components/AppHeader';
import PrimaryButton from '../../../shared/components/PrimaryButton';
import {GenericNavigation} from '../../../shared/models/types';
import {THEME} from '../../../shared/theme';
import styles from './styles';

interface Props extends GenericNavigation {}

const ProductDetails = (props: Props) => {
  const addToCart = () => {
    props.navigation?.navigate('Cart');
  };
  return (
    <>
      <AppHeader title="Product Details" showBack showCart />
      <ScrollView bounces={false} style={styles.container}>
        <View style={styles.productCard}>
          <FastImage
            source={ICONS.DUMMY_IMAGE}
            resizeMode={FastImage.resizeMode.contain}
            style={styles.productImage}
          />
          <Text style={styles.productText}>Faux Sued Ankle Boots</Text>
          <Text
            style={[
              styles.productText,
              {
                fontFamily: THEME.FONTS.TYPE.SEMIBOLD,
                paddingTop: THEME.PADDING.LOW,
              },
            ]}>
            $49.99
          </Text>
        </View>
        <View style={styles.details}>
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
        </View>

        <View style={styles.details}>
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
        </View>

        <View style={styles.details}>
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
        </View>

        <PrimaryButton title="Add to Cart" onPress={addToCart} />
      </ScrollView>
    </>
  );
};

export default ProductDetails;
