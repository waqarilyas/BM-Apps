import axios from 'axios';
import blockConfig from '../../../block.config';
import {store} from '../store';
import {
  setMerchantData,
  setMerchantEnabledState,
  setMerchantShop,
  setMerchantShops,
} from '../store/reducers/userReducer';
import RNFetchBlob from 'rn-fetch-blob';
import {setWalletAddress} from '../store/reducers/walletReducer';

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
      store.dispatch(setMerchantShops(res.data));
    });
};

export const createNewProduct = (params: any) => {
  return RNFetchBlob.fetch(
    'POST',
    `${blockConfig.API_URL}/product/save`,
    {
      // Authorization: 'Bearer ' + authToken,
      'Content-Type': 'multipart/form-data,octet-stream',
    },
    params,
  );
};

export const getInitialMerchantData = async () => {
  const {wallet} = store.getState().wallet;
  let walletAddress = '';

  wallet.forEach(item => {
    if (item.coin_symbol == 'btc') {
      walletAddress = item.public_key;
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

    console.log('--shop data--', shopData);
    store.dispatch(setMerchantShop(shopData.data));
  }
};
