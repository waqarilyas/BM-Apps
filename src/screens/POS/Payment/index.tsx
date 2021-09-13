import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Pressable} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ICONS} from '../../../assets';
import AppHeader from '../../../shared/components/AppHeader';
import styles from './styles';
import {COINS} from '../../../assets/coins';
import Icon from 'react-native-vector-icons/EvilIcons';
import {THEME} from '../../../shared/theme';
import {GenericNavigation} from '../../../shared/models/types';
import PrimaryButton from '../../../shared/components/PrimaryButton';
import {HP, RF, WP} from '../../../shared/theme/responsive';
import ChooseCoinModal from '../../../shared/components/ChooseCoinModal';
import GLOBAL_STYLE from '../../../shared/theme/global';
import {RootState} from '../../../shared/store';
import {useSelector} from 'react-redux';
import Clipboard from '@react-native-clipboard/clipboard';
import QRCode from 'react-native-qrcode-svg';
import AppInput from '../../../shared/components/AppInput';

import {
  AppShareContent,
  AppShowToast,
} from '../../../shared/services/helper.service';

interface Props extends GenericNavigation {}

const Payment = (props: Props) => {
  const {type}: any = props.route?.params;

  const {wallet} = useSelector((state: RootState) => state.wallet);
  const {cart, totalCartAmount, totalTax} = useSelector(
    (state: RootState) => state.pos,
  );
  const [copied, setCopied] = useState(false);
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState();
  const [customPrice, setCustomPrice] = useState(0);
  const [usdPrice, setUSDPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(
    type == 'invoice' ? 0 : totalCartAmount + totalTax,
  );

  const toggleModal = () => setShowCurrencyModal(!showCurrencyModal);

  const onSelectCoin = (coin: any) => {
    let price = totalPrice / coin?.chart_data?.rate;
    setUSDPrice(price);
    setShowCurrencyModal(false);
    setSelectedCoin(coin);
  };

  const onPressAddress = () => {
    setCopied(true);
    AppShowToast('Copied');
    Clipboard.setString(selectedCoin?.address);
  };

  useEffect(() => {
    setSelectedCoin(wallet[0]);
  }, []);

  useEffect(() => {
    const priceInUSD = totalPrice / wallet[0]?.chart_data?.rate;
    setUSDPrice(priceInUSD);
  }, [totalPrice]);

  return (
    <>
      <AppHeader title="Payment" showBack />
      <View style={styles.container}>
        <Text style={styles.label}>Select Coin:</Text>
        <TouchableOpacity onPress={toggleModal} style={styles.optionContainer}>
          <FastImage
            source={COINS.BTC}
            resizeMode={FastImage.resizeMode.contain}
            style={styles.coinIcon}
          />
          <View style={{flex: 1}}>
            <Text style={{color: THEME.COLORS.white}}>
              {selectedCoin?.coin_name}({selectedCoin?.coin_symbol})
            </Text>
          </View>
          {/* <Icon name="chevron-down" size={24} color={THEME.COLORS.white} /> */}
        </TouchableOpacity>

        {type == 'invoice' && (
          <AppInput
            placeholder="Enter Amount USD"
            keyboardType="number-pad"
            onChangeText={text => {
              if (text.length == 0) {
                setTotalPrice(0);
                return;
              }
              setTotalPrice(parseInt(text));
            }}
          />
        )}

        <View style={styles.amountContainer}>
          <Text style={styles.amountBTC}>
            {usdPrice} {selectedCoin?.coin_symbol}
          </Text>
          <Text style={styles.amountUSD}>
            ${type == 'invoice' ? totalPrice : totalCartAmount + totalTax} USD
          </Text>
        </View>

        {/* <FastImage
          source={ICONS.QRCODE}
          resizeMode={FastImage.resizeMode.contain}
          style={styles.qr}
        /> */}
        <View style={styles.qrContainer}>
          <QRCode size={WP(40)} value={selectedCoin?.address} />
        </View>
        <Text style={styles.instruction}>
          Use the address below to receive funds.
        </Text>
        <Pressable style={styles.keyContainer} onPress={onPressAddress}>
          <Text numberOfLines={1} style={styles.keyText}>
            {selectedCoin?.address}
          </Text>
        </Pressable>
        {copied && (
          <View style={styles.copiedContainer}>
            <FastImage
              source={ICONS.TICK}
              resizeMode={FastImage.resizeMode.contain}
              style={{width: RF(20), height: RF(20)}}
            />
            <Text style={styles.copied}> Copied</Text>
          </View>
        )}
        <PrimaryButton
          icon="share"
          title="Share"
          onPress={() =>
            AppShareContent(
              selectedCoin?.address,
              'Sharing wallet address for receiving funds',
            )
          }
          buttonStyle={styles.shareButton}
          textStyle={GLOBAL_STYLE.LARGE_BUTTON_TEXT}
        />
      </View>
      <ChooseCoinModal
        isVisible={showCurrencyModal}
        onPressBackdrop={toggleModal}
        onPressCoin={onSelectCoin}
        data={wallet}
        selectedCoin={selectedCoin}
      />
    </>
  );
};

export default Payment;
