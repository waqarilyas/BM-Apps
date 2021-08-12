import axios from 'axios';
import {store} from '../store';
const BMAxios = axios.create();

BMAxios.interceptors.request.use(config => {
  const {token} = store.getState().user;
  if (token) {
    config.headers.Authorization = 'Bearer ' + token;
  }
  config.headers['Content-Type'] = 'application/json';
  return config;
});

export default BMAxios;
