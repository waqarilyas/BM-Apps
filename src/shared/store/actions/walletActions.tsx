import {AppDispatch, RootState} from '..';
import {CoinBalancesResEntity, PublicInfoPayload} from '../../models/types';
import {AppShowToast} from '../../services/helper.service';
import {
  checkCoin,
  getAllCoinsBalances,
  getWallets,
  renderIsRenderedState,
  setCoinsPublicInfo,
} from '../../services/wallet.service';
import {setBalancesUpdateNeeded} from '../reducers/utilReducer';
import {
  setBep20Fee,
  setBTCFee,
  setCoinBalance,
  setCoinBalanceAndRates,
  setDogeFee,
  setERC20Fee,
  setWalletLoading,
  setWalletRefreshing,
} from '../reducers/walletReducer';
let bip39 = require('bip39');

export const renderWallet =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(setWalletLoading(true));
    dispatch(setBalancesUpdateNeeded(false));

    const {isNewWallet} = getState().util;

    try {
      const walletAssets = await getWallets();
      let publicInfoCollection: PublicInfoPayload[] = [];

      /* Wallet Generation */
      for (let index = 0; index < walletAssets.length; index++) {
        const asset = walletAssets[index];
        const publicInfo: PublicInfoPayload = await checkCoin(
          asset.coin_symbol,
          Number(asset.order_index),
          asset.coin_name,
          asset.is_erc20,
        );
        publicInfoCollection.push(publicInfo);
      }
      await renderIsRenderedState();

      /* Send Public Code Info */
      const res = await setCoinsPublicInfo(publicInfoCollection);
      for (let index = 0; index < walletAssets.length; index++) {
        const asset = walletAssets[index];
        const {balance, vs_currency_balance, chart_data, coinSymbol} =
          res.data?.find((c: any) => c.coinSymbol === asset.coin_symbol);
        if (coinSymbol === 'btc') {
          dispatch(setBTCFee(chart_data.networkFeeAvg));
        } else if (coinSymbol === 'bnb' || coinSymbol === 'bsc') {
          dispatch(setBep20Fee(chart_data.networkFeeMax));
        } else if (coinSymbol === 'eth') {
          dispatch(setERC20Fee(chart_data.networkFeeMax));
        } else if (coinSymbol === 'doge') {
          dispatch(setDogeFee(chart_data.networkFeeAvg));
        }
        dispatch(
          setCoinBalanceAndRates({
            index: asset.index,
            balance,
            vs_currency_balance,
            chart_data,
          }),
        );
      }
      dispatch(setWalletLoading(false));
      AppShowToast(
        isNewWallet ? 'Wallet Created Successfully!' : 'Wallet Imported',
      );
    } catch (error: any) {
      console.log('---error--', error);
      dispatch(setWalletLoading(false));
      if (error.response.message) {
        AppShowToast(error.response.message);
      } else {
        AppShowToast(
          'Service is down temporarily, Please try again in a while!',
        );
      }
      dispatch(setWalletLoading(false));
    }
  };

export const refreshCoinsBalances =
  (pullToRefresh: boolean = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    if (pullToRefresh) {
      dispatch(setWalletRefreshing(true));
    }

    const {defaultCurrency, wallet} = getState().wallet;
    let walletsInfo = wallet.map(w => {
      return {
        address: w.address,
        coinSymbol: w.coin_symbol,
      };
    });
    try {
      let balancesRes = await getAllCoinsBalances({
        currencyCode: defaultCurrency,
        walletsInfo,
      });
      balancesRes.data.forEach((b: CoinBalancesResEntity) => {
        let relevantWallet = wallet.find(w => w.coin_symbol === b.coinSymbol);
        dispatch(
          setCoinBalance({
            index: relevantWallet?.index,
            vs_currency_balance: b?.vs_currency_balance,
            balance: b?.balance,
          }),
        );
      });
      if (pullToRefresh) {
        dispatch(setWalletRefreshing(false));
      } else {
        console.log('Initial Balance Update');
        dispatch(setBalancesUpdateNeeded(false));
      }
      // dispatch(setWalletLoading(false));
    } catch (error) {
      console.log('Error refreshing balances:', error);
      dispatch(setWalletRefreshing(false));
      dispatch(setWalletLoading(false));
    }
  };
