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

export const saveCustomer = (params: any) => {
  return axios.post(`${defaultConfig.API_URL}/customer/save`, params);
};
