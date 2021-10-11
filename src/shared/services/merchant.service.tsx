import axios from 'axios';
import blockConfig from '../../../block.config';
import {store} from '../store';
import {
  setMerchantData,
  setMerchantEnabledState,
  setMerchantShop,
} from '../store/reducers/userReducer';
import RNFetchBlob from 'rn-fetch-blob';
import {setWalletAddress} from '../store/reducers/walletReducer';
import Toast from 'react-native-toast-message';

export const createNewMerchant = (params: any) => {
  return axios.post(`${blockConfig.API_URL}/Merchant/save`, params);
};

export const createNewShop = (params: any) => {
  return axios.post(`${blockConfig.API_URL}/shop/save`, params);
};

export const getMerchantShops = async () => {
  const {merchantData} = store.getState().user;

  await axios
    .get(`${blockConfig.API_URL}/shop/getByMerchant/${merchantData._id}`)
    .then(res => {
      store.dispatch(setMerchantShop(res.data));
    });
};

export const createNewProduct = (params: any) => {
  return RNFetchBlob.fetch(
    'POST',
    `${blockConfig.API_URL}/product/save`,
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
  try {
    const {wallet} = store.getState().wallet;

    let walletAddress = '';

    wallet.forEach(item => {
      if (item.coin_symbol == 'btc') {
        walletAddress = item.address;
        store.dispatch(setWalletAddress(walletAddress));
      }
    });

    const res = await axios.get(
      `${blockConfig.API_URL}/merchant/currentMerchant?walletAddress=${walletAddress}`,
    );

    if (res.data) {
      store.dispatch(setMerchantData(res.data));
      store.dispatch(setMerchantEnabledState(true));
      const shopData = await axios.get(
        `${blockConfig.API_URL}/shop/getByMerchant/${res.data._id}`,
      );

      store.dispatch(setMerchantShop(shopData.data));
    }
  } catch (err) {
    console.log('--error from get initial merchant data---', err);
  }
};

export const getMerchantProducts = async () => {
  const {merchantData} = store.getState().user;
  return axios.get(
    `${blockConfig.API_URL}/product/getByMerchant/${merchantData._id}`,
  );
};

export const getAllShops = async () => {
  return axios.get(`${blockConfig.API_URL}/shop/getAllShops`);
};

export const getShopProducts = async (shopId: string) => {
  return axios.get(`${blockConfig.API_URL}/product/getByShop/${shopId}`);
};
