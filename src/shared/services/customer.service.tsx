import axios from 'axios';
import defaultConfig from '../../../block.config';

export const saveCustomer = (params: any) => {
  return axios.post(`${defaultConfig.API_URL}/customer/save`, params);
};

export const getCustomersByMerchant = (merchantId: any) => {
  return axios.get(
    `${defaultConfig.API_URL}/customer/getCustomersByMerchantId/${merchantId}`,
  );
};
