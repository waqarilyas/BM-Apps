import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ICONS} from '../../../assets';
import AppHeader from '../../../shared/components/AppHeader';
import styles from './styles';
import {COINS} from '../../../assets/coins';
import Icon from 'react-native-vector-icons/EvilIcons';
import {THEME} from '../../../shared/theme';
import {GenericNavigation} from '../../../shared/models/types';
import PrimaryButton from '../../../shared/components/PrimaryButton';
import {HP, RF} from '../../../shared/theme/responsive';
import ChooseCoinModal from '../../../shared/components/ChooseCoinModal';
import GLOBAL_STYLE from '../../../shared/theme/global';

interface Props extends GenericNavigation {}

const Payment = (props: Props) => {
  const [copied, setCopied] = useState(true);
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);

  const toggleModal = () => setShowCurrencyModal(!showCurrencyModal);

  const onSelectCoin = (coin: string) => {
    setShowCurrencyModal(false);
    console.log(coin);
  };
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
            <Text style={{color: THEME.COLORS.white}}>Bitcoin (BTC)</Text>
          </View>
          {/* <Icon name="chevron-down" size={24} color={THEME.COLORS.white} /> */}
        </TouchableOpacity>

        <View style={styles.amountContainer}>
          <Text style={styles.amountBTC}>0.0240 BTC</Text>
          <Text style={styles.amountUSD}>$50.00 USD</Text>
        </View>

        <FastImage
          source={ICONS.QRCODE}
          resizeMode={FastImage.resizeMode.contain}
          style={styles.qr}
        />
        <Text style={styles.instruction}>
          Use the address below to receive funds.
        </Text>
        <View style={styles.keyContainer}>
          <Text numberOfLines={1} style={styles.keyText}>
            3E53XjqK4Cxt71BGeERYUri45445P2Vh…
          </Text>
        </View>
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
          buttonStyle={styles.shareButton}
          textStyle={GLOBAL_STYLE.LARGE_BUTTON_TEXT}
        />
      </View>
      <ChooseCoinModal
        isVisible={showCurrencyModal}
        onPressBackdrop={toggleModal}
        onPressCoin={onSelectCoin}
      />
    </>
  );
};

export default Payment;
