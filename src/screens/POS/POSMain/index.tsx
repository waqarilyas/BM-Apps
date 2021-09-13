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
import Icon from 'react-native-vector-icons/Ionicons';
import IC from 'react-native-vector-icons/FontAwesome5';
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
  const {merchantShop} = useSelector((state: RootState) => state.user);

  const wait = (timeout: any) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = () => {
    setRefreshing(true);
    setLoading(true);
    getMerchantProducts()
      .then(res => {
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

  const updateResult = (query: string) => {
    setSearchText(query);
    let results: any = [];
    products.map((algo: string) => {
      query.split(' ').map(word => {
        if (algo.title.toLowerCase().indexOf(word.toLowerCase()) != -1) {
          results.push(algo);
        }
      });
    });
    setSearchResults(results);
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      setReload(!reload);
    });

    return unsubscribe;
  }, [props.navigation]);

  useEffect(() => {
    setLoading(true);

    getMerchantProducts()
      .then(res => {
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
    <View style={styles.mainContainer}>
      {searchVisible ? (
        <View style={styles.searchContainer}>
          <SearchBar
            placeholder="Search here"
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
          title="Point of Sale"
          showSearch
          searchAction={() => setSearchVisible(true)}
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
            <Text style={styles.actionText}>Add Product</Text>
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

            <Text style={styles.actionText}>Direct Invoice</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.categoryLabel}>Products</Text>

        <FlatList
          data={searchText.length > 0 ? searchResults : products}
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
    </View>
  );
};

export default POSMain;
