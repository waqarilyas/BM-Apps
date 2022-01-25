import axios from 'axios';
import defaultConfig from '../../../block.config';

export const saveForwardAddress = async (params: any) => {
  return axios.post(
    `${defaultConfig.API_URL}/forward-address-book/create-address`,
    params,
  );
};

export const getForwardAddresBook = async (userId: string) => {
  return axios.get(
    `${defaultConfig.API_URL}/forward-address-book/get-address-book/${userId}`,
  );
};
