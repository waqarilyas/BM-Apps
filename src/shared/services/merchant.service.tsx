import axios from 'axios';
import {Alert} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import defaultConfig from '../../../block.config';
import {store} from '../store';
import {
  setMerchantData,
  setMerchantEnabledState,
  setMerchantShop,
} from '../store/reducers/userReducer';
import {setMerchantChecked} from '../store/reducers/utilReducer';
import {setWalletAddress} from '../store/reducers/walletReducer';
import L from '../utils/LanguageHandler';
import {navToMerchant} from './nav.service';

export const createNewMerchant = (params: any) => {
  return axios.post(`${defaultConfig.API_URL}/Merchant/save`, params);
};

export const createNewShop = (params: any) => {
  return axios.post(`${defaultConfig.API_URL}/shop/save`, params);
};

export const getMerchantShops = async () => {
  const {merchantData} = store.getState().user;

  await axios
    .get(`${defaultConfig.API_URL}/shop/getByMerchant/${merchantData._id}`)
    .then(res => {
      store.dispatch(setMerchantShop(res.data));
    });
};

export const createNewProduct = (params: any) => {
  return RNFetchBlob.fetch(
    'POST',
    `${defaultConfig.API_URL}/product/save`,
    {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'multipart/form-data,octet-stream',
      // Accept: 'application/json',
      // 'Content-Type': 'application/json',
    },
    params,
  );
};

export const getInitialMerchantData = async () => {
  const {isMerchantChecked} = store.getState().util;
  try {
    const {wallet} = store.getState().wallet;

    let walletAddress = '';

    wallet.forEach(item => {
      if (item.coin_symbol == 'eth') {
        walletAddress = item.address;
        store.dispatch(setWalletAddress(walletAddress));
      }
    });

    const res = await axios.get(
      `${defaultConfig.API_URL}/merchant/currentMerchant?walletAddress=${walletAddress}`,
    );

    if (res.data) {
      store.dispatch(setMerchantData(res.data));
      store.dispatch(setMerchantEnabledState(true));
      // store.dispatch(setMerchantEnabledFromDB(true));
      const shopData = await axios.get(
        `${defaultConfig.API_URL}/shop/getByMerchant/${res.data._id}`,
      );

      store.dispatch(setMerchantChecked(true));

      store.dispatch(setMerchantShop(shopData.data));
    }
  } catch (err) {
    // console.log('--error from get initial merchant data---', err);
    // if (!isMerchantChecked) {
    //   Alert.alert(
    //     L('Confirm'),
    //     L('Your merchant account has not been enabled! Enable now?'),
    //     [
    //       {text: 'OK', onPress: () => navToMerchant()},
    //       {text: 'cancel', onPress: () => console.log('OK Pressed')},
    //     ],
    //   );
    //   store.dispatch(setMerchantChecked(true));
    // }
  }
};

export const getMerchantProducts = async () => {
  const {merchantData} = store.getState().user;
  return axios.get(
    `${defaultConfig.API_URL}/product/getByMerchant/${merchantData._id}`,
  );
};

export const getAllShops = async () => {
  return axios.get(`${defaultConfig.API_URL}/shop/getAllShops`);
};

export const getShopProducts = async (shopId: string) => {
  return axios.get(`${defaultConfig.API_URL}/product/getByShop/${shopId}`);
};
export const deleteProduct = async (productId: string) => {
  return axios.delete(
    `${defaultConfig.API_URL}/product/delete-product/${productId}`,
  );
};

export const getMerchantAPFee = async () => {
  return axios.get(`${defaultConfig.API_URL}/admin/merchant-settings`);
};
