import {AppDispatch, RootState} from '..';
import {PublicInfoPayload} from '../../models/types';
import {AppShowToast} from '../../services/helper.service';
import {
  checkCoin,
  getWallets,
  renderIsRenderedState,
  setCoinsPublicInfo,
} from '../../services/wallet.service';
import {
  setBep20Fee,
  setBTCFee,
  setCoinBalanceAndRates,
  setDogeFee,
  setERC20Fee,
  setWalletLoading,
} from '../reducers/walletReducer';
// import bip39 from 'bip39';
let bip39 = require('bip39');

export const renderWallet =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    // // dispatch(setWalletLoading(true));
    // const {defaultCurrency} = getState().wallet;
    // try {
    //   const activeAssets = await setActiveAssets();

    //   await activeAssets.map(async (asset: Coin, index: number) => {
    //     await checkCoin(
    //       asset.coin_symbol,
    //       Number(asset.order_index),
    //       asset.coin_name,
    //       asset.is_erc20,
    //     );
    //     await checkRate(asset.coin_symbol, defaultCurrency, index);
    //     await checkBalance(
    //       asset.coin_symbol,
    //       asset.is_erc20,
    //       defaultCurrency,
    //       index,
    //     );
    //     if (activeAssets.length - 1 === index) {
    //       dispatch(setWalletLoading(false));
    //     }
    //   });
    // } catch (error) {
    //   console.log('Error rendering wallet:', error);
    //   AppShowToast('Wallet sync failed');
    //   dispatch(setWalletLoading(false));
    // }
    dispatch(setWalletLoading(true));

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

      /* Semd Public Code Info */
      const res = await setCoinsPublicInfo(publicInfoCollection);

      for (let index = 0; index < walletAssets.length; index++) {
        const asset = walletAssets[index];
        const {balance, vs_currency_balance, chart_data, coinSymbol} =
          res.data.find((c: any) => c.coinSymbol === asset.coin_symbol);
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
      AppShowToast('Wallet Imported');
    } catch (error: any) {
      console.log('Render Wallet Error:', error);
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
