import axios from 'axios';
import defaultConfig from '../../../block.config';
import RNFetchBlob from 'rn-fetch-blob';

export const saveCustomer = (params: any) => {
  return RNFetchBlob.fetch(
    'POST',
    `${defaultConfig.API_URL}/customer/save`,
    {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'multipart/form-data,octet-stream',
    },
    params,
  );
};

export const getCustomersByMerchant = (merchantId: any) => {
  return axios.get(
    `${defaultConfig.API_URL}/customer/getCustomersByMerchantId/${merchantId}`,
  );
};

export const sendReceipt = async (params: any) => {
  return axios.post(`${defaultConfig.API_URL}/customer/sendReceipt`, params);
};

export const sendReceiptViaEmail = async (params: any) => {
  return axios.post(
    `${defaultConfig.API_URL}/customer/send-email-receipt`,
    params,
  );
};

export const downloadExcelFile = async (merchantId: any) => {
  return RNFetchBlob.fetch(
    'POST',
    `${defaultConfig.API_URL}/customer/export/${merchantId}`,
  );
};
