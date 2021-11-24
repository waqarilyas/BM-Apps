import WAValidator from 'multicoin-address-validator';
import React, {useMemo, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AddressInput from '../../../shared/components/AddressInput';
import AppHeader from '../../../shared/components/AppHeader';
import AppInput from '../../../shared/components/AppInput';
import ConfidentialText from '../../../shared/components/ConfidentialText';
import PaymentStatusModal from '../../../shared/components/PaymentStatusModal';
import PrimaryButton from '../../../shared/components/PrimaryButton';
import {Coin, GenericNavigation} from '../../../shared/models/types';
import {
  AppShowToast,
  checkIfCoin,
  getFixedAmount,
} from '../../../shared/services/helper.service';
import {handleTx} from '../../../shared/services/wallet.service';
import {RootState} from '../../../shared/store';
import {refreshCoinsBalances} from '../../../shared/store/actions/walletActions';
import {THEME} from '../../../shared/theme';
import {HP} from '../../../shared/theme/responsive';
import {
  blockchainsEnum,
  currenciesEnum,
} from '../../../shared/utils/AppConstants';
import L from '../../../shared/utils/LanguageHandler';
import styles from './styles';

interface Props extends GenericNavigation {}

const SendCoin = (props: Props) => {
  const {wallet, defaultCurrency, showBalances} = useSelector(
    (state: RootState) => state.wallet,
  );
  const {wallet: walletState} = useSelector((state: RootState) => state);

  const [address, setAddress] = useState(
    __DEV__ ? '0xD66020dFcB99e6CCC88c0715da81f8dF9358C601' : '',
  );
  const [usdtAmount, setUsdtAmount] = useState('');
  const [coinAmount, setCoinAmount] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentError, setPaymentError] = useState(false);
  const dispatch = useDispatch();

  const onChangeAddress = (text: string) => setAddress(text);
  const toggleModal = () => {
    setShowModal(!showModal);
    if (!paymentError) {
      setAddress('');
      setCoinAmount('');
      setUsdtAmount('');
      props.navigation?.goBack();
    }
  };

  const convertToFiatString = (amount: string | number) => {
    let fiatAmount: any = Number(amount) * Number(coin?.chart_data.rate);
    fiatAmount = fiatAmount.toFixed(fiatAmount > 10 ? 2 : 6);
    return `${currenciesEnum[defaultCurrency]} ${fiatAmount} ${defaultCurrency}`;
  };

  const onChangeCoinAmount = (text: string) => {
    setCoinAmount(String(text)); // COIN AMOUNT STATE
    let newFiatAmount = Number(text) * Number(coin?.chart_data.rate);
    setUsdtAmount(newFiatAmount.toFixed(newFiatAmount > 10 ? 2 : 6));
  };

  const onChangeUsdtAmount = (text: string) => {
    setUsdtAmount(text);
    let newCoinAmount = Number(text) / Number(coin?.chart_data.rate);
    setCoinAmount(getFixedAmount(newCoinAmount));
  };

  const onPressMax = () => {
    setCoinAmount(coin?.balance!);
    setUsdtAmount(coin?.vs_currency_balance!);
  };

  // const networkFee = useMemo(() => {
  //   let ETH = wallet.find((c: Coin) => c.coin_name === 'Ethereum');
  //   if (coin?.coin_symbol === 'eth') {
  //     return coin?.chart_data?.networkFeeMin;
  //   } else if (coin?.coin_symbol !== 'eth' && coin?.blockchain === 'ethereum') {
  //     return (
  //       (Number(ETH?.chart_data.networkFeeMin) * Number(ETH?.chart_data.rate)) /
  //       Number(coin.chart_data.rate)
  //     );
  //     //convert network fee to desire count amount
  //   } else {
  //     return coin?.chart_data.networkFeeMin;
  //   }
  // }, [wallet, coin]);

  const [coin, nativeCoin] = useMemo(() => {
    const c = wallet.find(
      (c: Coin) => c.coin_symbol === props.route?.params?.coinSymbol,
    );
    const isC = checkIfCoin(c!, wallet);
    return [c, isC];
  }, [wallet, props.route]);

  const networkFee = useMemo(() => {
    if (nativeCoin?.coin.blockchain === blockchainsEnum.ETHEREUM)
      return Number(walletState.erc20_fee) * 1.05;
    else if (nativeCoin?.coin.blockchain === blockchainsEnum.BINANCE)
      return Number(walletState.bep20_fee) * 2;
    else if (nativeCoin?.coin.blockchain === blockchainsEnum.BITCOIN)
      return Number(walletState.btc_fee) * 1.05;
    else if (nativeCoin?.coin.blockchain === blockchainsEnum.DOGECOIN)
      return Number(walletState.doge_fee) * 1.05;
  }, [wallet, coin, nativeCoin]);

  const [totalFiat, totalAmount] = useMemo(() => {
    let t_fiat: any = Number(usdtAmount);

    let t_coin: any =
      Number(coinAmount) + Number(networkFee) + Number(coin?.processingFee);

    if (!coinAmount || Number(coinAmount) <= 0) {
      t_coin = '0.000000';
    }
    if (!usdtAmount || Number(usdtAmount) <= 0) {
      t_fiat = '0.000000';
    }
    t_fiat = convertToFiatString(t_coin);
    return [t_fiat, Number(t_coin).toFixed(6)];
  }, [usdtAmount, coinAmount, coin]);

  const onSend = async () => {
    try {
      if (coin?.coin_symbol === 'weenus') {
        let valid = WAValidator.validate(address, 'eth');
      }

      if (usdtAmount) {
        if (isNaN(Number(usdtAmount))) {
          return AppShowToast(L('Amount must be a number'));
        }
      }
      if (Number(coinAmount) <= 0) {
        return AppShowToast(L('Please enter a valid amount'));
      }

      if (!coinAmount) {
        return AppShowToast(L('Please enter coin amount'));
      }

      if (Number(totalAmount) > Number(coin?.balance)) {
        return AppShowToast(L('Insufficient funds'));
      }

      if (Number(usdtAmount) > Number(coin?.vs_currency_balance)) {
        return AppShowToast(L('Insufficient funds'));
      }

      if (!usdtAmount) {
        return AppShowToast(`Please enter ${defaultCurrency} amount`);
      }

      setLoading(true);
      const payload = {
        to: address,
        amount: coinAmount,
        from: coin?.address,
        symbol: coin?.coin_symbol,
        private_key: coin?.private_key,
        public_key: coin?.public_key,
        is_erc20: coin?.is_erc20,
        processingFee: coin?.processingFee,
        contractAbi: coin?.contractAbi,
        contractAddress: coin?.contractAddress,
        feeReceivingAccount: coin?.feeReceivingAccount,
        is_bep20: coin?.is_bep20,
      };

      const transactionRes = await handleTx(payload);
      console.log('---transaction response---', transactionRes);
      dispatch(refreshCoinsBalances(true));
      setLoading(false);
      setShowModal(true);
      setPaymentError(false);
    } catch (error) {
      console.log('---error from payment---', error);
      setLoading(false);
      setPaymentError(error ? true : false);
      setShowModal(true);
      console.log('Error Sending Coin.', error);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <PaymentStatusModal
        toggleModal={toggleModal}
        error={paymentError}
        isVisible={showModal}
      />
      <AppHeader title={L('Wallet')} showBack />
      <View style={styles.container}>
        <AddressInput
          inputStyle={{
            borderRadius: THEME.RADIUS.SMALLBOX,
            marginVertical: THEME.MARGIN.NORMAL,
            backgroundColor: THEME.COLORS.darkGrey,
          }}
          value={address}
          placeholder={L('Address')}
          onChangeText={setAddress}
          onChangeAddress={onChangeAddress}
        />
        <View style={styles.labelContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.max}
            onPress={onPressMax}>
            <Text style={styles.maxText}>{L('Max')}</Text>
          </TouchableOpacity>
        </View>
        <AppInput
          inputStyle={{
            marginTop: THEME.MARGIN.NORMAL,
            backgroundColor: THEME.COLORS.darkGrey,
          }}
          value={coinAmount}
          keyboardType="numeric"
          onChangeText={onChangeCoinAmount}
          returnKeyType="done"
          placeholder={`${L(
            'Enter amount in',
          )} ${coin?.coin_symbol.toUpperCase()}`}
        />
        <AppInput
          inputStyle={{
            marginTop: THEME.MARGIN.NORMAL,
            backgroundColor: THEME.COLORS.darkGrey,
          }}
          value={usdtAmount}
          keyboardType="numeric"
          returnKeyType="done"
          onChangeText={onChangeUsdtAmount}
          placeholder={`${L('Enter amount in')} ${defaultCurrency}`}
        />

        <View style={styles.sideInfo}>
          <Text style={[styles.availBalalnce, {color: THEME.COLORS.white}]}>
            {L('Fee')}:{' '}
            {showBalances ? (
              getFixedAmount(Number(coin?.chart_data.networkFeeMin) * 2) ||
              '0.00'
            ) : (
              <ConfidentialText />
            )}{' '}
            {coin?.coin_symbol.toUpperCase()}
          </Text>
          <Text style={[styles.availBalalnce, {color: THEME.COLORS.white}]}>
            {L('You Will Get')}:{' '}
            {showBalances ? coin?.balance || '0.00' : <ConfidentialText />}{' '}
            {coin?.coin_symbol.toUpperCase()}
          </Text>
        </View>

        <View style={styles.details}>
          {/* <Text style={styles.detailsText}>
            {L('Transaction Fee')} :{' '}
            {getFixedAmount(Number(coin?.chart_data.networkFeeMin))}{' '}
            {coin?.coin_symbol.toUpperCase()}
            <Text style={styles.usdText}>
              {'     '}
              {convertToFiatString(Number(coin?.chart_data.networkFeeMin))}
            </Text>
          </Text>

          <Text style={styles.availableText}>
            {'    '}
            {L('Total Amount')} :{' '}
            {totalAmount ? Number(totalAmount)?.toFixed(6) : 0}{' '}
            {coin?.coin_symbol.toUpperCase()}
            <Text style={styles.usdText}>
              {'     '}
              {totalFiat}
            </Text>
          </Text> */}
        </View>

        <PrimaryButton
          loading={loading}
          title={L('Send')}
          buttonStyle={{width: '100%', height: HP(6)}}
          textStyle={{fontFamily: THEME.FONTS.TYPE.MEDIUM}}
          onPress={onSend}
        />
      </View>
    </View>
  );
};

export default SendCoin;
