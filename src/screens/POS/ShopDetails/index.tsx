import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl, View} from 'react-native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import AppHeader from '../../../shared/components/AppHeader';
import AppLoader from '../../../shared/components/AppLoader';
import EmptyScreenComponent from '../../../shared/components/EmptyScreenComponent';
import ProductCard from '../../../shared/components/ProductCard';
import SearchBar from '../../../shared/components/SearchBar';
import {GenericNavigation} from '../../../shared/models/types';
import {getShopProducts} from '../../../shared/services/merchant.service';
import {RootState} from '../../../shared/store';
import {THEME} from '../../../shared/theme';
import {RF} from '../../../shared/theme/responsive';
import L from '../../../shared/utils/LanguageHandler';
import styles from './style';

interface Props extends GenericNavigation {}

const ShopDetails = (props: Props) => {
  const {shop}: any = props.route?.params;

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [products, setProducts]: any = useState([]);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults]: any = useState([]);

  const wait = (timeout: any) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
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
    getShopProducts(shop)
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

  useEffect(() => {
    getProducts();
  }, []);

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
          title={L('Products')}
          showSearch
          searchAction={() => setSearchVisible(true)}
          showBack
        />
      )}
      <View style={styles.container}>
        {/* <View style={styles.topActions}>
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

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.topAction}
            onPress={() =>
              props.navigation?.navigate('Payment', {type: 'invoice'})
            }>
            <IC
              name="file-invoice"
              color={THEME.COLORS.accentBlue}
              size={RF(18)}
            />

            <Text style={styles.actionText}>{L('Direct Invoice')}</Text>
          </TouchableOpacity>
        </View> */}

        {/* <Text style={styles.categoryLabel}>{L('Products')}</Text> */}

        <FlatList
          data={searchText.length > 0 ? searchResults : products}
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
                onPress={() => null}
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

export default ShopDetails;
