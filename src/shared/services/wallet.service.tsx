import axios from 'axios';
import blockConfig from '../../../block.config';
import {Coin, GenerateWalletParams, Mnemonic} from '../models/types';
import {store} from '../store';
import {
  setCoin,
  setCoinBalance,
  setCoinRate,
  setDefaultCurrency,
  setIsWalletRendered,
  setMnemonic,
  setPortfolioAge,
  setWallet,
} from '../store/reducers/walletReducer';

export const generateMnemonic = async () => {
  try {
    const {mnemonic} = store.getState().wallet;
    if (!mnemonic.mnemonic_phrase) {
      const response = await axios.get(
        `${blockConfig.API_URL}/wallet/new/mnemonic`,
      );
      let fetchedMnemonic = {mnemonic_phrase: response.data, is_restore: false};
      store.dispatch(setMnemonic(fetchedMnemonic));
      return response.data;
    } else {
      return mnemonic.mnemonic_phrase;
    }
  } catch (error) {
    console.log('Error generating Mnemonic:', error);
    throw error;
  }
};

export const getCoinsList = () => {
  return axios.get(`${blockConfig.API_URL}/coin-rates/list/coins`);
};

export const setActiveAssets = async () => {
  const {wallet} = store.getState().wallet;
  try {
    const coinList = await getCoinsList();
    if (wallet.length < coinList.data.length) {
      const sortedCoinList = await coinList.data.sort((a: any, b: any) =>
        a.orderIndex > b.orderIndex ? 1 : -1,
      );
      const coinListForWalletGeneration = await sortedCoinList.map(
        (coin: any) => {
          return {
            coin_symbol: coin.coinSymbol,
            coin_name: coin.name,
            order_index: coin.orderIndex,
            is_active: true,
            is_erc20: coin.isErc20 ? 1 : 0,
            balance: 0,
            coin_color: coin.coinColor,
          };
        },
      );
      store.dispatch(setWallet(coinListForWalletGeneration));
      return coinListForWalletGeneration;
    } else {
      return wallet;
    }
  } catch (error) {
    console.log('Error render active assets:', error);
  }
};

export const setAgeOfPortfolio = async () => {
  const {defaultCurrency} = store.getState().wallet;
  if (!defaultCurrency) {
    store.dispatch(setPortfolioAge(Date.now()));
    return defaultCurrency;
  } else {
    return defaultCurrency;
  }
};

export const renderIsRenderedState = () => {
  const {isRendered} = store.getState().wallet;
  if (!isRendered) {
    store.dispatch(setIsWalletRendered(true));
    return isRendered;
  } else {
    return isRendered;
  }
};

export const checkCoin = async (
  coinSymbol: string,
  _order_index: number,
  _name: string,
  _is_erc20: boolean,
) => {
  try {
    const {wallet, mnemonic} = store.getState().wallet;
    const {dispatch} = store;

    const isCoin = wallet.filter((c: Coin) => c.coin_symbol === coinSymbol);
    const coinIndex = wallet.findIndex(
      (c: Coin) => c.coin_symbol === coinSymbol,
    );

    if (mnemonic.is_restore) {
      console.log('RESTORING WALLLET---->');
      dispatch(setPortfolioAge(new Date()));
      const coinData = await generateWallet({
        coinSymbol: coinSymbol,
        recovery: mnemonic.is_restore,
        mnemonics: mnemonic.mnemonic_phrase,
      });

      let myCoinData = {
        ...isCoin[0],
        public_key: coinData._publicKey,
        private_key: coinData._privateKey,
        address: coinData.address,
        wif: coinData.wif || '',
        seed: coinData.seed || '',
        hd_path: coinData.path || '',
        coin_symbol: coinSymbol,
        order_index: _order_index,
        coin_name: _name,
        is_erc20: coinData.isErc20 || false,
        confirmed_balance: coinData.confirmed_balance || '',
        unconfirmed_balance: coinData.unconfirmed_balance || '',
        chart_data: [],
        vs_currency_balance: '',
        tx_history: [],
      };
      dispatch(setCoin({index: coinIndex, coinData: myCoinData}));
      dispatch(setMnemonic({mnemonic_phrase: mnemonic, is_restore: false}));
    }

    if (isCoin.length > 0 && isCoin[0].private_key) {
    } else {
      dispatch(setPortfolioAge(new Date()));
      const coinData = await generateWallet({
        coinSymbol: coinSymbol,
        recovery: mnemonic.is_restore,
        mnemonics: mnemonic.mnemonic_phrase,
      });
      let myCoinData = {
        ...isCoin[0],
        public_key: coinData._publicKey,
        private_key: coinData._privateKey,
        address: coinData.address,
        wif: coinData.wif || '',
        seed: coinData.seed || '',
        hd_path: coinData.path || '',
        coin_symbol: coinSymbol,
        order_index: _order_index,
        coin_name: _name,
        is_erc20: coinData.isErc20 || false,
        confirmed_balance: coinData.confirmed_balance || '',
        unconfirmed_balance: coinData.unconfirmed_balance || '',
        chart_data: [],
        vs_currency_balance: '',
        tx_history: [],
      };
      dispatch(setCoin({index: coinIndex, coinData: myCoinData}));
    }
  } catch (e) {
    throw e;
  }
};

export const generateWallet = async ({
  coinSymbol,
  recovery,
  mnemonics,
}: GenerateWalletParams) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${blockConfig.API_URL}/wallet/new`,
      data: {
        coinSymbol,
        mnemonics,
        recovery,
      },
    });
    return response.data;
  } catch (e) {
    console.log('Error generating wallet:', e);
    throw e;
  }
};

export const checkRate = async (
  coin: string,
  currency: string,
  index: number,
) => {
  try {
    const response = await axios.get(
      `${blockConfig.API_URL}/coin-rates/${coin}?vs_currency=${currency}`,
    );
    store.dispatch(setCoinRate({index, chartData: response.data}));
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const checkTransactions = async (coinSymbol: any, coinAddress: any) => {
  return axios
    .get(`${blockConfig.API_URL}/transaction/${coinAddress}/${coinSymbol}/txs`)
    .then(res => res.data);
};

export const checkBalance = async (
  coinSymbol: any,
  _is_erc20: boolean,
  currency: any,
  index: number,
) => {
  const coinData = store
    .getState()
    .wallet.wallet.filter(c => c.coin_symbol === coinSymbol)[0];
  await axios
    .get(
      `${blockConfig.API_URL}/wallet/balance/${coinSymbol}/${coinData.address}?vs_currency=${currency}`,
    )
    .then(async res => {
      store.dispatch(
        setCoinBalance({
          index,
          balance: res.data.balance?.toFixed(4),
          vs_currency_balance: res.data.vs_currency_balance?.toFixed(2),
        }),
      );
    })
    .catch(err => {
      console.log(`Check balance error for ${coinSymbol}:`, err);
    });
};

export const restoreWalletWithPhrase = async (recovery: any) => {
  try {
    const isValidated = await validateMnemonic(recovery);
    console.log('isValidated from restoreWalletWithPhrase', isValidated);
    let fetchedMnemonic = {mnemonic_phrase: recovery, is_restore: true};
    if (isValidated) {
      store.dispatch(setMnemonic(fetchedMnemonic));
      return isValidated;
    } else {
      return isValidated;
    }
  } catch (e) {
    console.log('Error restoring wallet:', e);
    throw e;
  }
};

export const validateMnemonic = async (recovery: string) => {
  const isValidated = await axios({
    method: 'post',
    url: `${blockConfig.API_URL}/wallet/validate/mnemonic`,
    data: {
      mnemonic: recovery,
    },
  });
  return isValidated.data;
};
