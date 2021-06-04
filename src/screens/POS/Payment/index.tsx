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

interface Props extends GenericNavigation {}

const Payment = (props: Props) => {
  const [copied, setCopied] = useState(true);
  return (
    <>
      <AppHeader title="Payment" showBack showCart />
      <View style={styles.container}>
        <Text style={styles.label}>Payment Method</Text>
        <TouchableOpacity style={styles.optionContainer}>
          <FastImage
            source={COINS.BTC}
            resizeMode={FastImage.resizeMode.contain}
            style={styles.coinIcon}
          />
          <View style={{flex: 1}}>
            <Text style={{color: THEME.COLORS.white}}>Bitcoin (BTC)</Text>
          </View>
          <Icon name="chevron-down" size={24} color={THEME.COLORS.white} />
        </TouchableOpacity>

        <View style={styles.amountContainer}>
          <Text style={styles.amountBTC}>0.024 BTC</Text>
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
        {!copied && (
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
        />
      </View>
    </>
  );
};

export default Payment;
