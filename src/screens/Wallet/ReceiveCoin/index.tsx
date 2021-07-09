import React, {useMemo, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';
import {ICONS} from '../../../assets';
import AppHeader from '../../../shared/components/AppHeader';
import PrimaryButton from '../../../shared/components/PrimaryButton';
import {QRcodeGenerator} from '../../../shared/components/QRcodeGenerator';
import {Coin, GenericNavigation} from '../../../shared/models/types';
import {RootState} from '../../../shared/store';
import GLOBAL_STYLE from '../../../shared/theme/global';
import {HP, RF} from '../../../shared/theme/responsive';
import styles from './styles';
import Clipboard from '@react-native-clipboard/clipboard';
import {AppShowToast} from '../../../shared/services/helper.service';

interface Props extends GenericNavigation {}

const ReceiveCoin = (props: Props) => {
  const [copied, setCopied] = useState(false);
  const {wallet} = useSelector((state: RootState) => state.wallet);
  const coin = useMemo(() => {
    return wallet.find(
      (c: Coin) => c.coin_symbol === props.route?.params?.coinSymbol,
    );
  }, [wallet, props.route]);

  const onPressAddress = () => {
    setCopied(true);
    AppShowToast('Copied');
    Clipboard.setString(coin?.address!);
  };

  return (
    <>
      <AppHeader title="Wallet" showBack />
      <View style={styles.container}>
        <QRcodeGenerator value={coin?.address || ''} />
        <Text style={styles.instruction}>
          Use the address below to receive funds.
        </Text>
        <TouchableOpacity onPress={onPressAddress} style={styles.keyContainer}>
          <Text numberOfLines={1} style={styles.keyText}>
            {coin?.address}
          </Text>
        </TouchableOpacity>
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
          textStyle={GLOBAL_STYLE.LARGE_BUTTON_TEXT}
        />
      </View>
    </>
  );
};

export default ReceiveCoin;
