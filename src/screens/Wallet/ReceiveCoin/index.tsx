import React, {useState} from 'react';
import {View, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ICONS} from '../../../assets';
import AppHeader from '../../../shared/components/AppHeader';
import PrimaryButton from '../../../shared/components/PrimaryButton';
import {GenericNavigation} from '../../../shared/models/types';
import {HP, RF} from '../../../shared/theme/responsive';
import styles from './styles';

interface Props extends GenericNavigation {}

const ReceiveCoin = (props: Props) => {
  const [copied, setCopied] = useState(true);
  return (
    <>
      <AppHeader title="Wallet" showBack />
      <View style={styles.container}>
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
          buttonStyle={{width: '55%', height: HP(6)}}
        />
      </View>
    </>
  );
};

export default ReceiveCoin;
