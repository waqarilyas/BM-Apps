import React, {useMemo, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import AddressInput from '../../../shared/components/AddressInput';
import AppHeader from '../../../shared/components/AppHeader';
import AppInput from '../../../shared/components/AppInput';
import PrimaryButton from '../../../shared/components/PrimaryButton';
import {THEME} from '../../../shared/theme';
import {HP} from '../../../shared/theme/responsive';
import styles from './styles';
import PaymentStatusModal from '../../../shared/components/PaymentStatusModal';
import GLOBAL_STYLE from '../../../shared/theme/global';
import {RootState} from '../../../shared/store';
import {useSelector} from 'react-redux';
import {Coin, GenericNavigation} from '../../../shared/models/types';
import {currenciesEnum} from '../../../shared/utils/AppConstants';
import {
  AppShowToast,
  getFixedAmount,
  getPairPrice,
} from '../../../shared/services/helper.service';
import {handleTx} from '../../../shared/services/wallet.service';
import WAValidator from 'multicoin-address-validator';

interface Props extends GenericNavigation {}

const SendCoin = (props: Props) => {
  const {wallet, defaultCurrency} = useSelector(
    (state: RootState) => state.wallet,
  );
  const [address, setAddress] = useState(
    __DEV__ ? '0x848A11486d4DA33e7270412FdEcb3D597A5A5357' : '',
  );
  const [usdtAmount, setUsdtAmount] = useState('');
  const [coinAmount, setCoinAmount] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentError, setPaymentError] = useState(false);

  const [coin, ETH_RATE] = useMemo(() => {
    let selectedCoin = wallet.find(
      (c: Coin) => c.coin_symbol === props.route?.params?.coinSymbol,
    );
    let eth = wallet.find((c: Coin) => c.coin_name === 'Ethereum');
    return [selectedCoin, eth?.chart_data.rate];
  }, [wallet, props.route]);

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
    setCoinAmount(text);
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

  const networkFee = useMemo(() => {
    let ETH = wallet.find((c: Coin) => c.coin_name === 'Ethereum');
    if (coin?.coin_symbol === 'eth') {
      return coin?.chart_data?.networkFeeMin;
    } else if (coin?.coin_symbol !== 'eth' && coin?.blockchain === 'ethereum') {
      return (
        (Number(ETH?.chart_data.networkFeeMin) * Number(ETH?.chart_data.rate)) /
        Number(coin.chart_data.rate)
      );
      //convert network fee to desire count amount
    } else {
      return coin?.chart_data.networkFeeMin;
    }
  }, [wallet, coin]);

  const [totalFiat, totalAmount] = useMemo(() => {
    let t_fiat: any = Number(usdtAmount);

    let t_coin: any =
      Number(coinAmount) +
      Number(networkFee) * 2.05 +
      coin?.chart_data.coin?.processingFee;

    if (!coinAmount || Number(coinAmount) <= 0) {
      t_coin = '0.000000';
    }
    if (!usdtAmount || Number(usdtAmount) <= 0) {
      t_fiat = '0.000000';
    }
    t_fiat = convertToFiatString(t_coin);
    return [t_fiat, Number(t_coin).toFixed(6)];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usdtAmount, coinAmount, coin]);

  const onSend = async () => {
    try {
      if (coin?.coin_symbol !== 'weenus') {
        let valid = WAValidator.validate(address, coin?.coin_symbol);
        if (!valid) {
          return AppShowToast(
            `Please enter a ${coin?.coin_name} valid address`,
          );
        }
      } else if (coin?.coin_symbol === 'weenus') {
        let valid = WAValidator.validate(address, 'eth');
        if (!valid) {
          return AppShowToast(
            `Please enter a ${coin?.coin_name} valid address`,
          );
        }
      }
      if (usdtAmount) {
        if (isNaN(Number(usdtAmount))) {
          return AppShowToast('Amount must be a number');
        }
      }
      if (Number(coinAmount) <= 0) {
        return AppShowToast('Please enter a valid amount');
      }
      if (address === coin?.address) {
        return AppShowToast('You cannot send to your own addresss');
      }
      if (!coinAmount) {
        return AppShowToast('Please enter coin amount');
      }
      if (Number(totalAmount) > Number(coin?.balance)) {
        return AppShowToast('Insufficient funds');
      }
      if (Number(usdtAmount) > Number(coin?.vs_currency_balance)) {
        return AppShowToast('Insufficient funds');
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
        processingFee: coin?.chart_data?.coin?.processingFee,
        feeReceivingAccount: coin?.chart_data?.coin?.feeReceivingAccount,
        contractAbi: coin?.chart_data?.coin?.contractAbi,
        contractAddress: coin?.chart_data?.coin?.contractAddress,
      };
      await handleTx(payload);
      setLoading(false);
      setShowModal(true);
      setPaymentError(false);
    } catch (error) {
      setLoading(false);
      setPaymentError(error);
      setShowModal(true);
      console.log('Error Sending Coin.', error);
    }
  };

  return (
    <>
      <PaymentStatusModal
        toggleModal={toggleModal}
        error={paymentError}
        isVisible={showModal}
      />
      <AppHeader title="Wallet" showBack />
      <View style={styles.container}>
        <Text style={styles.label}>Send to</Text>
        <AddressInput
          inputStyle={{marginVertical: THEME.MARGIN.NORMAL}}
          value={address}
          placeholder="Address"
          onChangeText={setAddress}
          onChangeAddress={onChangeAddress}
        />
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Amount</Text>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.max}
            onPress={onPressMax}>
            <Text style={styles.maxText}>Max</Text>
          </TouchableOpacity>
        </View>
        <AppInput
          inputStyle={{marginTop: THEME.MARGIN.NORMAL}}
          value={coinAmount}
          onChangeText={onChangeCoinAmount}
          placeholder={`Enter amount in ${coin?.coin_symbol.toUpperCase()}`}
        />
        <AppInput
          inputStyle={{marginTop: THEME.MARGIN.NORMAL}}
          value={usdtAmount}
          onChangeText={onChangeUsdtAmount}
          placeholder={`Enter amount in ${defaultCurrency}`}
        />

        <View style={styles.sideInfo}>
          <Text style={styles.availBalalnce}>
            Avl. Balance: {coin?.balance || '0.00'}{' '}
            {coin?.coin_symbol.toUpperCase()}
          </Text>
        </View>

        <View style={styles.details}>
          <Text style={styles.detailsText}>
            Transaction Fee :{' '}
            {getFixedAmount(Number(coin?.chart_data.networkFeeMin) * 2)}{' '}
            {coin?.coin_symbol.toUpperCase()}
            <Text style={styles.usdText}>
              {'     '}
              {convertToFiatString(Number(coin?.chart_data.networkFeeMin) * 2)}
            </Text>
          </Text>
          <Text style={styles.availableText}>
            {'    '}Total Amount : {Number(totalAmount).toFixed(6)}{' '}
            {coin?.coin_symbol.toUpperCase()}
            <Text style={styles.usdText}>
              {'     '}
              {totalFiat}
            </Text>
          </Text>
        </View>

        <PrimaryButton
          loading={loading}
          icon="arrow-long-up"
          title="Send"
          buttonStyle={{width: '55%', height: HP(6)}}
          textStyle={GLOBAL_STYLE.LARGE_BUTTON_TEXT}
          onPress={onSend}
        />
      </View>
    </>
  );
};

export default SendCoin;
