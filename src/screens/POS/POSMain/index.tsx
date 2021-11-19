import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Toast from 'react-native-toast-message';
import IC from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {ICONS} from '../../../assets';
import AppHeader from '../../../shared/components/AppHeader';
import AppLoader from '../../../shared/components/AppLoader';
import EmptyScreenComponent from '../../../shared/components/EmptyScreenComponent';
import ProductCard from '../../../shared/components/ProductCard';
import SearchBar from '../../../shared/components/SearchBar';
import {GenericNavigation} from '../../../shared/models/types';
import {getMerchantProducts} from '../../../shared/services/merchant.service';
import {RootState} from '../../../shared/store';
import {THEME} from '../../../shared/theme';
import {RF} from '../../../shared/theme/responsive';
import L from '../../../shared/utils/LanguageHandler';
import styles from './style';

interface Props extends GenericNavigation {}

const POSMain = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [products, setProducts]: any = useState([]);
  const [reload, setReload] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults]: any = useState([]);
  const {merchantShop, merchantData} = useSelector(
    (state: RootState) => state.user,
  );

  const wait = (timeout: any) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const navToDirectInvoice = () => {
    if (merchantData?.isDisabled) {
      Alert.alert(
        L('Failed'),
        L(
          'Your account has been disabled by admin! You cannot add direct invoice!',
        ),
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      );

      return;
    }
    props.navigation?.navigate('Payment', {type: 'invoice'});
  };

  const navToAddProduct = () => {
    if (merchantData?.isDisabled) {
      Alert.alert(
        L('Failed'),
        L('Your account has been disabled by admin! You cannot add products!'),
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      );

      return;
    }

    if (!merchantShop) {
      Alert.alert(L('Failed'), L('Please add a shop to continue'), [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);

      return;
    }
    setSearchVisible(false);
    setSearchText('');
    setSearchResults([]);
    props.navigation?.navigate('AddProduct');
  };

  const navToProductDetail = (item: any) => {
    props.navigation?.navigate('ProductDetails', {data: item});
  };

  const updateResult = (e: string) => {
    setSearchText(e);

    let text = e.toLowerCase();
    let trucks = [...products];
    let filteredItems = trucks.filter(item => {
      return item.title.toLowerCase().match(text);
    });
    setSearchResults(filteredItems);
  };

  const getProducts = () => {
    getMerchantProducts()
      .then(res => {
        setProducts(
          res.data?.sort(function (a: any, b: any) {
            return new Date(b.createdAt) - new Date(a.createdAt);
          }),
        );
      })
      .catch(err => {
        Toast.show({
          text1: L('Request Failed'),
          text2: L('Unable to get products'),
          type: 'error',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onRefresh = () => {
    setRefreshing(true);
    getProducts();
    wait(2000).then(() => setRefreshing(false));
  };

  useEffect(() => {
    setLoading(true);
    getProducts();
  }, []);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getProducts();
    });

    return unsubscribe;
  }, [props.navigation]);
  return (
    <View style={styles.mainContainer}>
      {searchVisible ? (
        <View style={styles.searchContainer}>
          <SearchBar
            placeholder={L('Search')}
            onChangeText={updateResult}
            value={searchText}
          />
          <Icon
            onPress={() => {
              setSearchVisible(false);
              setSearchText('');
              setSearchResults([]);
            }}
            name="close"
            size={RF(25)}
            color={THEME.COLORS.white}
            style={styles.closeIcon}
          />
        </View>
      ) : (
        <AppHeader
          title={L('Point of Sale')}
          showSearch
          searchAction={() => setSearchVisible(true)}
          showBack
        />
      )}
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
            <Text style={styles.actionText}>{L('Add Product')}</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            activeOpacity={0.8}
            style={styles.topAction}
            onPress={navToDirectInvoice}>
            <IC
              name="file-invoice"
              color={THEME.COLORS.accentBlue}
              size={RF(18)}
            />

            <Text style={styles.actionText}>{L('Direct Invoice')}</Text>
          </TouchableOpacity> */}
        </View>

        <Text style={styles.categoryLabel}>{L('Products')}</Text>

        <FlatList
          data={searchText.length > 0 ? searchResults : products}
          refreshControl={
            <RefreshControl
              tintColor={THEME.COLORS.accentBlue}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          numColumns={3}
          columnWrapperStyle={{
            // backgroundColor: 'red',
            flexWrap: 'wrap-reverse',
          }}
          contentContainerStyle={
            products.length == 0 && {
              flex: 1,
            }
          }
          keyboardShouldPersistTaps="always"
          ListEmptyComponent={() => (
            <EmptyScreenComponent title={L('No products found!')} />
          )}
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
    </View>
  );
};

export default POSMain;
