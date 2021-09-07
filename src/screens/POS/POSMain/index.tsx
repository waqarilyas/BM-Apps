import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
  Alert,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Toast from 'react-native-toast-message';
import {useSelector} from 'react-redux';
import {ICONS} from '../../../assets';
import AppHeader from '../../../shared/components/AppHeader';
import AppLoader from '../../../shared/components/AppLoader';
import EmptyScreenComponent from '../../../shared/components/EmptyScreenComponent';
import ProductCard from '../../../shared/components/ProductCard';
import {GenericNavigation} from '../../../shared/models/types';
import {getMerchantProducts} from '../../../shared/services/merchant.service';
import {RootState} from '../../../shared/store';
import {setMerchantShop} from '../../../shared/store/reducers/userReducer';
import styles from './style';

interface Props extends GenericNavigation {}

const POSMain = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);
  const {merchantShop} = useSelector((state: RootState) => state.user);

  const wait = (timeout: any) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = () => {
    setRefreshing(true);
    setReload(!reload);
    wait(2000).then(() => setRefreshing(false));
  };

  const navToAddProduct = () => {
    if (!merchantShop) {
      Alert.alert('Failed', 'Please add a shop to continue', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);

      return;
    }

    props.navigation?.navigate('AddProduct');
  };
  const navToNearBy = () => {
    props.navigation?.navigate('NearBy');
  };
  const navToProductDetail = (item: any) => {
    props.navigation?.navigate('ProductDetails', {data: item});
  };

  useEffect(() => {
    const unsubscribe = props.navigation?.addListener('focus', () => {
      setReload(!reload);
    });

    return unsubscribe;
  }, [props.navigation]);

  useEffect(() => {
    setLoading(true);

    getMerchantProducts()
      .then(res => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch(err => {
        console.log('---error---', err);
        Toast.show({
          text1: 'Request Failed',
          text2: 'Unable to get products',
          type: 'error',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [reload]);

  return (
    <>
      <AppHeader title="Point of Sale" />
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
        </View>

        <Text style={styles.categoryLabel}>Products</Text>

        <FlatList
          data={products}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          numColumns={3}
          ListEmptyComponent={() => (
            <EmptyScreenComponent title="No products found!" />
          )}
          contentContainerStyle={{flex: 1}}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <ProductCard
                name={item?.title}
                price={item?.price}
                onPress={() => navToProductDetail(item)}
                imageURI={item?.image}
              />
            );
          }}
        />

        <AppLoader isVisible={loading} />
      </View>
    </>
  );
};

export default POSMain;
