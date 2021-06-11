import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ICONS} from '../../../assets';
import AppHeader from '../../../shared/components/AppHeader';
import ProductCard from '../../../shared/components/ProductCard';
import {GenericNavigation} from '../../../shared/models/types';
import {THEME} from '../../../shared/theme';
import styles from './style';
import faker from 'faker';

interface Props extends GenericNavigation {}

const POSMain = (props: Props) => {
  const navToAddProduct = () => {
    props.navigation?.navigate('AddProduct');
  };
  const navToNearBy = () => {
    props.navigation?.navigate('NearBy');
  };
  const navToProductDetail = () => {
    props.navigation?.navigate('ProductDetails');
  };
  return (
    <>
      <AppHeader title="Point of Sale" showSearch showBack showCart />
      <View style={styles.container}>
        <View style={styles.topActions}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.topAction}
            onPress={navToAddProduct}>
            <FastImage
              source={ICONS.PLUS}
              resizeMode={FastImage.resizeMode.contain}
              style={styles.actionIcon}
            />
            <Text style={styles.actionText}>Add Product</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.topAction}
            onPress={navToNearBy}>
            <FastImage
              source={ICONS.LOCATION}
              resizeMode={FastImage.resizeMode.contain}
              style={styles.actionIcon}
            />
            <Text style={styles.actionText}>Nearby</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <Text style={styles.categoryLabel}>Bags</Text>
          <View style={styles.productsContainer}>
            <ProductCard
              name={faker.commerce.product()}
              price={Number(faker.datatype.number()).toFixed(2)}
              onPress={navToProductDetail}
              imageURI={faker.image.avatar()}
            />
            <ProductCard
              name={faker.commerce.product()}
              price={Number(faker.datatype.number()).toFixed(2)}
              onPress={navToProductDetail}
              imageURI={faker.image.avatar()}
            />
            <ProductCard
              name={faker.commerce.product()}
              price={Number(faker.datatype.number()).toFixed(2)}
              onPress={navToProductDetail}
              imageURI={faker.image.avatar()}
            />
          </View>
          <Text style={styles.categoryLabel}>Bags</Text>
          <View style={styles.productsContainer}>
            <ProductCard
              name={faker.commerce.product()}
              price={Number(faker.datatype.number()).toFixed(2)}
              onPress={navToProductDetail}
              imageURI={faker.image.avatar()}
            />
            <ProductCard
              name={faker.commerce.product()}
              price={Number(faker.datatype.number()).toFixed(2)}
              onPress={navToProductDetail}
              imageURI={faker.image.avatar()}
            />
            <ProductCard
              name={faker.commerce.product()}
              price={Number(faker.datatype.number()).toFixed(2)}
              onPress={navToProductDetail}
              imageURI={faker.image.avatar()}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default POSMain;
