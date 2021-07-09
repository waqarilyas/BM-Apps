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
import {AppShowToast} from '../../../shared/services/helper.service';

interface Props extends GenericNavigation {}

const SendCoin = (props: Props) => {
  const {wallet, defaultCurrency} = useSelector(
    (state: RootState) => state.wallet,
  );
  const [address, setAddress] = useState('');
  const [usdtAmount, setUsdtAmount] = useState('');
  const [coinAmount, setCoinAmount] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const coin = useMemo(() => {
    return wallet.find(
      (c: Coin) => c.coin_symbol === props.route?.params?.coinSymbol,
    );
  }, [wallet, props.route]);

  const onChangeAddress = (text: string) => setAddress(text);
  const toggleModal = () => setShowModal(!showModal);

  const convertToFiatString = (amount: string) => {
    let fiatAmount: any = Number(amount) * Number(coin?.chart_data.rate);
    fiatAmount = fiatAmount.toFixed(fiatAmount > 999 ? 2 : 7);
    if (defaultCurrency === 'USD') {
      return `${currenciesEnum[defaultCurrency]} ${fiatAmount} ${defaultCurrency}`;
    }
    return 0;
  };

  const onChangeCoinAmount = (text: string) => {
    setCoinAmount(text);
    let newFiatAmount = Number(text) * Number(coin?.chart_data.rate);
    setUsdtAmount(newFiatAmount.toFixed(newFiatAmount > 999 ? 2 : 7));
  };

  const onChangeUsdtAmount = (text: string) => {
    setUsdtAmount(text);
    let newCoinAmount = Number(text) / Number(coin?.chart_data.rate);
    setCoinAmount(newCoinAmount.toFixed(newCoinAmount > 999 ? 2 : 7));
  };

  const onSend = () => {
    if (!coinAmount) {
      return AppShowToast('Please enter coin amount');
    }
    if (!usdtAmount) {
      return AppShowToast(`Please enter ${defaultCurrency} amount`);
    }
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
    //Start from here
  };

  const onPressMax = () => {
    setCoinAmount(coin?.balance!);
    setUsdtAmount(coin?.vs_currency_balance!);
  };

  return (
    <>
      <PaymentStatusModal
        toggleModal={toggleModal}
        error={!false}
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

        <View style={styles.details}>
          <Text style={styles.detailsText}>
            Transaction Fee : {coin?.chart_data.networkFeeMin}{' '}
            {coin?.coin_symbol.toUpperCase()}
            <Text style={styles.usdText}>
              {'     '}
              {convertToFiatString(coin?.chart_data.networkFeeMin)}
            </Text>
          </Text>
          <Text style={styles.availableText}>
            {'            '}
            Available : {coin?.balance} {coin?.coin_symbol.toUpperCase()}
            <Text style={styles.usdText}>
              {'     '}
              {convertToFiatString(coin?.balance!)}
            </Text>
          </Text>
        </View>

        <PrimaryButton
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
