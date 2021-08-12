import {AppDispatch, RootState} from '..';
import {
  generateMnemonic,
  setActiveAssets,
  setAgeOfPortfolio,
  renderIsRenderedState,
  checkCoin,
  checkRate,
  checkBalance,
} from '../../services/wallet.service';
import {Coin} from '../../models/types';
import {setWalletLoading} from '../reducers/walletReducer';
import {AppShowToast} from '../../services/helper.service';

export const renderWallet =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(setWalletLoading(true));
    const {defaultCurrency} = getState().wallet;
    try {
      const mnemonic = await generateMnemonic();
      const activeAssets = await setActiveAssets();
      const portfolioAge = await setAgeOfPortfolio();
      const rendered = await renderIsRenderedState();

      await activeAssets.map(async (asset: Coin, index: number) => {
        await checkCoin(
          asset.coin_symbol,
          Number(asset.order_index),
          asset.coin_name,
          asset.is_erc20,
        );
        await checkRate(asset.coin_symbol, defaultCurrency, index);
        await checkBalance(
          asset.coin_symbol,
          asset.is_erc20,
          defaultCurrency,
          index,
        );
        if (activeAssets.length - 1 === index) {
          dispatch(setWalletLoading(false));
        }
      });
    } catch (error) {
      console.log('Error rendering wallet:', error);
      AppShowToast('Wallet sync failed');
      dispatch(setWalletLoading(false));
    }
  };
