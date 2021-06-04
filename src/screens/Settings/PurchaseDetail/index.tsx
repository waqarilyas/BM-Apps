import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ICONS} from '../../../assets';
import AppHeader from '../../../shared/components/AppHeader';
import DashedLine from '../../../shared/components/DashedLine';
import {THEME} from '../../../shared/theme';
import {RF} from '../../../shared/theme/responsive';
import styles from './styles';

interface Props {}

const PurchaseDetail = (props: Props) => {
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
          </View>
          <View style={styles.productBottomRow}>
            <Text
              numberOfLines={1}
              style={[styles.productPrice, {flex: 1, color: 'white'}]}>
              $49.99
            </Text>
            <Text style={styles.productPrice}> Quantity 1</Text>
          </View>
        </View>
      </View>
    );
  };
  let status = 'Completed';
  const getStatusColor = () => {
    if (status === 'Pending') {
      return THEME.COLORS.textLight;
    } else if (status === 'Completed') {
      return THEME.COLORS.green;
    } else {
      return THEME.COLORS.red;
    }
  };
  return (
    <>
      <AppHeader title="Order Detail" showBack showCart />
      <View style={styles.container}>
        <View style={styles.productContainer}>{renderProductCard()}</View>

        <View style={styles.infoContainer}>
          <View style={styles.totalRow}>
            <Text style={styles.totalText}>Date</Text>
            <Text style={styles.totalText}>29 Nov, 2021</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalText}>Invoice #</Text>
            <Text style={styles.totalText}>#05904589</Text>
          </View>
        </View>

        <View style={styles.totalContainer}>
          <View style={styles.totalRow}>
            <Text style={styles.totalText}>Items</Text>
            <Text style={styles.totalText}>$ 49.99</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalText}>Tax</Text>
            <Text style={styles.totalText}>$ 01.99</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalText}>Tip</Text>
            <Text style={styles.totalText}>$ 15.00</Text>
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
        <Text style={styles.title}>Payment Status</Text>
        <View style={styles.statusContainer}>
          <View>
            <Text style={styles.totalText}>0.024 BTC</Text>
            <Text style={styles.lightText}>$66.99 USD</Text>
          </View>
          <View>
            <Text style={[styles.totalText, {color: getStatusColor()}]}>
              Completed
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default PurchaseDetail;
