import Clipboard from '@react-native-clipboard/clipboard';
import React, {useMemo, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import QRCode from 'react-native-qrcode-svg';
import {useSelector} from 'react-redux';
import {ICONS} from '../../../assets';
import AppHeader from '../../../shared/components/AppHeader';
import {Coin, GenericNavigation} from '../../../shared/models/types';
import {AppShowToast} from '../../../shared/services/helper.service';
import {RootState} from '../../../shared/store';
import {THEME} from '../../../shared/theme';
import {RF, WP} from '../../../shared/theme/responsive';
import L from '../../../shared/utils/LanguageHandler';
import styles from './styles';

interface Props extends GenericNavigation {}

const ReceiveCoin = (props: Props) => {
  const [copied, setCopied] = useState(false);
  const {wallet} = useSelector((state: RootState) => state.wallet);

  const coin = useMemo(() => {
    return wallet.find(
      (c: Coin) => c?.coin_symbol === props.route?.params?.coinSymbol,
    );
  }, [wallet, props.route]);

  const onPressAddress = () => {
    setCopied(true);
    AppShowToast('Copied');
    Clipboard.setString(coin?.address!);
  };

  return (
    <View style={styles.mainContainer}>
      <AppHeader title={L('Wallet')} showBack />
      <View style={styles.container}>
        {/* <FastImage
          source={GetImageForCoin(coin?.coin_symbol!)}
          resizeMode={FastImage.resizeMode.contain}
          style={styles.coinIcon}
        /> */}

        <View style={styles.qrContainer}>
          <QRCode size={WP(40)} value={coin?.address} />
        </View>

        {/* <SvgUri width="100%" height="100%" uri={COIN_URL} /> */}
        <QRcodeGenerator value={coin?.address || ''} />
        <Text style={styles.instruction}>
          {L('Your ')}
          {coin?.coin_symbol?.toUpperCase()}
          {L(' Address')}
        </Text>

        <View style={styles.keyContainer}>
          <Text numberOfLines={1} style={styles.keyText}>
            {coin?.address}
          </Text>
          <TouchableOpacity onPress={onPressAddress}>
            <FastImage
              source={ICONS.COPY}
              resizeMode={FastImage.resizeMode.contain}
              style={{
                width: RF(20),
                height: RF(20),
                marginLeft: THEME.MARGIN.LOW,
                tintColor: THEME.COLORS.tintBlue,
              }}
            />
          </TouchableOpacity>
        </View>

        {copied && (
          <View style={styles.copiedContainer}>
            <FastImage
              source={ICONS.TICK}
              resizeMode={FastImage.resizeMode.contain}
              style={{width: RF(20), height: RF(20)}}
            />
            <Text style={styles.copied}>{L('Copied')}</Text>
          </View>
        )}
        <View style={styles.noteView}>
          <Text style={[styles.note, {color: THEME.COLORS.white}]}>
            {L('Important')}
          </Text>
          <Text style={styles.note}>
            {L('*Send only ')}
            {coin?.coin_symbol.toUpperCase()}
            {L(
              ' to this Address. Sending any other coin or token to this address may result in the loss of your recieving',
            )}
          </Text>
          <Text style={styles.note}>
            {L('*Coins will be recieve after 1 network confirmations.')}
          </Text>
        </View>
        {/* <PrimaryButton
          icon="share"
          title={L('Share')}
          buttonStyle={{width: '55%', height: HP(6)}}
          textStyle={GLOBAL_STYLE.LARGE_BUTTON_TEXT}
          onPress={() => AppShareContent(coin?.address, 'Addess')}
        /> */}
      </View>
    </View>
  );
};

export default ReceiveCoin;
