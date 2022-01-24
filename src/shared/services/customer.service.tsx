import axios from 'axios';
import defaultConfig from '../../../block.config';
import RNFetchBlob from 'rn-fetch-blob';

// export const saveCustomer = (params: any) => {
//   return axios.post(`${defaultConfig.API_URL}/customer/save`, params);
// };

export const saveCustomer = (params: any) => {
  return RNFetchBlob.fetch(
    'POST',
    `${defaultConfig.API_URL}/customer/save`,
    {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'multipart/form-data,octet-stream',
      // Accept: 'application/json',
      // 'Content-Type': 'application/json',
    },
    params,
  );
};

export const getCustomersByMerchant = (merchantId: any) => {
  return axios.get(
    `${defaultConfig.API_URL}/customer/getCustomersByMerchantId/${merchantId}`,
  );
};
